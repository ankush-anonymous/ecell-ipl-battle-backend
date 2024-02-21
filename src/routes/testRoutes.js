const express = require("express");
const router = express.Router();

const testRouter = require("../controllers/testController");

//define routes

router.post("/postName", testRouter.postName);

module.exports = router;
