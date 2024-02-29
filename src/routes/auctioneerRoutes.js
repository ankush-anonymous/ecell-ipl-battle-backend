const express = require("express");
const router = express.Router();

const {
  loginAuctioneer,
  getAllAuctioneer,
  createAuctioneer,
  getAuctioneerById,
  updateAuctioneerById,
  deleteAuctioneerById,
} = require("../controllers/auctioneerController");

router.route("/getAllAuctioneer").get(getAllAuctioneer);
router.route("/createAuctioneer").post(createAuctioneer);
router.route("/loginAuctioneer").post(loginAuctioneer);
router.route("/getAuctioneerById/:id").get(getAuctioneerById);
router.route("/updateAuctioneerById/:id").patch(updateAuctioneerById);
router.route("/deleteAuctioneerById/:id").delete(deleteAuctioneerById);

module.exports = router;
