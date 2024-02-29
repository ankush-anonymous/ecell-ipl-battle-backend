const express = require("express");
const router = express.Router();

const superUserController = require("../controllers/superUserController");

//define routes

router.post("/register", superUserController.registerSuperUser);
router.post("/login", superUserController.loginSuperUser);
// router.patch("/",superUserController.)
// router.delete("/",superUserController.)

module.exports = router;
