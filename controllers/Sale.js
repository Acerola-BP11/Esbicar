const { default: mongoose } = require("mongoose")

const Sale = require('../models/Sale')
const Product = require("../models/Product")

async function getSales(req, res, next) {
    try {
        const sales = await Sale.find()
        res.status(200).json({ sales })
    } catch (error) {
        res.status(500).json({ msg: 'Ocorreu um erro ao listar os pedidos' })
    }
}

async function getSale(req, res, next) {
    const saleId = req.params.saleId
    try {
        const sale = await Sale.findById(saleId)
        res.status(200).json({ sale })
    } catch (error) {
        res.status(500).json({ msg: 'Ocorreu um erro ao listar o pedido' })
    }
}

async function editSale(req, res, next) {
    const saleId = req.params.saleId
    const { client, productList } = req.body
    try {
        await Sale.findByIdAndUpdate(saleId, { client, productList })
        res.status(200).json({ msg: 'Pedido atualizado com sucesso!' })
    } catch (error) {
        res.status(500).json({ msg: 'Ocorreu um erro ao atualizar o pedido' })
    }
}

async function newSale(req, res, next) {
    const { client, productList } = req.body
    try {
        if (!Array.isArray(productList)) res.status(200).json({ msg: 'Deve ser enviado uma lista de produtos' })
        for (const product of productList) {
            const productId = product.productId;
            const quantity = product.quantity;
            let oldStock = await Product.findById(productId).select('stock')
            oldStock = oldStock.stock
            newStock = oldStock - quantity
            console.log(newStock, oldStock, quantity)
            await Product.findByIdAndUpdate(productId, { stock: newStock }, { runValidators: true });
        }
        await Sale.create({ client, productList })
        res.status(200).json({ msg: 'Pedido Criado com sucesso!' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'Erro ao criar Pedido' })
    }
}

async function deleteSale(req, res, next) {
    const saleId = req.params.saleId
    try {
        await Sale.findByIdAndDelete(saleId)
        res.status(200).json({ msg: 'Pedido deletado com sucesso!' })
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao deletar pedido' })
    }
}

async function getSalesByClient(req, res, next){
    const clientId = req.params.clientId
    try {
        const clientOrders = await Sale.find({
            client: clientId
        })
        const orderList = clientOrders.map((el) => ({
            date: el.date,
            productList: el.productList
        }))
        res.status(200).json({orderList})
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao buscar historico de pedidos' })
    }
}

module.exports = {
    getSale,
    getSales,
    getSalesByClient,
    newSale,
    editSale,
    deleteSale
}