const { check:biddingTransitCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
biddingTransitcheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];