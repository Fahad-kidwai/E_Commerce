const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please add a name']
    },
    sku:{
        type: String,
        required: [true,'Please add a sku'],
        unique: true
    },
    category:{
        type: String,
        required: [true,'Please add a category']
    },
    q_Param:{
        type: String,
        required: [true,'Please add a Quantity Parameters']
    },
    price:{
        type: Number,
    },
    Quantity:{
        type: Number,
    },

}, 
  {  timestamps: true,}

)

module.exports = mongoose.model('Product',productSchema)