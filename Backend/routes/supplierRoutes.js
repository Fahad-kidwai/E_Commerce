const express = require("express");
const router = express.Router();

const {
  getSupplier,
  getAllSupplier,
  createSupplier,
  updateSupplier,
} = require("../controllers/supplierControllers");

router.route("/").get(getAllSupplier).post(createSupplier);
router.route("/:id").get(getSupplier).put(updateSupplier);

module.exports = router;
