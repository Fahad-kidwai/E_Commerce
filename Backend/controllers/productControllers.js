const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");

//get All products
const getProdct = asyncHandler(async (req, res) => {
  const resultPerPage = 100;
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
  const { name, sku, category, qParam, image } = req.body;
  console.log(req.body);
  console.log(name, sku, category, qParam);
  if (!name || !sku || !qParam) {
    res.status(400);

    throw new Error("Add all fields");
  }
  const prodctExist = await Product.findOne({ sku });
  if (prodctExist) {
    res.status(400);
    throw new Error("Product already exist");
  }
  console.log("Adding product");
  const fileRes = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { folder: "ProductImages" }
  );

  const prodct = await Product.create({
    name,
    sku,
    category,
    image: {
      public_id: fileRes.public_id,
      secure_url: fileRes.secure_url,
    },
    qParam,
  });
  console.log(prodct);
  if (prodct) {
    res.status(201).json({
      success: true,
      prodct,
    });
  } else {
    res.status(400).json({
      success: false,
      prodct,
    });
  }
});

//Update  Product --admin
const updateProdct = asyncHandler(async (req, res) => {
  // console.log("st");
  const prodct = await Product.findById(req.params.id);
  // console.log("st1");
  console.log("Product", prodct);
  console.log("body", req.body);

  if (!prodct) {
    res.status(400);
    throw new Error("Product not found");
  }
  // console.log("st2");

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
  } else {
    throw new Error("Product not found");
  }
});

module.exports = {
  getProdct,
  addProdct,
  updateProdct,
  deleteProdct,
  getProdctDetails,
};
