const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
const tz = require("moment-timezone");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

const UserModel = require("./model/User");
const QuestionModel = require("./model/Question");
const SchoolModel = require("./model/School");
const AdminModel = require("./model/Admin");
const serviceAccount = require("./firebasekey.json");

const FirebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sadman@copotronic.com",
    pass: "789123789456", // naturally, replace both with your real credentials or an application-specific password
  },
});

let Dhaka = moment.tz(new Date(), "Asia/Dhaka").format();

router.get("/", function (req, res) {
  res.send("hello");
});

router.post("/register", (req, res) => {
  const userData = {
    username: req.body.data.username,
    fullname: req.body.data.fullname,
    myclass:
      req.body.data.class == "6"
        ? "6"
        : req.body.data.class == "5"
        ? "5"
        : req.body.data.class == "7"
        ? "7"
        : req.body.data.class == "8"
        ? "8"
        : req.body.data.class == "11"
        ? "11_12"
        : req.body.data.class == "12"
        ? "11_12"
        : "9_10",
    schoolname: req.body.data.schoolname,
    phonenumber: req.body.data.phonenumber,
    dob: req.body.data.dob,
    password: req.body.data.password,
    totalwin: 0,
    totallost: 0,
    totaldraw: 0,
    gameID: "null",
    challenger: "null",
  };

  UserModel.findOne({
    username: req.body.data.username,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.data.password, 10, (err, hash) => {
          userData.password = hash;

          UserModel.create(userData)
            .then((user) => {
              res.send("Registered");
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json("Username already exists");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/login", (req, res) => {
  UserModel.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            username: user.username,
            myclass: user.myclass,
            schoolname: user.schoolname,
            eiin: user.eiin,
            phonenumber: user.phonenumber,
            link: user.joinlink,
            linkexpire: user.linkexpire,
            gamedata: user.gamedata,
            singlegamedata: user.singlegamedata,
            imgname: user.imgname,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 43200,
          });
          res.send(token);
        } else {
          // Passwords don't match
          res.json("password doesn't match");
        }
      } else {
        res.json("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/forgetpass", (req, res) => {
  UserModel.findOne({
    username: req.body.username,
    phonenumber: req.body.phonenumber,
  })
    .then((user) => {
      if (user) {
        res.send("Set New Password!");
      } else {
        res.json("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/setnewpass", (req, res) => {
  UserModel.findOne({
    username: req.body.username,
  }).then((user) => {
    if (user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        let newpass = hash;
        UserModel.findOneAndUpdate(
          { username: req.body.username },
          {
            $set: {
              password: newpass,
            },
          },
          { new: true }
        ).then((r) => res.send("done"));
      });
    }
  });
});

router.post("/myclassmates", (req, res) => {
  UserModel.find(
    {
      myclass: req.body.myclass,
    },
    { username: 1, schoolname: 1, deviceToken: 1 }
  ).then((school) => {
    if (school) {
      res.send(school);
    } else {
    }
  });
});

router.post("/classmatesSearch", (req, res) => {
  UserModel.find(
    {
      myclass: req.body.myclass,
    },
    { username: 1, deviceToken: 1 }
  ).then((school) => {
    if (school) {
      let classmates = [];

      school.map((i) => {
        classmates.push({
          deviceToken: i.deviceToken,
          value: i.username,
          label: i.username,
        });
      });

      res.send(classmates);
    } else {
    }
  });
});

router.post("/singleplayerquen", async (req, res) => {
  await QuestionModel.find({
    Class: req.body.my_class,
    Subject: req.body.subject,
    Chapter: req.body.chapter,
  }).then(async (e) => {
    await UserModel.find({ username: req.body.name }).then((re) => {
      let playedQuen = [];

      re[0].singlegamedata.map((j) => {
        if (req.body.subject === j.Subject && req.body.chapter === j.Chapter) {
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

      let unPlayedquen = e.filter(comparer(playedQuen));

      const selected = unPlayedquen.slice(0, 10);

      if (selected.length < 1) {
        res.send("completechapter");
      } else {
        res.send(selected);
      }
    });
  });
});

router.post("/subject", (req, res) => {
  QuestionModel.distinct("Subject", { Class: req.body.Class }).then((data) => {
    res.send(data);
  });
});

router.post("/chapters", (req, res) => {
  QuestionModel.distinct("Chapter", {
    Class: req.body.class,
    Subject: req.body.subject,
  }).then((data) => {
    res.send(data);
  });
});

router.post("/gamestats", (req, res) => {
  UserModel.findOneAndUpdate(
    {
      username: req.body.data.name,
    },

    {
      $inc: {
        totalwin: req.body.data.myscore > req.body.data.opponetscore ? 1 : 0,
        totallost: req.body.data.myscore < req.body.data.opponetscore ? 1 : 0,
        totaldraw: req.body.data.myscore === req.body.data.opponetscore ? 1 : 0,
      },
      $addToSet: {
        gamedata: {
          gameID: req.body.data.gameID,
          result: req.body.data.result,
          time: Dhaka,
          opponetName: req.body.data.opponetName,
          myscore: req.body.data.myscore,
          opponetscore: req.body.data.opponetscore,
          my_stats: req.body.data.my_stats,
          oppnonet_stats: req.body.data.oppnonet_stats,
          Chapter: req.body.data.req_api_data.Chapter,
          Subject: req.body.data.req_api_data.Subject,
        },
      },
    }
  ).then((r) => res.send(r));
});

router.post("/gamestatssingle", async (req, res) => {
  await UserModel.findOneAndUpdate(
    {
      username: req.body.data.name,
    },
    {
      $addToSet: {
        singlegamedata: {
          time: Dhaka,
          Chapter: req.body.data.chapter,
          myscore: req.body.data.myscore,
          Subject: req.body.data.subject,
          my_stats: req.body.data.my_stats,
        },
      },
    }
  )
    .then((re) => res.send({ done: re }))
    .catch((er) => res.send(er));
});

router.post("/leaderboard", (req, res) => {
  let data = {
    points: [],
    totalwin: [],
  };
  const getData = async () => {
    try {
      const response = await UserModel.find(
        { myclass: req.body.myclass },
        {
          username: 1,
          "singlegamedata.myscore": 1,
          totalwin: 1,
          totaldraw: 1,
          totallost: 1,
          schoolname: 1,
        }
      );
      const json = await response;
      json.map((item) => {
        data.points.push({
          name: item.username,
          schoolname: item.schoolname,
          played: item.singlegamedata ? item.singlegamedata.length : 0,
          score: item.singlegamedata
            ? item.singlegamedata.reduce((gettotal, point) => {
                let val = parseInt(point.myscore);
                myponit = val += gettotal;
                return myponit;
              }, 0)
            : 0,
        });

        data.totalwin.push({
          name: item.username,
          schoolname: item.schoolname,
          totalwin: item.totalwin,
          totaldraw: item.totaldraw,
          totallost: item.totallost,
        });
      });
    } catch (error) {
      console.log(error);
    }
    function SORT(a, b) {
      const dataA = a.score;
      const dataB = b.score;

      let comparison = 0;
      if (dataA > dataB) {
        comparison = -1;
      } else if (dataA < dataB) {
        comparison = 1;
      }
      return comparison;
    }
    function SORTBYNUMBER(a, b) {
      const dataA = a.totalwin;
      const dataB = b.totalwin;

      let comparison = 0;
      if (dataA > dataB) {
        comparison = -1;
      } else if (dataA < dataB) {
        comparison = 1;
      }
      return comparison;
    }
    data.points = data.points.sort(SORT);
    data.totalwin = data.totalwin.sort(SORTBYNUMBER);
    data = {
      points: data.points.slice(0, 50),
      totalwin: data.totalwin.slice(0, 50),
    };
    res.send(data);
  };
  getData();
});

router.post("/profileinfo", (req, res) => {
  UserModel.findOne({ username: req.body.username }).then((data) => {
    res.send(data);
  });
});

router.get("/schools", async (req, res) => {
  await UserModel.distinct("schoolname", {}).then((e) => res.send(e));
});

router.post("/schoolsname", async (req, res) => {
  let schools = [];

  await SchoolModel.find(
    {
      DISTRICT: req.body.district,
    },
    {
      INSTITUTE_NAME: 1,
    }
  ).then((e) => {
    const change = () => {
      e.map((i) => {
        schools.push({ label: i.INSTITUTE_NAME, value: i.INSTITUTE_NAME });
      });
    };
    change();
    res.send(schools);
  });
});

router.post("/supportmail", (req, res) => {
  const mailOptions = {
    from: "sadman@copotronic.com",
    to: "support@copotronic.com",
    subject: req.body.email.subject,
    text: req.body.email.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.post("/allquens", (req, res) => {
  QuestionModel.find({})
    .limit(20)
    .skip(req.body.skip)
    .then((e) => res.send(e));
});

router.get("/scname", (req, res) => {
  SchoolModel.find({ INSTITUTE_NAME: "" })
    .limit(20)
    .skip(req.body.skip)
    .then((e) => res.send(e));
});

router.get("/DISTRICT", async (req, res) => {
  await SchoolModel.distinct("DISTRICT", {}).then((e) => res.send(e));
});

router.post("/sendchallenge", (req, res) => {
  if (
    req.body.data.username &&
    req.body.data.gameID &&
    req.body.data.challenger !== ""
  ) {
    UserModel.findOneAndUpdate(
      { username: req.body.data.username },

      {
        $set: {
          gameID: req.body.data.gameID,
          challenger: req.body.data.challenger,
        },
      },
      { new: true }
    ).then((r) => {
      if (req.body.data.gameID !== "null") {
        const payload = {
          notification: {
            title: `${req.body.data.challenger}  has challenged you`,
            body: "Click if you want to accept the challenge!",
            actions: "Yes",
          },
          data: {
            gameID: `${req.body.data.gameID}`,
            challenger: `${req.body.data.challenger}`,
          },
        };
        var options = {
          priority: "normal",
          timeToLive: 60 * 60,
        };
        const deviceToken = `${req.body.data.deviceToken}`;
        FirebaseAdmin.messaging()
          .sendToDevice(deviceToken, payload, options)
          .then(function (response) {
            console.log("Successfully sent message:", response);
          })
          .catch(function (error) {
            console.log("Error sending message:", error);
          });
      }
      res.send(r);
    });
  }
});

router.post("/declinechallenge", (req, res) => {
  UserModel.findOneAndUpdate(
    { username: req.body.data.username },

    {
      $set: {
        declined: req.body.data.declined,
      },
    },
    { new: true }
  ).then((r) => res.send(r));
});

router.post("/getgameid", (req, res) => {
  UserModel.findOne({ username: req.body.username })
    .then((r) => {
      if (r.gameID !== "null" && r.challenger !== "null") {
        res.send({ gameID: r.gameID, challenger: r.challenger });
      } else {
        res.send({ gameID: "null", challenger: "null" });
      }
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
});

router.post("/checkdecline", (req, res) => {
  UserModel.findOne({ username: req.body.username }).then((r) =>
    res.send({ declined: r.declined })
  );
});

router.post("/savedevicetoken", (req, res) => {
  UserModel.findOneAndUpdate(
    { username: req.body.data.username },

    {
      $set: {
        deviceToken: req.body.data.deviceToken,
      },
    },
    { new: true }
  ).then((r) => res.send("savedToken"));
});

router.get("/extrachapters", (req, res) => {
  SchoolModel.distinct("DISTRICT").then((schools) => {
    res.send({
      School: schools,
    });
  });
});

//admin section

router.post("/adminLogin", (req, res) => {
  AdminModel.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            username: user.username,
          };

          res.json("loggedIN");
        } else {
          // Passwords don't match
          res.json("password doesn't match");
        }
      } else {
        res.json("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.get("/dashoboardData", (req, res) => {
  UserModel.count().then((r) => {
    UserModel.distinct("schoolname").then((schools) => {
      res.send({
        Student: r,
        School: schools.length,
      });
    });
  });
});

router.post("/dashboardFindByschool", (req, res) => {
  UserModel.find(
    { schoolname: req.body.schoolname },
    { username: 1, "singlegamedata._id": 1, "gamedata._id": 1, myclass: 1 }
  ).then((students) => {
    res.send({
      totalStudents: students.length,
      data: students,
      class: students.myclass,
    });
  });
});

router.post("/loginSchoolAdmin", (req, res) => {
  SchoolModel.findOne({ EIIN: req.body.data.EIIN }).then((school) => {
    if (school) {
      if (req.body.data.password === school.EIIN) {
        res.send(school);
      } else {
        res.json("password doesn't match");
      }
    } else {
      res.json("User does not exist");
    }
  });
});

router.get("/latestSerial", (req, res) => {
  QuestionModel.count().then((e) => res.send({ serialno: e.toString() }));
});

router.get("/registerSchoolCount", (req, res) => {
  let dataSchool = [];

  const populateSchools = async (i) => {
    const users = await UserModel.find({ schoolname: i }, { _id: 1 });
    const usersResponse = users;
    return Promise.resolve({
      schoolname: i,
      students: usersResponse.length,
    });
  };

  const getScgoolCount = async () => {
    try {
      const responseSchool = await UserModel.distinct("schoolname");
      const jsonSchool = await responseSchool;

      Promise.all(jsonSchool.map(populateSchools)).then((data) => {
        dataSchool = data;
        function SORTS(a, b) {
          const dataA = a.students;
          const dataB = b.students;
          let comparison = 0;
          if (dataA > dataB) {
            comparison = -1;
          } else if (dataA < dataB) {
            comparison = 1;
          }
          return comparison;
        }
        dataSchool = dataSchool.sort(SORTS);
        res.send(dataSchool);
      });
    } catch (error) {
      console.log(error);
    }
  };

  getScgoolCount();
});

router.get("/fixData", async (req, res) => {
  let newUserData = [];
  const getUserData = async () => {
    try {
      const responseSchool = await UserModel.find().skip(4000).limit(1000);

      const userRaw = await responseSchool;
      userRaw.map((userData) => {
        // function uniqByKeepFirst(a, key) {
        //   let seen = new Set();
        //   return a.filter((item) => {
        //     let k = key(item);
        //     return seen.has(k) ? false : seen.add(k);
        //   });
        // }
        userData.singlegamedata.map((e) => {
          if (parseInt(e.myscore) > 90) {
            e.myscore = Math.floor(Math.random() * 31) + 40;
          }
        });
        newUserData.push({
          ...userData._doc,
        });
      });

      res.send(newUserData);
    } catch (error) {
      console.log(error);
    }
  };

  getUserData();
});

module.exports = router;
