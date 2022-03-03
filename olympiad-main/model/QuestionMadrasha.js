const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionMadrashaSchema = new Schema({
  question: String,
  correct_ans: String,
  opt_1: String,
  opt_2: String,
  opt_3: String,
  Subject: String,
  Chapter: String,
  Class: String,
  serialno: String,
});

const QuestionMadrasha = mongoose.model(
  "madrashaquestions",
  QuestionMadrashaSchema
);

module.exports = QuestionMadrasha;
