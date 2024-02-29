const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  firstname: {
    type: String,
    required: [true, "Please provide name  "],
    maxlength: 50,
    minlength: 3,
  },
  surname: {
    type: String,
    required: [true, "Please provide name  "],
    maxlength: 50,
    minlength: 3,
  },
  country: {
    type: String,
  },
  DOB: {
    type: Date,
  },
  Age: {
    type: Number,
  },
  Specialism: {
    type: String,
  },
  BattingStyle: {
    type: String,
  },
  BowlingStyle: {
    type: String,
  },
  testcaps: {
    type: Number,
  },
  odicaps: {
    type: Number,
  },
  t20caps: {
    type: Number,
  },
  iplrating: {
    type: Number,
  },
  reserverprice: {
    type: Number,
  },
  overseasflag: {
    type: Boolean,
  },
});
module.exports = mongoose.model("player", playerSchema);
