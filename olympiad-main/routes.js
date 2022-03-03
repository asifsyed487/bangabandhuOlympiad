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
const MadrashaModel = require("./model/Madrasha");
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

router.post("/register", async (req, res) => {
  try {
    const userData = {
      username: req.body.data.username,
      fullname: req.body.data.fullname,
      category: req.body.data.category,
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
          : req.body.data.class == "0"
          ? "0"
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
    const checkUser = await UserModel.findOne({
      username: req.body.data.username,
    });
    if (checkUser) {
      res.json("Username already exists");
    } else {
      await bcrypt.hash(req.body.data.password, 10, async (err, hash) => {
        try {
          userData.password = hash;
          const createUser = await UserModel.create(userData);
          if (createUser) {
            res.send("Registered");
          } else {
            res.send(err);
          }
        } catch (error) {
          res.status(500).end(error);
        }
      });
    }
  } catch (err) {
    res.send("err");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          _id: user._id,
          username: user.username,
          myclass: user.myclass,
          schoolname: user.schoolname,
          phonenumber: user.phonenumber,
          category: user.category,
        };
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 43200,
        });

        res.send(token);
      } else {
        res.json("password doesn't match");
      }
    } else {
      res.json("User does not exist");
    }
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/forgetpass", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
      phonenumber: req.body.phonenumber,
    });
    if (user) {
      res.json("Set New Password!");
    } else {
      res.json("User does not exist");
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/setnewpass", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
    });
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
  } catch (error) {
    res.json(error);
  }
});

