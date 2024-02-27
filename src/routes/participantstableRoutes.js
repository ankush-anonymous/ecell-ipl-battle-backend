const express = require('express')
const router = express.Router()

const {
  getAllParticipants,
  createParticipant,
  getParticipantById,
  updateParticipant,
  deleteParticipant
} = require('../controllers/participantstableController')

router.route('/getAllParticipants').get(getAllParticipants)
router.route('/getAllParticipants').post(createParticipant)
router.route('/getParticipantById:id').get(getParticipantById)
router.route('/updateParticipantById:id').patch(updateParticipant)
router.route('/deleteParticipantById:id').delete(deleteParticipant)


module.exports = router
