const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Foddle = new Schema({
  time: String,
  word: String,
  foddleno: Number,
});

const FoddleModel = mongoose.model("foddles", Foddle);

module.exports = FoddleModel;
