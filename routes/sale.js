const express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getSales, getSale, getSalesByClient, editSale, newSale, deleteSale } = require('../controllers/Sale');


router.use(verifyToken)

router.get('/', getSales)
router.get('/:saleId', getSale)
router.get('/history/:clientId', getSalesByClient)
router.patch('/:saleId', editSale)
router.post('/new', newSale)
router.delete('/:saleId', deleteSale)

module.exports = router
