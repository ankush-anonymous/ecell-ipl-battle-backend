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
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = [
      "score",
      "balanceamount",
      "Playercount",
      "Batsmancount",
      "Bowlercount",
      "Wicketkeepercount",
      "Allroundercount",
      "Overseascount",
      "auctionerID",
    ];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Participant.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const participants = await result;
  res.status(200).json({ participants, nbHits: participants.length });
});

const createParticipant = asyncWrapper(async (req, res, next) => {
  const userName = generateUserName();
  const password = generatePassword();
  const participant = new Participant({
    auctionerID: req.body.auctioneerID,
    username: userName,
    password: password,
    teamname: req.body.teamname,
    iplTeamName: req.body.iplTeamName,
    balancemount: 50000,
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
