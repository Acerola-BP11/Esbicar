const { isNil } = require('lodash')
const User = require('../models/User')

require('dotenv-safe').config({
    example: './.env'
})
const jwt = require('jsonwebtoken')
const isNou = require('../util/isNil')

async function login(req, res, next){
    const {email, password} = req.body
    let user
    try {
        user = await User.findOne({email, password})
    } catch (err) {
        return res.status(500).json({msg: 'Ocorreu um erro'})
    }
    if(user){
        req.body.user = user
        next()
    }else{
        return res.status(200).json({auth: false, msg: 'Usuario ou senha invalidos!'})
    }
}

async function sign(req, res, next){
    const user = req.body.user
    const userId = user.id
    const token = jwt.sign({userId}, process.env.SECRET, {
        expiresIn: '5 minutes'
    })
    res.status(200).cookie('Session', token, {expire: 300 + Date.now()}).json({auth: true, token})
}

async function createUser(req, res, next){
    const {email, password} = req.body
    const isNullOrUndefined = isNou([email, 'email'], [password, 'password'])
    if(isNullOrUndefined){
        return res.status(200).json(isNullOrUndefined)
    }
    try {
        await User.create({email, password})
        res.status(200).json({msg: 'Usuario criado com sucesso!'})
    } catch (error) {
        res.status(500).json({msg: 'Ocorreu um erro criando o usuario'})
    }
}

async function editUser(req, res, next){
    const {email, password, newPassword} = req.body
    const isNullOrUndefined = isNou([email, 'email'], [password, 'Senha'], [newPassword, 'Nova Senha'])
    if(isNullOrUndefined){
        return res.status(200).json(isNullOrUndefined)
    }
    try {
        const user = await User.findOne(email, password)
        if(isNil(user)){
            res.status(200).json({msg: 'Usuario ou senha invalidos'})
        }else{
            await user.update({password})
            res.status(200).json({msg: 'Usuario atualizado com sucesso!'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Ocorreu um erro ao atualizar o usuario'})
    }
}

module.exports = {
    login,
    sign,
    createUser,
    editUser
}