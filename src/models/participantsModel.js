const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  auctioneerID: {
    type: Number,
  },
  teamname: {
    type: String,
    required: [true, "Please provide name  "],
    maxlength: 50,
    minlength: 3,
  },
  iplTeamName: {
    type: String,
    required: [true, "Please provide name  "],
    maxlength: 50,
    minlength: 3,
  },

  iplTeamLogo: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  score: {
    type: Number,
  },
  balancemount: {
    type: Number,
  },
  Playercount: {
    type: Number,
  },
  Batsmancount: {
    type: Number,
  },
  Bowlercount: {
    type: Number,
  },
  Wicketkeepercount: {
    type: Number,
  },
  Allroundercount: {
    type: Number,
  },
  Overseascount: {
    type: Number,
  },
});

module.exports = mongoose.model("participants", participantSchema);
