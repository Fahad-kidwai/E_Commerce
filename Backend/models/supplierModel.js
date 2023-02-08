const mongoose = require('mongoose')

const supplierSchema  = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name']
    },
    p_No:{
        type: Number,
        required: [true,'Please add a number']
    },
    address: {
        type: String,
        required: [true,'Please add a address']
    }
})

module.exports = mongoose.model('Supplier',supplierSchema)