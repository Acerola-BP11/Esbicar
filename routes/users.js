const express = require('express');
const { login, sign } = require('../controllers/User');
var router = express.Router();
const apicache = require('apicache');
const verifyToken = require('../middleware/verifyToken');

// Configuração do cache com o mesmo tempo do Token para que requisições simultaneas não gerem novos Tokens
const cache = apicache.middleware("5 minutes")

// Rotas desprotegidas
router.post('/login', login, cache, sign);

// implementação do Middleware
router.use(verifyToken)

// Rotas protegidas
router.post('/validate', (req, res) => {
  res.send('Token validado!')
})


module.exports = router