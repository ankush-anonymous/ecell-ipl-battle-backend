const { check:participantstableCheck } = require('express-validator');

// TO-DO : Change this
exports.getByIdValidation = [
participantstablecheck('shipmentId').isLength({min:1}).withMessage('ShipmentId could not be blank'),
];