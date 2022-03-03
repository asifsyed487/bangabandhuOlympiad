const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: String,
  correct_ans: String,
  opt_1: String,
  opt_2: String,
  opt_3: String,
  Subject: String,
  Chapter: String,
  Class: String,
  serialno: String,
  img: String,
  category: Number,
  source: String,
});

const Question = mongoose.model("questions2", QuestionSchema);

module.exports = Question;
