const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NationalQuestionEnglishSchema = new Schema({
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
  category: String,
  source: String,
});

const NationalQuestionEnglish = mongoose.model(
  "engquestions",
  NationalQuestionEnglishSchema
);

module.exports = NationalQuestionEnglish;
