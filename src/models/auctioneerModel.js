const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auctioneerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    maxlength: 50,
    minlength: 3,
  },
  auctioneerName: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  coAuctioneerPhone: {
    type: Number,
    required: [true, "Please provide phoneNumber"],
    maxlength: 50,
    minlength: 3,
  },
  auctioneerPhone: {
    type: Number,
    required: [true, "Please provide correct phone number"],
    minlength: 10,
    maxlength: 13,
    unique: true,
  },
  roomNo: {
    type: String,
    required: [true, "Please provide correct room number"],
  },
  currentPlayerCount: {
    type: Number,
  },
});

auctioneerSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      password: this.password,
      auctioneerPhone: this.auctioneerPhone,
      coAuctioneerPhone: this.coAuctioneerPhone,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model("auctioneer", auctioneerSchema);
