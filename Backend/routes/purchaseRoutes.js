const express = require("express");
const router = express.Router();
const { protect, authorizedRoles } = require("../middleware/authMiddleware");

const {
  newPurchase,
  allPurchase,
} = require("../controllers/purchaseControllers");

router
  .route("/")
  .get(protect, authorizedRoles("admin"), allPurchase)
  .post(protect, authorizedRoles("admin"), newPurchase);

module.exports = router;
