const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MadrashaSchema = new Schema({
  INSTITUTE_NAME: String,
  THANA: String,
  DISTRICT: String,
  DIVISION_NAME: String,
  EIIN: String,
  PASSWORD: String,
});

const Madrasha = mongoose.model("madrasha", MadrashaSchema);

module.exports = Madrasha;
