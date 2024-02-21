const express = require('express')
const router = express.Router()

const {
  getAllParticipants,
  createParticipant,
  getParticipantById,
  updateParticipant,
  deleteParticipant
} = require('../controllers/participantstableController')

router.route('/').get(getAllParticipants).post(createParticipant)
router.route('/:id').get(getParticipantById).patch(updateParticipant).delete(deleteParticipant)

module.exports = router