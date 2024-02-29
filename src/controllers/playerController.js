const Player = require("../models/playerModel");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-api");

const getAllPlayers = asyncWrapper(async (req, res) => {
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
    sort,
    fields,
    numericFilters,
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
      "Age",
      "testcaps",
      "odicaps",
      "t20caps",
      "iplrating",
      "reserverprice",
      "",
    ];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Player.find(queryObject);
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
  const players = await result;
  res.status(200).json({ players, nbHits: players.length });
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
