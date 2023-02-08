const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const getProdct = asyncHandler(async(req,res)=>{
    const products = await Product.find()
    res.status(200).json({message: products})
    
})

const addProdct = asyncHandler(async(req,res)=>{
    const {name,sku,category,q_Param} = req.body
    if(!name || !sku || !q_Param){
        res.status(400)
        throw new Error("Add all fields")
    }
    const prodctExist = await Product.findOne({sku})
    if(prodctExist){
        res.status(400)
        throw new Error('Product already exist')
    }

    const prodct = Product.create({
        name,
        sku,
        category,
        q_Param
    })

    if(prodct){
    res.status(200).json({
        id: prodct.id,
        name: prodct.name,
        sku: prodct.sku,

    })
    }
})

const updateProdct = asyncHandler(async(req,res)=>{
    const prodct = await Product.findById(req.params.id)
    if(!prodct){
        res.status(400)
        throw new Error("Product not found")
    }

    const updatedProdct = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}) 
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
}