const { check:testCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
testcheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];