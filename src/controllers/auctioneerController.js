const Auctioneer = require("../models/auctioneerModel");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-api");
const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthenticatedError } = require("../errors");

const generateUniqueId = require("generate-unique-id");

const generateUserName = () => {
  const randomCharacters = generateUniqueId({
    length: 7,
    useLetters: true,
    useNumbers: true,
  });
  return `ROOM${randomCharacters}`;
};
const generatePassword = () => {
  const randomCharacters = generateUniqueId({
    length: 7,
    useLetters: true,
    useNumbers: true,
  });
  return randomCharacters;
};

const loginAuctioneer = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const user = await Auctioneer.findOne({ username, password });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.ACCEPTED).json({
    user: {
      _id: user._id,
      userName: user.username,
      phoneNumber: user.phoneNumber,
      roomNo: user.roomNo,
    },
    token,
  });
};

const getAllAuctioneer = asyncWrapper(async (req, res) => {
  const { username, password } = req.query;
  const queryObject = {};
  if (username) {
    queryObject.username = { $regex: username, $options: "i" };
  }
  if (password) {
    queryObject.password = { $regex: password, $options: "i" }; // Fixed property name
  }

  // Await the execution of the Mongoose query and convert the result to an array
  const result = await Auctioneer.find(queryObject).lean(); // Use lean() to get plain JS objects

  res.status(200).json({ result, nbHits: result.length });
});

const createAuctioneer = asyncWrapper(async (req, res, next) => {
  try {
    const userName = generateUserName();
    const password = generatePassword();

    // Create a new auctioneer instance using the request body
    const auctioneer = new Auctioneer({
      username: userName,
      password: password,
      auctioneerName: req.body.auctioneerName,
      coAuctioneerPhone: req.body.coAuctioneerPhone,
      auctioneerPhone: req.body.auctioneerPhone,
      roomNo: req.body.roomNo,
    });

    // Save the auctioneer to the database
    const createdAuctioneer = await auctioneer.save();

    res.status(201).json({ success: true, data: createdAuctioneer });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

const getAuctioneerById = asyncWrapper(async (req, res, next) => {
  try {
    const { id: auctioneerID } = req.params;
    const auctioneer = await Auctioneer.findOne({ _id: auctioneerID });
    if (!auctioneer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No auctioneer with id: ${auctioneerID}` });
    }
    res.status(200).json({ success: true, data: auctioneer });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving auctioneer By id",
      error: error.message,
    });
  }
});

const deleteAuctioneerById = asyncWrapper(async (req, res, next) => {
  try {
    const { id: auctioneerID } = req.params;
    const auctioneer = await Auctioneer.findOneAndDelete({
      _id: auctioneerID,
    });
    if (!auctioneer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entry not found or not deleted" });
    }
    res.status(StatusCodes.OK).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting entry",
      error: error.message,
    });
  }
});

const updateAuctioneerById = asyncWrapper(async (req, res, next) => {
  try {
    const { id: auctioneerID } = req.params;
    const auctioneer = await Auctioneer.findOneAndUpdate(
      { _id: auctioneerID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!auctioneer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entry not found or not updated" });
    }
    res.status(StatusCodes.OK).json({
      message: "Entry updated successfully",
      result: updatedDetails,
    });
  } catch (error) {}
});

module.exports = {
  loginAuctioneer,
  getAllAuctioneer,
  createAuctioneer,
  getAuctioneerById,
  updateAuctioneerById,
  deleteAuctioneerById,
};
