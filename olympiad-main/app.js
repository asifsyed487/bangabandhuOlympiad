const express = require("express");
const app = express();
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

app.use(express.static("uploads"));
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, "build")));
const db =
  "mongodb://root:Q%24df%4056!@bangabandhuolympiad.com:27017/olympiad?authSource=admin&retry=true";
const UserModel = require("./model/User");
const QuestionModel = require("./model/Question");

const schema = require("./graphql/schema");
const WordleUserSchema = require("./model/WordleUser");

const { find } = require("./model/User");

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const online_users = [];

const addOnlineuser = (data) => {
  const indexFound = online_users.findIndex(
    (user) => user.username === data.username
  );
  if (online_users.length > 0) {
    if (indexFound >= 0) {
      online_users[indexFound].id = data.id;
    } else {
      online_users.push(data);
    }
  } else {
    online_users.push(data);
  }
};

const removeUser = (id) => {
  const index = online_users.findIndex((user) => user.id === id);
  if (index !== -1) return online_users.splice(index, 1)[0];
};
const maxNumOfPlayer = 2;

let unPlayedquen;
let player1_name = "";
let player2_name = "";

io.on("connection", function (socket) {
  socket.on("online_users", (onlineUserData) => {
    addOnlineuser({ ...onlineUserData, id: socket.id });
    io.emit("user_list", online_users);
  });

  socket.on("send_invite", (challengeData) => {
    const finduser = online_users.find(
      (user) => user.username === challengeData.username
    );
    io.to(finduser.id).emit("receive_message", challengeData);
  });

  socket.on("decline_invite", (declinedData) => {
    const finduser = online_users.find(
      (user) => user.username === declinedData.username
    );
    io.to(finduser.id).emit("decline_message", declinedData);
  });

  socket.on("join_room", function (room_name, user_name, id) {
    user_name = user_name;
    id = socket.id;

    io.in(room_name).clients(function (error, clients) {
      clients.length++;
      if (clients.length > maxNumOfPlayer) {
      }
      if (clients.length <= maxNumOfPlayer) {
        socket.join(room_name);
      }

      if (clients.length === 1) {
        player1_name = user_name;
        socket.on(room_name, async (data) => {
          await QuestionModel.find({
            Class: [data.Class, "0"],
            Subject: data.Subject,
            Chapter: data.Chapter,
            category: [data.category, 0],
          }).then(async (e) => {
            await UserModel.find({ username: player1_name }).then((re) => {
              let playedQuen = [];
              re[0].gamedata.map((j) => {
                if (data.Subject === j.Subject && data.Chapter === j.Chapter) {
                  j.my_stats.map((k) => {
                    if (k.correctanswer === k.myanswer) {
                      playedQuen.push(k);
                    }
                  });
                }
              });

              function comparer(otherArray) {
                return function (current) {
                  return (
                    otherArray.filter(function (other) {
                      return other.question == current.question;
                    }).length == 0
                  );
                };
              }

              unPlayedquen = e.filter(comparer(playedQuen));
            });
          });
        });
      }
      if (clients.length === maxNumOfPlayer) {
        player2_name = user_name;
        io.in(room_name).emit("info", player1_name, player2_name);
        let selected = unPlayedquen.slice(0, 10);
        selected.push({
          serialno: "load",
        });
        if (selected.length < 1) {
          const noQuen = { item: "completechapter", index: "null" };
          io.in(room_name).emit("question", noQuen.item, noQuen.index);
        } else {
          selected.forEach(function (item, index) {
            setTimeout(function () {
              io.in(room_name).emit("question", item, index, selected.length);
            }, 10000 * index + 1);
          });
        }

        //send finish game to room
      }
    });
  });

  socket.on("result", function (usr, rst, progress) {
    io.sockets.in(rst).emit("viewresult", usr, progress);
  });

  socket.on("comparedata", function (username, room_name, data) {
    io.sockets.in(room_name).emit("compareresult", username, data);
  });

  socket.on("finishmesg", function (finished, room_name) {
    io.sockets.in(room_name).emit("finishConfirm", finished);
  });

  socket.on("disconnect", (reason) => {
    removeUser(socket.id);
    io.emit("user_list", online_users);
  });

  //.wordleusers

  socket.on("saveuser", async (queryData) => {
    const find = await WordleUserSchema.findOne({ id: queryData.id });
    let playedToday, stats;

    if (find && find.guesses.length !== 0) {
      stats = find.guesses.find((item) => item.time === queryData.time);
      if (stats) {
        playedToday = true;
      }
    }

    if (!find) {
      await WordleUserSchema.create({
        id: queryData.id,
        played: 0,
        maxstreak: 0,
        currentstreak: 0,
        zero: 0,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
      });
      const wordToday = await FoddleModel.findOne({ time: queryData.time });

      io.emit("sendword", wordToday);
    } else {
      const wordToday = await FoddleModel.findOne({ time: queryData.time });
      if (playedToday === true) {
        const statsData = {
          playedToday: playedToday,
          stats: find,
        };

        io.emit("playedtoday", statsData);
      } else {
        io.emit("sendword", wordToday);
      }
    }

    // const req = await WordleUserSchema.create(data);
    // io.emit("guess", data);
  });
  socket.on("savefoddlestat", async (dataSave) => {
    const lastGuess = await WordleUserSchema.findOne(
      { id: dataSave.id },
      { guesses: { $slice: -1 } }
    );

    var lastPlayed, today, streak;

    if (dataSave.guessWord.correct === true) {
      if (lastGuess && lastGuess.guesses.length !== 0) {
        lastPlayed = parseInt(lastGuess.guesses[0].time.slice(-2));
        today = parseInt(dataSave.guessWord.time.slice(-2));
        streak = today - lastPlayed === 1;
        await WordleUserSchema.findOneAndUpdate(
          {
            id: dataSave.id,
          },

          {
            $inc: {
              played: 1,
              [dataSave.guesses === 1
                ? "one"
                : dataSave.guesses === 2
                ? "two"
                : dataSave.guesses === 3
                ? "three"
                : dataSave.guesses === 4
                ? "four"
                : dataSave.guesses === 5
                ? "five"
                : "six"]: 1,
              currentstreak: lastGuess.currentstreak == 0 ? 1 : streak ? 1 : 0,
            },
            $push: {
              guesses: {
                guess: dataSave.guessWord.guess,
                time: dataSave.guessWord.time,
                correct: dataSave.guessWord.correct,
                word: dataSave.guessWord.word,
                foddleno: dataSave.guessWord.foddleno,
                guessno: dataSave.guessWord.guessno,
              },
            },
          }
        );
      } else {
        await WordleUserSchema.findOneAndUpdate(
          {
            id: dataSave.id,
          },

          {
            $inc: {
              played: 1,
              [dataSave.guesses === 1
                ? "one"
                : dataSave.guesses === 2
                ? "two"
                : dataSave.guesses === 3
                ? "three"
                : dataSave.guesses === 4
                ? "four"
                : dataSave.guesses === 5
                ? "five"
                : "six"]: 1,
              currentstreak: 1,
              maxstreak: 1,
            },
            $push: {
              guesses: {
                guess: dataSave.guessWord.guess,
                time: dataSave.guessWord.time,
                correct: dataSave.guessWord.correct,
                word: dataSave.guessWord.word,
                foddleno: dataSave.guessWord.foddleno,
                guessno: dataSave.guessWord.guessno,
              },
            },
          }
        );
        const findData = await WordleUserSchema.findOne({ id: dataSave.id });
        const statsData = {
          playedToday: false,
          stats: findData,
        };

        await io.emit("playedtoday", statsData);
      }
    } else {
      await WordleUserSchema.findOneAndUpdate(
        {
          id: dataSave.id,
        },

        {
          $inc: {
            played: 1,
          },
          $set: {
            currentstreak: 0,
            maxstreak:
              find.currentstreak > find.maxstreak
                ? find.currentstreak
                : find.maxstreak,
          },
          $push: {
            guesses: {
              guess: dataSave.guessWord.guess,
              time: dataSave.guessWord.time,
              correct: dataSave.guessWord.correct,
              word: dataSave.guessWord.word,
              foddleno: dataSave.guessWord.foddleno,
              guessno: dataSave.guessWord.guessno,
            },
          },
        }
      );
    }
  });
});

process.env.SECRET_KEY = "secret";

app.use(
  "/graphql",
  graphqlHTTP((req, res, gql) => ({
    schema,
    graphiql: true,
  }))
);

app.use("/apis", require("./routes.js"));

app.get("/*", async (req, res) => {
  await res.sendFile(path.join(__dirname, "build", "index.html"));
});
const PORT = process.env.PORT || 5000;

server.listen(PORT);
console.log("Server started at port 5000");
