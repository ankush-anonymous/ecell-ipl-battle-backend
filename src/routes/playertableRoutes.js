const express = require('express')
const router = express.Router()

const {
  getAllPlayers,
  createPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer
} = require('../controllers/playertableController')

router.route('/').get(getAllPlayers).post(createPlayer)
router.route('/:id').get(getPlayerById).patch(updatePlayer).delete(deletePlayer)

module.exports = router