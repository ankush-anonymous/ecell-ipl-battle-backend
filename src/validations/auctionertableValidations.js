const { check:auctionertableCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
auctionertablecheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];