const express = require('express')
const router = express.Router()

const {
  getAllAuctioners,
  createAuctioner,
  getAuctionerById,
  updateAuctioner,
  deleteAuctioner
} = require('../controllers/auctionertableController')

router.route('/').get(getAllAuctioners).post(createAuctioner)
router.route('/:id').get(getAuctionerById).patch(updateAuctioner).delete(deleteAuctioner)

module.exports = router