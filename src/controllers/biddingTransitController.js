const { StatusCodes } = require("http-status-codes");

const Transit = require("../models/biddingTransitModel");

const createBiddingTransit = async (req, res) => {
  const transit = await Transit.create(req.body);
  res.status(201).json({ success: true, data: transit });
};

const getAllBiddingTransit = async (req, res) => {
  try {
    const { auctioneerID, participantID, iplPlayerID, biddingAmount } =
      req.query;

    const queryObject = {};
    if (auctioneerID) {
      queryObject.auctioneerID = auctioneerID;
    }
    if (participantID) {
      queryObject.participantID = participantID;
    }
    if (iplPlayerID) {
      queryObject.iplPlayerID = iplPlayerID;
    }
    if (biddingAmount) {
      queryObject.biddingAmount = biddingAmount;
    }

    const result = await Transit.find(queryObject).exec(); // Execute the query

    res.status(200).json({ result, count: result.length }); // Send the documents
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBiddingTransitById = async (req, res) => {
  const { id: transitId } = req.params;
  const transit = await Transit.findOne({ _id: transitId });

  if (!transit) {
    return next(createCustomError(`No Transit with id: ${playerID}`, 404));
  }
  res.status(200).json({ success: true, data: transit });
};

const deleteBiddingTransit = async (req, res) => {
  const { id: transitId } = req.params;
  const transit = await Transit.findOneAndDelete({ _id: transitId });
  if (!transit) {
    return next(createCustomError(`No Transit with id: ${playerID}`, 404));
  }
  res.status(200).json({ success: true, data: transit });
};

const deleteAllBiddingTransit = async (req, res) => {
  try {
    const result = await Transit.deleteMany({});
    if (!result) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to delete Transactions." });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "All Transactions deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting Transactions:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while deleting Transactions.",
    });
  }
};

const updateBiddingTransit = async (req, res) => {
  const { id: transitId } = req.params;
  const transit = await Transit.findOneAndUpdate({ _id: transitId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!transit) {
    return next(createCustomError(`No transit with id: ${playerID}`, 404));
  }
  res.status(200).json({ success: true, data: transit });
};

module.exports = {
  createBiddingTransit,
  getAllBiddingTransit,
  getBiddingTransitById,
  deleteBiddingTransit,
  deleteAllBiddingTransit,
  updateBiddingTransit,
};
