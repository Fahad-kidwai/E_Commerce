const asyncHandler = require('express-async-handler')

const Supplier = require('../models/supplierModel')

const getSupplier = asyncHandler(async(req,res)=>{
    const {name} = req.body
    const supplier = await Supplier.find({name})
    if(!supplier){
        res.status(400)
        throw new Error('Supplier not found')
    }
    res.status(200).json({message: supplier})
})


const createSupplier = asyncHandler(async(req,res)=>{
    const {name,p_No,address} = req.body

    if(!name||!p_No||!address){
        res.status(400)
        throw new Error('Add all fields')
    }

    const supplier = await Supplier.create({
        name,
        p_No,
        address
    })
    if(supplier){
        res.status(201).json({
            id: supplier.id,
            name: supplier.name,
            p_No: supplier.p_No,
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid supplier data')
    }

})

const updateSupplier = asyncHandler(async(req,res)=>{
    const supplier = await Supplier.findById(req.params.id)
    if(!supplier){
        res.status(400)
        throw new Error('Supplier not found')
    }
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedSupplier)
})



module.exports= {
    getSupplier,
    createSupplier,
    updateSupplier
}