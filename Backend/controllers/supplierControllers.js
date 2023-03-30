const asyncHandler = require("express-async-handler");

const Supplier = require("../models/supplierModel");

const getSupplier = asyncHandler(async (req, res) => {
  // const { p_No } = req.body;
  const supplier = await Supplier.findById(req.body.id);
  if (!supplier) {
    res.status(400);
    throw new Error("Supplier not found");
  }
  res.status(200).json({ message: supplier });
});

const getAllSupplier = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find();
  if (!suppliers) {
    res.status(400);
    throw new Error("Not found");
  }
  console.log(suppliers);
  res.status(200).json({ message: suppliers });
});

const createSupplier = asyncHandler(async (req, res) => {
  const { name, p_No, address } = req.body;
  console.log("create backend");
  if (!name || !p_No || !address) {
    res.status(400);
    throw new Error("Add all fields");
  }

  const supplierExist = await Supplier.findOne({ p_No });
  if (supplierExist) {
    res.status(400);
    throw new Error("Supplier Exists");
  }

  const supplier = await Supplier.create(req.body);
  if (supplier) {
    res.status(201).json({
      _id: supplier._id,
      name: supplier.name,
      p_No: supplier.p_No,
      address: supplier.address,
    });
  } else {
    res.status(400);
    throw new Error("Invalid supplier data");
  }
});

const updateSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) {
    res.status(400);
    throw new Error("Supplier not found");
  }
  const updatedSupplier = await Supplier.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedSupplier);
});

const deleteSuppllier = asyncHandler(async (req, res) => {
  const deleteSl = await Supplier.findByIdAndRemove(req.params.id);
  if (deleteSl) {
    res.status(200).json("Suppllier Deleted");
  } else {
    throw new Error("Suppllier not found");
  }
});

module.exports = {
  getSupplier,
  getAllSupplier,
  createSupplier,
  updateSupplier,
  deleteSuppllier,
};
