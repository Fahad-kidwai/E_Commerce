const express = require("express");
const router = express.Router();
const { protect, authorizedRoles } = require("../middleware/authMiddleware");

const {
  getSupplier,
  getAllSupplier,
  createSupplier,
  updateSupplier,
  deleteSuppllier,
} = require("../controllers/supplierControllers");

router
  .route("/")
  .get(protect, authorizedRoles("admin"), getAllSupplier)
  .post(protect, authorizedRoles("admin"), createSupplier);
router
  .route("/:id")
  .get(protect, authorizedRoles("admin"), getSupplier)
  .put(protect, authorizedRoles("admin"), updateSupplier)
  .delete(protect, authorizedRoles("admin"), deleteSuppllier);

module.exports = router;
