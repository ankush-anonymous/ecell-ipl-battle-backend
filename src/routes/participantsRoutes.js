const express = require("express");
const router = express.Router();

const {
  getAllParticipants,
  createParticipant,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
  deleteAllParticipant,
  loginParticipant,
} = require("../controllers/participantsController");

router.route("/getAllParticipants").get(getAllParticipants);
router.route("/createParticipant").post(createParticipant);
router.route("/loginParticipant").post(loginParticipant);
router.route("/getParticipantsById/:id").get(getParticipantById);
router.route("/updateParticipantsById/:id").patch(updateParticipant);
router.route("/deleteParticipantsById/:id").delete(deleteParticipant);
router.route("/deleteAllParticipant").delete(deleteAllParticipant);

module.exports = router;
