const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const ApiFeatures = require('../utils/apiFeatures')

const getProdct = asyncHandler(async(req,res)=>{
    const resultPerPage = 5
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    if(!products){
        res.status(400)
        throw new Error("Product not found")
    }

    res.status(200).json({
        success: true,
        products,
        productCount
    })  
})

// getproduct Details
const getProdctDetails = asyncHandler(async(req,res)=>{
    const products = await Product.findById(req.params.id)
    if(!products){
        res.status(400)
        throw new Error("Product not found")
    }

    res.status(200).json({
        success: true,
        products
    })  
})

// Create Product-- admin
const addProdct = asyncHandler(async(req,res)=>{
    const {name,sku,category,rating,images,q_Param,} = req.body
    if(!name || !sku || !q_Param){
        res.status(400)
        throw new Error("Add all fields")
    }
    const prodctExist = await Product.findOne({sku})
    if(prodctExist){
        res.status(400)
        throw new Error('Product already exist')
    }

    const prodct = await Product.create(req.body)

    if(prodct){
    res.status(201).json({
        success:true,
        prodct
    })
    }
})

//Update  Product --admin
const updateProdct = asyncHandler(async(req,res)=>{
    const prodct = await Product.findById(req.params.id)
    if(!prodct){
        res.status(400)
        throw new Error("Product not found")
    }

    const updatedProdct = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) 
    res.status(200).json(updatedProdct)
})

const deleteProdct = asyncHandler(async(req,res)=>{
    const deleteProdct = await Product.findByIdAndRemove(req.params.id)
    if(deleteProdct){
        res.status(200).json("Product Deleted")
    }
})

module.exports = {
    getProdct,
    addProdct,
    updateProdct,
    deleteProdct,
    getProdctDetails
}