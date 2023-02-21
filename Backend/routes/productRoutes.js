const express = require('express')
const router = express.Router()

const {getProdct,addProdct, updateProdct, deleteProdct,getProdctDetails} = require('../controllers/productControllers')
const { protect , authorizedRoles} = require('../middleware/authMiddleware')

// const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getProdct).post(protect,authorizedRoles("admin"),addProdct)
router.route('/:id').delete(protect,authorizedRoles("admin"),deleteProdct).put(protect,authorizedRoles("admin"),updateProdct).get(protect,getProdctDetails)

 
module.exports = router