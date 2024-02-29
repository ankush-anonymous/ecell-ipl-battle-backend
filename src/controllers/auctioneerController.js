const auctioneer = require("../models/auctioneerModel");
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

  const user = await auctioneer.findOne({ username, password });
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
  const { username, password, sort, fields, numericFilters } = req.query;
  const queryObject = {};
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
    const options = ["currentplayercount"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = auctioneer.find(queryObject);
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
  const auctioneers = await result;
  res.status(200).json({ auctioneers, nbHits: auctioneers.length });
});

const createAuctioneer = asyncWrapper(async (req, res, next) => {
  try {
    const userName = generateUserName();
    const password = generatePassword();

    // Create a new auctioneer instance using the request body
    const auctioneer = new auctioneer({
      username: userName,
      password: password,
      auctioneerName: req.body.auctioneerName,
      coAuctioneerPhone: req.body.coAuctioneerPhone,
      auctioneerPhone: req.body.auctioneerPhone,
      currentPlayerCount: req.body.currentPlayerCount,
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
  const { id: auctioneerID } = req.params;
  const auctioneer = await auctioneer.findOne({ _id: auctioneerID });
  if (!auctioneer) {
    return next(
      createCustomError(`No auctioneer with id: ${auctioneerID}`, 404)
    );
  }
  res.status(200).json({ success: true, data: auctioneer });
});

const deleteAuctioneerById = asyncWrapper(async (req, res, next) => {
  const { id: auctioneerID } = req.params;
  const auctioneer = await auctioneer.findOneAndDelete({ _id: auctioneerID });
  if (!auctioneer) {
    return next(
      createCustomError(`No auctioneer  with id: ${auctioneerID}`, 404)
    );
  }
  res.status(200).json({ success: true, data: auctioneer });
});

const updateAuctioneerById = asyncWrapper(async (req, res, next) => {
  const { id: auctioneerID } = req.params;
  const auctioneer = await auctioneer.findOneAndUpdate(
    { _id: auctioneerID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!auctioneer) {
    return next(
      createCustomError(`No auctioneer with id: ${auctioneerID}`, 404)
    );
  }
  res.status(200).json({ success: true, data: auctioneer });
});

module.exports = {
  loginAuctioneer,
  getAllAuctioneer,
  createAuctioneer,
  getAuctioneerById,
  updateAuctioneerById,
  deleteAuctioneerById,
};
