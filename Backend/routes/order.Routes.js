const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const {protect} = require('../middleware/authMiddleware')

// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/").post(protect, newOrder);

router.route("/:id").get(protect, getSingleOrder);

router.route("/me").get(protect, myOrders);

router
  .route("/admin")
  .get(protect, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/:id")
  .put(protect, authorizeRoles("admin"), updateOrder)
  .delete(protect, authorizeRoles("admin"), deleteOrder);

module.exports = router;