const { check:superUserCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
superUsercheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];