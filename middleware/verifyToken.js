const jwt = require('jsonwebtoken')

require('dotenv-safe').config({
    example: './.env'
})

function verifyToken(req, res, next){
    let token = req.headers.cookie
    if(!token){
        return res.status(401).json({auth: false, msg: 'Para realizar essa operação é necessario estar logado!'})
    }
    token = token.replace('Session=', '')

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            return res.status(500).json({auth: false, msg: 'Ocorreu um erro ao validar o Login'})
        }
        req.userId = decoded.userId
        next()
    })
}

module.exports = verifyToken