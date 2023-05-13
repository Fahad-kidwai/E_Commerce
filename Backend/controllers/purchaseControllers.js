const asyncHandler = require("express-async-handler");

const Purchase = require("../models/purchaseModel");
const Product = require("../models/productModel");

const newPurchase = asyncHandler(async (req, res) => {
  const { sl_ID, pName, pSku, quantity, costPrice, totalAmnt } = req.body;
  const purchase = await Purchase.create({
    sl_ID,
    pName,
    pSku,
    quantity,
    costPrice,
    totalAmnt,
  });
  if (purchase) {
    const product = await Product.findOne({ sku: pSku });
    console.log(product.sku);
    console.log(product.Quantity);
    var qty = Number(product.Quantity) + Number(quantity);
    console.log(qty);
    const updtProdct = await Product.findByIdAndUpdate(
      product._id,
      { Quantity: qty, costPrice: purchase.costPrice },
      { new: true }
    );
    if (updtProdct) {
      res.status(201).json({
        sl_ID: purchase.sl_ID,
        pName: purchase.pName,
        pSku: purchase.pSku,
        quantity: purchase.quantity,
        costPrice: purchase.costPrice,
        totalAmnt: purchase.totalAmnt,
      });
    }
  }
});

const allPurchase = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find();
  if (purchases) {
    res.status(201).json(purchases);
  }
});

module.exports = {
  newPurchase,
  allPurchase,
};
