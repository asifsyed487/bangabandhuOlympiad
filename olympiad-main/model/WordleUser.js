const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuessesSchema = new Schema({
  word: Array,
  guess: String,
  time: String,
  correct: Boolean,
  guessno: Number,
  foddleno: Number,
});

const WordleUser = new Schema({
  id: String,
  played: Number,
  maxstreak: Number,
  currentstreak: Number,
  one: Number,
  two: Number,
  three: Number,
  four: Number,
  five: Number,
  six: Number,
  guesses: [GuessesSchema],
});

const WordleUserSchema = mongoose.model("foddleusers", WordleUser);
module.exports = WordleUserSchema;
