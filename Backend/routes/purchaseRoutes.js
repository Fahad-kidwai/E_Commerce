const express = require('express')
const router = express.Router()

const {newPurchase} = require('../controllers/purchaseControllers')

router.route('/').post(newPurchase)


module.exports = router