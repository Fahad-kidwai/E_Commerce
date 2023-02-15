const express = require('express')
const router = express.Router()

const {getProdct,addProdct, updateProdct, deleteProdct,getProdctDetails} = require('../controllers/productControllers')

// const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getProdct).post(addProdct)
router.route('/:id').delete(deleteProdct).put(updateProdct).get(getProdctDetails)

 
module.exports = router