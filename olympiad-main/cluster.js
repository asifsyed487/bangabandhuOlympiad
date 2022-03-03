var cluster = require("cluster");
const express = require("express");
const app = express();
const http = require("http");
let io = require("socket.io");
const { graphqlHTTP } = require("express-graphql");
var redis = require("redis");
var redisAdapter = require("socket.io-redis");
const cors = require("cors");
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
  "mongodb://sadman:omn789yuio@bangabandhuolympiad.com:27017/ctgquiz?authSource=admin&retry=true";
const UserModel = require("./model/User");
const QuestionModel = require("./model/Question");
const schema = require("./graphql/schema");

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

var port = process.env.PORT || 4000;
var workers = process.env.WORKERS || require("os").cpus().length;

var redisUrl = process.env.REDISTOGO_URL || "redis://127.0.0.1:6379";

process.env.SECRET_KEY = "secret";

app.use(
  "/graphql",
  graphqlHTTP((req, res, gql) => ({
    schema,
    graphiql: true,
  }))
);

app.use("/api", require("./routes.js"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

if (cluster.isMaster) {
  console.log("start cluster with %s workers", workers - 1);
  workers--;
  for (var i = 0; i < workers; ++i) {
    var worker = cluster.fork();
    console.log("worker %s started.", worker.process.pid);
  }

  cluster.on("death", function (worker) {
    console.log("worker %s died. restart...", worker.process.pid);
  });
} else {
  start();
}

function start() {
  var httpServer = http.createServer(app);
  var server = httpServer.listen(port);
  io = io.listen(server);
  io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
  const maxNumOfPlayer = 2;

  let unPlayedquen;
  let player1_name = "";
  let player2_name = "";
  const users = [];

  const addUser = ({ id, user_name, room_name }) => {
    user_name = user_name;
    room_name = room_name;

    const existingUser = users.find(
      (user) => user.room_name === room_name && user.name === user_name
    );

    if (!user_name || !room_name)
      return { error: "Username and room are required." };
    if (existingUser) return { error: "Username is taken." };

    const user = { id, user_name, room_name };

    users.push(user);

    return { user };
  };

  const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
  };

  io.on("connection", function (socket) {
    socket.on("join_room", function (room_name, user_name, id) {
      console.log(user_name);
      user_name = user_name;
      id = socket.id;
      const { error, user } = addUser({ id: socket.id, user_name, room_name });

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
              Class: data.Class,
              Subject: data.Subject,
              Chapter: data.Chapter,
            }).then(async (e) => {
              await UserModel.find({ username: player1_name }).then((re) => {
                let playedQuen = [];
                re[0].gamedata.map((j) => {
                  if (
                    data.Subject === j.Subject &&
                    data.Chapter === j.Chapter
                  ) {
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
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room_name).emit("message", {
          user: "Admin",
          text: `${user.user_name} has left.`,
        });
      }
    });
  });

  console.log("Redis adapter started with url: " + redisUrl);
}
