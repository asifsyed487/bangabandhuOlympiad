const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  INSTITUTE_NAME: String,
  THANA: String,
  DISTRICT: String,
  DIVISION_NAME: String,
  EIIN: String,
  PASSWORD: String,
});

const School = mongoose.model("schools", SchoolSchema);

module.exports = School;
