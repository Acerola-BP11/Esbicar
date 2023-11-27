const express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getProducts, getProduct, editProduct, newProduct, deleteProduct } = require('../controllers/Product');


router.get('/', getProducts)
router.get('/:productId', getProduct)

router.use(verifyToken)

router.patch('/update/:productId', editProduct)
router.post('/new', newProduct)
router.delete('/:productId', deleteProduct)

module.exports = router
