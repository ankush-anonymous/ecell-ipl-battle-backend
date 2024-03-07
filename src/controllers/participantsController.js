const Participant = require("../models/participantsModel");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-api");
const generateUniqueId = require("generate-unique-id");
const { StatusCodes } = require("http-status-codes");

const generateUserName = () => {
  const randomCharacters = generateUniqueId({
    length: 7,
    useLetters: true,
    useNumbers: true,
  });
  return `TEAM${randomCharacters}`;
  k;
};
const generatePassword = () => {
  const randomCharacters = generateUniqueId({
    length: 7,
    useLetters: true,
    useNumbers: true,
  });
  return randomCharacters;
};

const loginParticipant = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No participant found` });
    }

    const user = await Participant.findOne({ username, password });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No participant found` });
    }

    const token = user.createJWT();
    res.status(StatusCodes.ACCEPTED).json({
      user,
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error logging in user",
      error: error.message,
    });
  }
};

const getAllParticipants = asyncWrapper(async (req, res) => {
  const {
    teamname,
    username,
    password,
    sort,
    fields,
    numericFilters,
    auctioneerID,
  } = req.query;
  const queryObject = {};
  if (auctioneerID) {
    queryObject.auctioneerID = auctioneerID;
  }
  if (teamname) {
    queryObject.teamname = { $regex: teamname, $options: "i" };
  }
  if (username) {
    queryObject.username = { $regex: username, $options: "i" };
  }
  if (password) {
    queryObject.username = { $regex: password, $options: "i" };
  }

  const participants = await Participant.find(queryObject);

  res.status(200).json({ participants, nbHits: participants.length });
});

const createParticipant = asyncWrapper(async (req, res, next) => {
  const userName = generateUserName();
  const password = generatePassword();
  const participant = new Participant({
    auctioneerID: req.body.auctioneerID,
    username: userName,
    password: password,
    teamname: req.body.teamname,
    iplTeamLogo: req.body.iplTeamLogo,
    iplTeamName: req.body.iplTeamName,
    balanceAmount: 700000000,
  });
  const createdParticipant = await participant.save();
  res.status(201).json({ success: true, data: createdParticipant });
});

const getParticipantById = asyncWrapper(async (req, res, next) => {
  try {
    const { id: participantID } = req.params;
    const participant = await Participant.findOne({ _id: participantID });
    if (!participant) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No participant with id: ${participantID}` });
    }
    res.status(200).json({ success: true, data: participant });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving participant By id",
      error: error.message,
    });
  }
});

const deleteParticipant = asyncWrapper(async (req, res, next) => {
  const { id: participantID } = req.params;
  const participant = await Participant.findOneAndDelete({
    _id: participantID,
  });
  if (!participant) {
    return next(
      createCustomError(`No participant  with id: ${participantID}`, 404)
    );
  }
  res.status(200).json({ success: true, data: participant });
});

const deleteAllParticipant = async (req, res) => {
  try {
    const result = await Participant.deleteMany({});
    if (!result) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to delete players." });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "All participants deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting participants:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while deleting participants.",
    });
  }
};

const updateParticipant = asyncWrapper(async (req, res) => {
  try {
    const { id: participantID } = req.params;

    const participant = await Participant.findOneAndUpdate(
      { _id: participantID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!participant) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entry not found or not updated" });
    }
    res.status(StatusCodes.OK).json({
      message: "Entry updated successfully",
      result: participant,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating entry",
      error: error.message,
    });
  }
});

module.exports = {
  loginParticipant,
  getAllParticipants,
  createParticipant,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
  deleteAllParticipant,
};
