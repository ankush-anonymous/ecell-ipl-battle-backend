const Auctioner = require('../models/auctionertableModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-api');

const getAllAuctioners = asyncWrapper(async (req, res) => {
  const auctioner = await Auctioner.find({});
  res.status(200).json({ success: true, data: auctioner });
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