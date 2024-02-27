const Participant = require('../models/participantstableModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-api');

const getAllParticipants = asyncWrapper(async (req, res) => {
  const { teamname,username,password,sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (teamname) {
    queryObject.teamname = { $regex: teamname, $options: 'i' };
  }
  if (username) {
    queryObject.username = { $regex: username, $options: 'i' };
  }
  if (password) {
    queryObject.username = { $regex: password, $options: 'i' };
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['score','balanceamount','Playercount','Batsmancount','Bowlercount','Wicketkeepercount','Allroundercount','Overseascount','auctionerID'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Participant.find(queryObject);
    if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
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
  const participant = await Participant.create(req.body);
  res.status(201).json({ success: true, data: participant });
});

const getParticipantById = asyncWrapper(async (req, res, next) => {
  const { id: participantID } = req.params;
  const participant = await Participant.findOne({ _id: participantID });
  if (!participant) {
    return next(createCustomError(`No participant with id: ${participantID}`, 404));
  }
  res.status(200).json({ success: true, data: participant });
});

const deleteParticipant = asyncWrapper(async (req, res, next) => {
  const { id: participantID } = req.params;
  const participant = await Participant.findOneAndDelete({ _id: participantID });
  if (!participant) {
    return next(createCustomError(`No participant  with id: ${participantID}`, 404));
  }
  res.status(200).json({ success: true, data: participant });
});

const updateParticipant = asyncWrapper(async (req, res, next) => {
  const { id: participantID } = req.params;
  const participant = await Participant.findOneAndUpdate({ _id: participantID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!participant) {
    return next(createCustomError(`No participant with id: ${participantID}`, 404));
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