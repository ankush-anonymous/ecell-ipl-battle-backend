const Auctioner = require('../models/auctionertableModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-api');

const getAllAuctioners = asyncWrapper(async (req, res) => {
  const {username,password,sort, fields, numericFilters } = req.query;
  const queryObject = {};
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
    const options = ['currentplayercount'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Auctioner.find(queryObject);
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
  const auctioners = await result;
  res.status(200).json({ auctioners, nbHits: auctioners.length });
});

const createAuctioner = asyncWrapper(async (req, res, next) => {
  const auctioner = await Auctioner.create(req.body);
  res.status(201).json({ success: true, data: auctioner });
});

const getAuctionerById = asyncWrapper(async (req, res, next) => {
  const { id: auctionerID } = req.params;
  const auctioner = await Auctioner.findOne({ _id: auctionerID });
  if (!auctioner) {
    return next(createCustomError(`No auctioner with id: ${auctionerID}`, 404));
  }
  res.status(200).json({ success: true, data: auctioner });
});

const deleteAuctioner = asyncWrapper(async (req, res, next) => {
  const { id: auctionerID } = req.params;
  const auctioner = await Auctioner.findOneAndDelete({ _id: auctionerID });
  if (!auctioner) {
    return next(createCustomError(`No auctioner  with id: ${auctionerID}`, 404));
  }
  res.status(200).json({ success: true, data: auctioner });
});

const updateAuctioner = asyncWrapper(async (req, res, next) => {
  const { id: auctionerID } = req.params;
  const auctioner = await Auctioner.findOneAndUpdate({ _id: auctionerID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!auctioner) {
    return next(createCustomError(`No auctioner with id: ${auctionerID}`, 404));
  }
  res.status(200).json({ success: true, data: auctioner });
});

module.exports = {
  getAllAuctioners,
  createAuctioner,
  getAuctionerById,
  updateAuctioner,
  deleteAuctioner,
};