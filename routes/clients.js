const express = require('express');
const { updateClient, getClient, getClients, deleteClient, createClient } = require('../controllers/Client');
var router = express.Router();
const verifyToken = require('../middleware/verifyToken')


router.use(verifyToken)

router.get('/', getClients)
router.get('/:clientId', getClient)
router.patch('/:clientId', updateClient)
router.post('/new', createClient)
router.delete('/:clientId', deleteClient)

module.exports = router
