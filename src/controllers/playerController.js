const Player = require("../models/playerModel");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-api");

const getAllPlayers = asyncWrapper(async (req, res) => {
  try {
    const {
      firstname,
      surname,
      country,
      Specialism,
      BattingStyle,
      BowlingStyle,
      soldby,
      bidwonby,
      overseasflag,
      playerNo,
    } = req.query;
    const queryObject = {};

    if (overseasflag) {
      queryObject.overseasflag = overseasflag === "true" ? true : false;
    }
    if (firstname) {
      queryObject.firstname = { $regex: firstname, $options: "i" };
    }
    if (surname) {
      queryObject.surname = { $regex: surname, $options: "i" };
    }
    if (country) {
      queryObject.country = { $regex: country, $options: "i" };
    }
    if (Specialism) {
      queryObject.Specialism = { $regex: Specialism, $options: "i" };
    }
    if (BattingStyle) {
      queryObject.BattingStyle = { $regex: BattingStyle, $options: "i" };
    }
    if (BowlingStyle) {
      queryObject.BowlingStyle = { $regex: BowlingStyle, $options: "i" };
    }
    if (soldby) {
      queryObject.soldby = { $regex: soldby, $options: "i" };
    }
    if (bidwonby) {
      queryObject.bidwonby = { $regex: bidwonby, $options: "i" };
    }
    if (playerNo) {
      queryObject.playerNo = playerNo;
    }

    const players = await Player.find(queryObject);
    res.status(200).json({ players, nbHits: players.length });
  } catch (error) {
    console.log(error);
  }
});

const createPlayer = asyncWrapper(async (req, res, next) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json({ success: true, data: player });
  } catch (error) {
    console.log(error);
  }
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

const deleteAllPlayers = asyncWrapper(async (req, res, next) => {
  const result = await Player.deleteMany({});
  if (!result) {
    return next(createCustomError("Failed to delete players.", 500));
  }
  res
    .status(200)
    .json({ success: true, message: "All players deleted successfully." });
});

module.exports = {
  getAllPlayers,
  createPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  deleteAllPlayers,
};
