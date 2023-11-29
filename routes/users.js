const express = require('express');
const { login, sign, editUser, deleteUser, createUser } = require('../controllers/User');
var router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Rotas desprotegidas
router.post('/new', createUser)
router.post('/login', login, sign);

// implementação do Middleware
router.use(verifyToken)

// Rotas protegidas
router.patch('/', editUser)
router.delete('/:userId', deleteUser)


module.exports = router