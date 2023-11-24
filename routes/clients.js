const express = require('express');
const { updateClient } = require('../controllers/Client');
var router = express.Router();

router.post('/update/:id', updateClient)

module.exports = router
