const { isNil } = require("lodash")
const Product = require("../models/Product")


async function getProduct(req, res, next){
    const productId = req.params.productId

    try {
        const product = await Product.findById(productId)
        if(isNil(product)){
            res.status(200).json({msg: 'Produto não encontrado'})
        }else{
            res.status(200).json(product)
        }
    } catch (err) {
        res.status(500).json({msg: 'Erro ao buscar produto'})
    }
}

async function getProducts(req, res, next){
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({msg: 'Erro ao buscar produtos'})
    }
}

async function newProduct(req, res, next){
    const {name, stock, sinopse, imdbRating, ageRatio, price} = req.body

    try {
        await Product.create({name, stock, sinopse, imdbRating, ageRatio, price})
        res.status(200).json({msg: 'Produto criado com sucesso!'})
    } catch (error) {
        res.status(500).json({msg: 'Ocorreu um erro ao criar o produto'})
    }
}

async function editProduct(req, res, next){
    const productId = req.params.productId
    const body = req.body
    const treatedBody = {
        name: body.name,
        stock: body.stock,
        sinopse: body.sinopse,
        imdbRating: body.imdbRating,
        ageRatio: body.ageRatio,
        studio: body.studio
    }
    
    let productdata = {}
    Object.entries(treatedBody).forEach(([key, value]) => {
        if (!isNil(value)) {
          productdata[key] = value;
        }
      });
    
      try {
        await Product.findByIdAndUpdate(productId, productdata, {runValidators: true})
        res.status(200).json({msg: 'produto atualizado com sucesso!'})
      } catch (error) {
        res.status(500).json({msg: 'Erro ao atualizar o produto'})
      }
}

async function deleteProduct(req, res, next){
    const productId = req.params.productId
    try {
        await Product.findByIdAndDelete(productId)
        res.status(200).json({msg: 'Produto deletado com sucesso!'})
    } catch (error) {
        res.status(500).json({msg: 'Ocorreu um erro ao deletar o Produto'})
    }
}

module.exports = {
    getProduct,
    getProducts,
    newProduct,
    editProduct,
    deleteProduct
}