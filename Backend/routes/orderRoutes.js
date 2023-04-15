const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderControllers");
const router = express.Router();

const { protect, authorizedRoles } = require("../middleware/authMiddleware");

// const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/").post(protect, newOrder);

router.route("/me").get(protect, myOrders);

router.route("/admin").get(protect, authorizedRoles("admin"), getAllOrders);
router.route("/:id").get(protect, getSingleOrder);

router
  .route("/admin/:id")
  .put(protect, authorizedRoles("admin"), updateOrder)
  .delete(protect, authorizedRoles("admin"), deleteOrder);

module.exports = router;
