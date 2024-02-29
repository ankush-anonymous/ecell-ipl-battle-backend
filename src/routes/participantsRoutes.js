const express = require("express");
const router = express.Router();

const {
  getAllParticipants,
  createParticipant,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participantsController");

router.route("/getAllParticipants").get(getAllParticipants);
router.route("/createParticipant").post(createParticipant);
router.route("/getParticipantsById/:id").get(getParticipantById);
router.route("/updateParticipantsById/:id").patch(updateParticipant);
router.route("/getParticipantsById/:id").delete(deleteParticipant);

module.exports = router;
