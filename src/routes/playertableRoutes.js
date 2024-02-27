const express = require('express')
const router = express.Router()

const {
  getAllPlayers,
  createPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer
} = require('../controllers/playertableController')

router.route('/getAllPlayers').get(getAllPlayers)
router.route('/getAllPlayers').post(createPlayer)
router.route('/getPlayerById:id').get(getPlayerById)
router.route('/updatePlayerById/:id').patch(updatePlayer)
router.route('/deletePlayerById/:id').delete(deletePlayer)

module.exports = router