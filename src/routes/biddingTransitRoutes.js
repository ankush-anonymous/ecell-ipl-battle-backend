const express = require("express");
const router = express.Router();

const biddingTransitController = require("../controllers/biddingTransitController");

//define routes

router.get(
  "/getAllBiddingTransit",
  biddingTransitController.getAllBiddingTransit
);
router.get(
  "/getBiddingTransitById/:id",
  biddingTransitController.getBiddingTransitById
);
router.post(
  "/createBiddingTransit",
  biddingTransitController.createBiddingTransit
);
router.patch(
  "/updateBiddingTransit/:id",
  biddingTransitController.updateBiddingTransit
);
router.delete(
  "/deleteBiddingTransit/:id",
  biddingTransitController.deleteBiddingTransit
);
router.delete(
  "/deleteAllBiddingTransit",
  biddingTransitController.deleteAllBiddingTransit
);

module.exports = router;
