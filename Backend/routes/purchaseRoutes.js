const express = require("express");
const router = express.Router();
const { protect, authorizedRoles } = require("../middleware/authMiddleware");

const newPurchase = require("../controllers/purchaseControllers");

router.route("/").post(protect, authorizedRoles("admin"), newPurchase);

module.exports = router;
