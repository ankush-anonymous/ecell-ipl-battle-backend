const { check: auctioneertableCheck } = require("express-validator");

// TO-DO : Change this
exports.getByIdValidation = [
  auctioneertablecheck("shipmentId")
    .isLength({ min: 1 })
    .withMessage("ShipmentId could not be blank"),
];