router.post("/myclassmates", async (req, res) => {
  try {
    const school = await UserModel.find(
      {
        myclass: req.body.myclass,
      },
      { username: 1, schoolname: 1, deviceToken: 1 }
    );

    if (school) {
      res.send(school);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/classmatesSearch", async (req, res) => {
  const mapAsync = async (i) => {
    return Promise.resolve({
      deviceToken: i.deviceToken,
      value: i.username,
      label: i.username,
    });
  };
  try {
    const school = await UserModel.find(
      {
        myclass: req.body.myclass,
      },
      { username: 1, deviceToken: 1 }
    );

    if (school) {
      Promise.all(school.map(mapAsync))
        .then((Data) => res.send(Data))
        .catch((err) => res.send(err));
    }
  } catch (error) {
    res.json("eroor");
  }
});

router.post("/singleplayerquen", async (req, res) => {
  await QuestionModel.find({
    Class: [req.body.my_class, "0"],
    Subject: req.body.subject,
    Chapter: req.body.chapter,
    category: [req.body.category, 0],
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

router.post("/subject", async (req, res) => {
  try {
    const dataClass = await QuestionModel.distinct("Subject", {
      Class: req.body.Class,
      category: req.body.category,
    });
    console.log(req.body.categoryyarn);
    const dataAll = await QuestionModel.distinct("Subject", {
      category: 0,
    });
    const data = [...dataClass, ...dataAll];
    res.send(data);
  } catch (error) {
    res.send("error");
  }
});

router.post("/chapters", async (req, res) => {
  try {
    const data = await QuestionModel.distinct("Chapter", {
      Class: ["0", req.body.class],
      Subject: req.body.subject,
      category: [0, req.body.category],
    });

    res.send(data);
  } catch (error) {
    res.send("error");
  }
});

router.post("/gamestats", async (req, res) => {
  try {
    const data = await UserModel.findOneAndUpdate(
      {
        username: req.body.data.name,
      },

      {
        $inc: {
          totalwin: req.body.data.myscore > req.body.data.opponetscore ? 1 : 0,
          totallost: req.body.data.myscore < req.body.data.opponetscore ? 1 : 0,
          totaldraw:
            req.body.data.myscore === req.body.data.opponetscore ? 1 : 0,
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
    );
    res.send("done");
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/gamestatssingle", async (req, res) => {
  try {
    const data = await UserModel.findOneAndUpdate(
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
    );
    res.send("done");
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/leaderboard", async (req, res) => {
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
      res.send(error);
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
      points: data.points.slice(
        req.body.skip ? req.body.skip : 0,
        req.body.limit ? req.body.limit : 50
      ),
      totalwin: data.totalwin.slice(
        req.body.skip ? req.body.skip : 0,
        req.body.limit ? req.body.limit : 50
      ),
    };

    res.send(data);
  };
  getData();
});

router.post("/profileinfo", async (req, res) => {
  try {
    const data = await UserModel.findOne({ username: req.body.username });
    res.send(data);
  } catch (error) {
    res.send({ error: error });
  }
});

router.get("/schools", async (req, res) => {
  try {
    const data = await UserModel.distinct("schoolname");
    res.send(data);
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/schoolsname", async (req, res) => {
  const madrasha = req.body.madrasha;
  const model = madrasha == true ? MadrashaModel : SchoolModel;

  const mapAsync = async (i) => {
    return Promise.resolve({
      label: i.INSTITUTE_NAME,
      value: i.INSTITUTE_NAME,
    });
  };
  try {
    const foundSchool = await model.find(
      {
        DISTRICT: req.body.district,
      },
      {
        INSTITUTE_NAME: 1,
      }
    );

    Promise.all(foundSchool.map(mapAsync)).then((data) => {
      res.send(data);
    });
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/supportmail", async (req, res) => {
  try {
    const mailOptions = {
      from: "sadman@copotronic.com",
      to: "support@copotronic.com",
      subject: req.body.email.subject,
      text: req.body.email.text,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        res.send("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.send({ errpr: error });
  }
});

router.post("/allquens", async (req, res) => {
  try {
    const Questions = await QuestionModel.find({})
      .limit(20)
      .skip(req.body.skip);
    res.send(Questions);
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/sendchallenge", async (req, res) => {
  try {
    if (
      req.body.data.username &&
      req.body.data.gameID &&
      req.body.data.challenger !== ""
    ) {
      const r = await UserModel.findOneAndUpdate(
        { username: req.body.data.username },

        {
          $set: {
            gameID: req.body.data.gameID,
            challenger: req.body.data.challenger,
          },
        },
        { new: true }
      );
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
        FirebaseAdmin.messaging().sendToDevice(deviceToken, payload, options);
      }
      res.send("done");
    }
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/declinechallenge", async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(
      { username: req.body.data.username },

      {
        $set: {
          declined: req.body.data.declined,
        },
      },
      { new: true }
    );
    res.send("declined");
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/getgameid", async (req, res) => {
  try {
    const r = await UserModel.findOne({ username: req.body.username });
    if (r.gameID && r.challenger) {
      if (r.gameID !== "null" && r.challenger !== "null") {
        res.send({ gameID: r.gameID, challenger: r.challenger });
      } else {
        res.send({ gameID: "null", challenger: "null" });
      }
    }
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/checkdecline", async (req, res) => {
  try {
    const r = await UserModel.findOne({ username: req.body.username });
    if (r) {
      res.send({ declined: r.declined });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/savedevicetoken", async (req, res) => {
  try {
    const r = await UserModel.findOneAndUpdate(
      { username: req.body.data.username },

      {
        $set: {
          deviceToken: req.body.data.deviceToken,
        },
      },
      { new: true }
    );
    if (r) {
      res.send("savedToken");
    }
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/adminLogin", async (req, res) => {
  try {
    const user = await AdminModel.findOne({
      username: req.body.username,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json("loggedIN");
      } else {
        res.json("password doesn't match");
      }
    } else {
      res.json("User does not exist");
    }
  } catch (error) {
    res.send({ error: error });
  }
});

router.get("/dashoboardData", async (req, res) => {
  try {
    const r = await UserModel.count();
    const schools = await UserModel.distinct("schoolname");
    const response = await UserModel.find(
      {},
      {
        "singlegamedata.myscore": 1,
      }
    );
    const json = await response;
    const dataPoints = [];
    json.map((item) => {
      dataPoints.push(
        item.singlegamedata
          ? item.singlegamedata.reduce((gettotal, point) => {
              let val = parseInt(point.myscore);
              myponit = val += gettotal;
              return myponit;
            }, 0)
          : 0
      );
    });
    const Total = dataPoints.reduce((gettotal, point) => {
      let val = parseInt(point);
      myponit = val += gettotal;
      return myponit;
    }, 0);

    if (Total > 0) {
      res.send({
        Student: r,
        School: schools.length,
        totalPoints: Total,
        totalGame: 178018,
      });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/dashboardFindByschool", async (req, res) => {
  try {
    const students = await UserModel.find(
      { schoolname: req.body.schoolname },
      { username: 1, "singlegamedata._id": 1, "gamedata._id": 1, myclass: 1 }
    );

    if (students) {
      res.send({
        totalStudents: students.length,
        data: students,
        class: students.myclass,
      });
    }
  } catch (error) {
    res.send({ error: error });
  }
});
router.post("/loginSchoolAdmin", async (req, res) => {
  try {
    const school = await SchoolModel.findOne({ EIIN: req.body.data.EIIN });
    if (school) {
      if (req.body.data.password === school.EIIN) {
        res.send({
          status: 200,
          data: school,
        });
      } else {
        res.json("password doesn't match");
      }
    } else {
      res.json("User does not exist");
    }
  } catch (error) {
    res.send({ error: error });
  }
});

router.get("/latestSerial", async (req, res) => {
  try {
    const e = await QuestionModel.count();
    res.send({ serialno: e.toString() });
  } catch (error) {
    res.send({ error: error });
  }
});

router.get("/registerSchoolCount", async (req, res) => {
  try {
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
        res.send(error);
      }
    };

    getScgoolCount();
  } catch (error) {
    res.send({ error: error });
  }
});

// router.get("/fixData", async (req, res) => {
//   let newUserData = [];
//   const getUserData = async () => {
//     try {
//       const records = await UserModel.deleteMany()
//         .where("schoolname")
//         .in(schools)
//         .exec();

//       const userRaw = await records;
//       userRaw.map((userData) => {
//         //   // function uniqByKeepFirst(a, key) {
//         //   //   let seen = new Set();
//         //   //   return a.filter((item) => {
//         //   //     let k = key(item);
//         //   //     return seen.has(k) ? false : seen.add(k);
//         //   //   });
//         //   // }

//         //   // userData.singlegamedata.map((e) => {
//         //   //   const single_length = e.my_stats.length;

//         //   //   if (parseInt(e.myscore) > single_length * 10) {
//         //   //     e.myscore = single_length * 10 - Math.floor(Math.random() * 5);
//         //   //     console.log(e.myscore, single_length);
//         //   //   }
//         //   // });

//         const findSchool = schooldata.find(
//           (i) => i.wrong === userData.schoolname
//         );
//         console.log(findSchool);
//         newUserData.push({
//           ...userData._doc,
//           schoolname: findSchool.right,
//         });
//       });

//       res.send(userRaw);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getUserData();
// });

router.get("/maintainance", async (req, res) => {
  try {
    const message = {
      msg: "কারিগরি উন্নয়ন ও সফটওয়্যার আপডেট এর জন্য বঙ্গবন্ধু অলিম্পিয়াড সাময়িক ভাবে স্থগিত আছে। পরবর্তী পর্বে নতুন রুপে আবার আসছে অনলাইন কুইজ প্রতিযোগিতা বঙ্গবন্ধু অলিম্পিয়াড। সাময়িক অসুবিধার জন্য দুঃখিত।পরবর্তী ঘোষণার মাধ্যমে বিজয়ীদের নাম প্রকাশ করা হবে।",
      status: false,
    };

    res.json(message);
  } catch (error) {
    res.send({ error: error });
  }
});

const subjectss = [
  "আন্তর্জাতিক বিষয়াবলি",
  "আমার বাংলা বই",
  "ইংরেজি দ্বিতীয় পত্র",
  "ইংরেজি প্রথম পত্র",
  "ইসলাম ও নৈতিক শিক্ষা",
  "কর্ম ও জীবনমুখী শিক্ষা",
  "কৃষিশিক্ষা",
  "ক্যারিয়ার শিক্ষা",
  "গণিত",
  "গার্হস্থ্য বিজ্ঞান",
  "চট্টগ্রামের কৃষ্টিকালচার",
  "চারু ও কারুকলা",
  "তথ্য ও যোগাযোগ প্রযুক্তি",
  "প্রাথমিক গণিত",
  "প্রাথমিক বিজ্ঞান",
  "বঙ্গবন্ধু শেখ মুজিবুর রহমান",
  "বাংলা (ব্যাকরণ ও নির্মিতি)",
  "বাংলা - আনন্দপাঠ",
  "বাংলা দ্বিতীয় পত্র",
  "বাংলা প্রথম পত্র",
  "বাংলা সাহিত্য কণিকা",
  "বাংলাদেশ ও বিশ্বপরিচয়",
  "বাংলাদেশ বিষয়াবলি",
  "বাংলাদেশ মুক্তিযুদ্ধ ও স্বাধীনতা",
  "বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা",
  "ভাষা আন্দোলন",
  "শারীরিক শিক্ষা ও স্বাস্থ্য",
  "শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা",
  "হিন্দু ও নৈতিক শিক্ষা",
  "হিন্দুধর্ম ও নৈতিক শিক্ষা",
];

router.get("/getTotalSubjects", async (req, res) => {
  let dataSubjects = [];
  try {
    const populateSubjects = async (i) => {
      const datas = await UserModel.aggregate([
        {
          $project: {
            singlegamedata: 1,
          },
        },
        {
          $unwind: {
            path: "$singlegamedata",
          },
        },
        {
          $match: {
            "singlegamedata.Subject": i,
          },
        },
        {
          $group: {
            _id: { Subject: "$singlegamedata.Subject" },
            count: { $sum: 1 },
          },
        },
      ]);
      const usersResponse = await datas;

      return Promise.resolve(usersResponse[0]);
    };

    const getScgoolCount = async () => {
      try {
        Promise.all(subjectss.map(populateSubjects)).then((data) => {
          dataSubjects = data;
          function SORTS(a, b) {
            const dataA = a.count;
            const dataB = b.count;
            let comparison = 0;
            if (dataA > dataB) {
              comparison = -1;
            } else if (dataA < dataB) {
              comparison = 1;
            }
            return comparison;
          }
          dataSubjects = dataSubjects.sort(SORTS);
          res.send(dataSubjects);
        });
      } catch (error) {
        res.send(error);
      }
    };

    getScgoolCount();
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/districts", async (req, res) => {
  const mapAsync = async (i) => {
    return Promise.resolve({
      label: i,
      value: i,
    });
  };
  try {
    const madrasha = req.body.madrasha;
    const model = madrasha == true ? MadrashaModel : SchoolModel;
    const foundSchool = await model.distinct("DISTRICT");

    Promise.all(foundSchool.map(mapAsync)).then((data) => {
      res.send(data);
    });
  } catch (error) {
    res.send({ error: error });
  }
});

router.get("/updatesubject", async (req, res) => {
  try {
    const foundSchool = await QuestionModel.updateMany(
      { category: "1" },
      {
        $set: {
          category: 1,
        },
      },
      { multi: true }
    );
    res.send(foundSchool);
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/updateclass", async (req, res) => {
  try {
    const updatedData = await UserModel.findOneAndUpdate(
      { username: req.body.username },
      { $set: { myclass: req.body.myclass } },
      { new: true }
    );
    const payload = {
      _id: updatedData._id,
      username: updatedData.username,
      myclass: updatedData.myclass,
      schoolname: updatedData.schoolname,
      phonenumber: updatedData.phonenumber,
      category: updatedData.category,
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 43200,
    });

    res.send(token);
  } catch (error) {
    handleError(res, error.message);
  }
});

router.get("/updatequestion", (req, res) => {
  QuestionModel.find(
    { category: 7 },
    { Class: "0" },
    { multi: true },
    function (err, raw) {
      if (raw) return raw;
      if (err) return handleError(err);
      console.log("The raw response from Mongo was ", raw);
    }
  );
});

module.exports = router;
