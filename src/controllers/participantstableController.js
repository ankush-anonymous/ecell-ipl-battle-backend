const Participant = require('../models/participantstableModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-api');

const getAllParticipants = asyncWrapper(async (req, res) => {
  const participant = await Participant.find({});
  res.status(200).json({ success: true, data: participant });
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