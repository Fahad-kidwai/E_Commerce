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
    rating:{
        type: Number,
        default: 0
    },
    images:[
        {
           public_id:{
            type: String,
            required: true
           },
           url:{
            type: String,
            required: true
           } 
        }
    ],
    q_Param:{
        type: String,
        required: [true,'Please add a Quantity Parameters']
    },
    price:{
        type: Number,
    },
    Quantity:{
        type: Number,
        maxLen: 4
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type: String,
                requied: true
            },
            rating:{
                type:Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ]

}, 
  {  timestamps: true,}

)

module.exports = mongoose.model('Product',productSchema)