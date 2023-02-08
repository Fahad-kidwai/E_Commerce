const asyncHandler = require('express-async-handler')

const newPurchase = asyncHandler(async(req,res)=>{
    res.status(200).json('Purchase Done')
})

module.exports = {
    newPurchase
}