const express = require('express')
const router = express.Router()

const {getSupplier,createSupplier , updateSupplier} = require('../controllers/supplierControllers')

router.route('/').get(getSupplier).post(createSupplier)
router.route('/:id').put(updateSupplier)

module.exports = router