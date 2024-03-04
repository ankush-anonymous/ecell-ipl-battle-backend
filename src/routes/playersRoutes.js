const express = require("express");
const router = express.Router();

const {
  getAllPlayers,
  createPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  deleteAllPlayers,
} = require("../controllers/playerController");

router.route("/getAllPlayers").get(getAllPlayers);
router.route("/createPlayers").post(createPlayer);
router.route("/getPlayerById/:id").get(getPlayerById);
router.route("/updatePlayerById/:id").patch(updatePlayer);
router.route("/deletePlayerById/:id").delete(deletePlayer);
router.route("/deleteAllPlayers").delete(deleteAllPlayers);

module.exports = router;
