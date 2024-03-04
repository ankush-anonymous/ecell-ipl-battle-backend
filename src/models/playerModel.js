const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerNo: {
    type: Number,
    required: [true, "Please provide playerNo"],
  },
  image: {
    type: String,
  },
  firstname: {
    type: String,
    required: [true, "Please provide name  "],
    maxlength: 50,
    // minlength: ,
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
  testCaps: {
    type: Number,
  },
  odiCaps: {
    type: Number,
  },
  t20Caps: {
    type: Number,
  },
  iplRating: {
    type: Number,
  },
  reserverPrice: {
    type: Number,
  },
  overseasFlag: {
    type: Boolean,
  },
});
module.exports = mongoose.model("player", playerSchema);
