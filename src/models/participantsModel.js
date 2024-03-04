const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const participantSchema = new mongoose.Schema({
  auctioneerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide Auctioneer ID  "],
  },
  teamname: {
    type: String,
    required: [true, "Please provide name  "],
    maxlength: 50,
    minlength: 3,
  },
  iplTeamName: {
    type: String,
    required: [true, "Please provide IPL team name  "],
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
    default: 0,
  },
  balanceAmount: {
    type: Number,
  },
  PlayerCount: {
    type: Number,
    default: 0,
  },
  BatsmanCount: {
    type: Number,
    default: 0,
  },
  BowlerCount: {
    type: Number,
    default: 0,
  },
  WicketKeeperCount: {
    type: Number,
    default: 0,
  },
  AllRounderCount: {
    type: Number,
    default: 0,
  },
  OverseasCount: {
    type: Number,
    default: 0,
  },
  StarCount: {
    type: Number,
    default: 0,
  },
  NonOverSeasCount: {
    type: Number,
    default: 0,
  },
});

participantSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      password: this.password,
      balanceAmount: this.balanceAmount,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model("participants", participantSchema);
