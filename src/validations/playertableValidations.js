const { check:playertableCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
playertablecheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];