const mongoose = require('mongoose')
const Supplier = require('./userModel')

const Purchase = mongoose.Schema({
    sl_ID:{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'Supplier'
    },
    pName:{
        type:String,
        // required: true,
    },
    pSku:{
        type: String,
        // required: true
    },
    quantity:{
        type: Number,
        // required:true,
    },
    costPrice:{
        type: Number,
        // required: true
    },
    totalAmnt:{
        type: Number,
        // required: true
    },
},
    {timestamps: true}
)

module.exports = mongoose.model('Purchase',Purchase)