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

  Specialism: {
    type: String,
  },
  BattingStyle: {
    type: String,
  },
  BowlingStyle: {
    type: String,
  },

  iplRating: {
    type: Number,
  },
  reserverPrice: {
    type: Number,
  },
  overSeasFlag: {
    type: Boolean,
  },
  isStarPlayer: {
    type: Boolean,
  },
});
module.exports = mongoose.model("player", playerSchema);
