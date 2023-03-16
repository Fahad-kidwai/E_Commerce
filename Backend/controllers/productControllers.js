const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");

//get All products
const getProdct = asyncHandler(async (req, res) => {
  const resultPerPage = 20;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  if (!products) {
    res.status(400);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// getproduct Details
const getProdctDetails = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);
  if (!products) {
    res.status(400);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// Create Product-- admin
const addProdct = asyncHandler(async (req, res) => {
  const { name, sku, category, q_Param } = req.body;
  console.log(name, sku, category, q_Param);
  if (!name || !sku || !q_Param) {
    res.status(400);
    throw new Error("Add all fields");
  }
  const prodctExist = await Product.findOne({ sku });
  if (prodctExist) {
    res.status(400);
    throw new Error("Product already exist");
  }
  console.log("Adding product");
  const prodct = await Product.create({
    name,
    sku,
    category,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
    q_Param,
  });
  if (prodct) {
    res.status(201).json({
      success: true,
      prodct,
    });
  }
});

//Update  Product --admin
const updateProdct = asyncHandler(async (req, res) => {
  console.log("st");
  const prodct = await Product.findById(req.params.id);
  console.log("st1");

  if (!prodct) {
    res.status(400);
    throw new Error("Product not found");
  }
  console.log("st2");

  const updatedProdct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json(updatedProdct);
});

const deleteProdct = asyncHandler(async (req, res) => {
  const deleteProdct = await Product.findByIdAndRemove(req.params.id);
  if (deleteProdct) {
    res.status(200).json("Product Deleted");
  }
});

module.exports = {
  getProdct,
  addProdct,
  updateProdct,
  deleteProdct,
  getProdctDetails,
};
