const express = require('express')
const router = express.Router()

const {
  getAllAuctioners,
  createAuctioner,
  getAuctionerById,
  updateAuctioner,
  deleteAuctioner
} = require('../controllers/auctionertableController')

router.route('/getAllAuctioners').get(getAllAuctioners)
router.route('/createAuctioners').post(createAuctioner)
router.route('/getAuctionerById/:id').get(getAuctionerById)
router.route('/updateAuctionerById/:id').patch(updateAuctioner)
router.route('/deleteAuctionerById/:id').delete(deleteAuctioner)




module.exports = router