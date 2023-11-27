const { isNil } = require('lodash')
const dataIsNullOrUndefined = require('../util/isNil')
const Client = require('../models/Client')

async function createClient(req, res, next){
    const {name, cpf, adress, birthDate} = req.body
    const isNullOrUndefined = dataIsNullOrUndefined([name, 'nome'], [cpf, 'CPF'], [adress, 'endereço'], [birthDate, 'data de nascimeto'])
    if(isNullOrUndefined){
        return res.status(200).json(isNullOrUndefined)
    }
    try {
        await Client.create({name, cpf, adress, birthDate})
        res.status(200).json({msg: 'Cliente criado com sucesso!'})
    } catch (err) {
        res.status(500).json({msg: 'Erro criando cliente'})
        console.error(err)
    }
}

async function getClient(req, res, next){
    const clientId = req.params.clientId
    try {
        const client = await Client.findById(clientId)
        if (client) {
            res.status(200).json(client)
        }else{
            res.status(200).json({msg: 'Cliente não encontrado'})
        }
    } catch (err) {
        res.status(500).json({msg: 'Não foi possivel encontrar o cliente'})
    }
}

async function getClients(req, res, next){
    try {
        const clientList = await Client.find()
        res.status(200).json({clientList})
    } catch (error) {
        res.status(500).json({msg: 'Não foi possivel listar os clientes'})
    }
}

async function updateClient(req, res, next){
    const clientID = req.params.clientId
    const body = req.body
    const treatedBody = {
        name: body.name,
        cpf: body.cpf,
        adress: body.adress,
        birthDate: body.birthDate
    }
    
    let clientData = {}
    Object.entries(treatedBody).forEach(([key, value]) => {
        if (!isNil(value)) {
          clientData[key] = value;
        }
      });
    
      try {
        await Client.findByIdAndUpdate(clientID, clientData)
        res.status(200).json({msg: 'Cliente atualizado com sucesso!'})
      } catch (error) {
        console.error(error)
        res.status(500).json({msg: 'Erro ao atualizar o cliente'})
      }
}

async function deleteClient(req, res, next){
    const clientId = req.params.clientId
    try {
        await Client.findByIdAndDelete(clientId)
        res.status(200).json({msg: 'Cliente deletado com sucesso!'})
    } catch (error) {
        res.status(500).json({msg: 'Ocorreu um erro ao deletar o cliente'})
    }
}

module.exports = {
    getClient,
    getClients,
    updateClient,
    createClient,
    deleteClient
}