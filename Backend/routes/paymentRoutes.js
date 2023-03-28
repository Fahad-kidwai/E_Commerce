const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentControllers");
const router = express.Router();
const { protect, authorizedRoles } = require("../middleware/authMiddleware");

router.route("/process").post(protect, processPayment);

router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;
