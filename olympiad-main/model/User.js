const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StatsSchema = new Schema({
  question: String,
  correctanswer: String,
  myanswer: String,
});

const GameSchema = new Schema({
  gameID: String,
  myscore: String,
  time: String,
  result: String,
  my_stats: [StatsSchema],
  oppnonet_stats: [StatsSchema],
  opponetName: String,
  opponetscore: String,
  Subject: String,
  Chapter: String,
});

const SingleSchema = new Schema({
  myscore: String,
  time: String,
  my_stats: [StatsSchema],
  Subject: String,
  Chapter: String,
  Skip: String,
});

const UserSchema = new Schema({
  username: {
    type: String,
  },
  category: {
    type: Number,
  },
  madrasha: {
    type: Boolean,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  myclass: {
    type: String,
  },
  imgname: {
    type: String,
  },
  schoolname: {
    type: String,
  },
  eiin: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  dob: {
    type: String,
  },
  password: {
    type: String,
  },
  gamedata: [GameSchema],
  singlegamedata: [SingleSchema],
  gameID: {
    type: String,
  },
  challenger: {
    type: String,
  },
  declined: {
    type: Boolean,
  },
  totalwin: {
    type: Number,
  },
  totallost: {
    type: Number,
  },
  totaldraw: {
    type: Number,
  },
  deviceToken: {
    type: String,
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
