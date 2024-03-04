const mongoose = require("mongoose");

const biddingTransitSchema = new mongoose.Schema({
  auctioneerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide Auctioneer ID  "],
  },
  participantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide Participant ID  "],
  },
  iplPlayerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide  iplPlayerID "],
  },
  biddingAmount: {
    type: Number,
    required: [true, "Please provide  Bidding Amount "],
  },
  // playerNo: {
  //   type: Number,
  //   required: [true, "Please provide  Player No "],
  // },
});

module.exports = mongoose.model("biddingTransit", biddingTransitSchema);
