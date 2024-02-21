const Player = require('../models/playertableModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-api');

const getAllPlayers = asyncWrapper(async (req, res) => {
  const player = await Player.find({});
  res.status(200).json({ success: true, data: player });
});

const createPlayer = asyncWrapper(async (req, res, next) => {
  const player = await Player.create(req.body);
  res.status(201).json({ success: true, data: player });
});

const getPlayerById = asyncWrapper(async (req, res, next) => {
  const { id: playerID } = req.params;
  const player = await Player.findOne({ _id: playerID });
  if (!player) {
    return next(createCustomError(`No player with id: ${playerID}`, 404));
  }
  res.status(200).json({ success: true, data: player });
});

const deletePlayer = asyncWrapper(async (req, res, next) => {
  const { id: playerID } = req.params;
  const player = await Player.findOneAndDelete({ _id: playerID });
  if (!player) {
    return next(createCustomError(`No player  with id: ${playerID}`, 404));
  }
  res.status(200).json({ success: true, data: player });
});

const updatePlayer = asyncWrapper(async (req, res, next) => {
  const { id: playerID } = req.params;
  const player = await Player.findOneAndUpdate({ _id: playerID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!player) {
    return next(createCustomError(`No player with id: ${playerID}`, 404));
  }
  res.status(200).json({ success: true, data: player });
});

module.exports = {
  getAllPlayers,
  createPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};