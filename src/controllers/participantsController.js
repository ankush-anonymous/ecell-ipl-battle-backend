const Participant = require("../models/participantsModel");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-api");
const generateUniqueId = require("generate-unique-id");

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
    balanceAmount: 50000,
  });
  const createdParticipant = await participant.save();
  res.status(201).json({ success: true, data: createdParticipant });
});

const getParticipantById = asyncWrapper(async (req, res, next) => {
  const { id: participantID } = req.params;
  const participant = await Participant.findOne({ _id: participantID });
  if (!participant) {
    return next(
      createCustomError(`No participant with id: ${participantID}`, 404)
    );
  }
  res.status(200).json({ success: true, data: participant });
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

const updateParticipant = asyncWrapper(async (req, res, next) => {
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
    return next(
      createCustomError(`No participant with id: ${participantID}`, 404)
    );
  }
  res.status(200).json({ success: true, data: participant });
});

module.exports = {
  getAllParticipants,
  createParticipant,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
};
