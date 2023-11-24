const { isNil } = require("lodash")
const Product = require("../models/Product")


async function getProduct(req, res, next){
    const name = req.params.name

    try {
        const product = await Product.findOne(name)
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

async function newProduct(req, res, nexet){
    const {name, stock, sinopse, imdbRating, ageRatio, studio} = req.body

    try {
        await Product.create(name, stock, sinopse, imdbRating, ageRatio, studio)
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
        ageRatio: body.imdbRatio,
        studio: body.studio
    }
    
    let clientData = {}
    Object.entries(treatedBody).forEach(([key, value]) => {
        if (!isNil(value)) {
          clientData[key] = value;
        }
      });
    
      try {
        await Client.findByIDAndUpdate(clientID, clientData)
        res.status(200).json({msg: 'Cliente atualizado com sucesso!'})
      } catch (error) {
        res.status(500).json({msg: 'Erro ao atualizar o cliente'})
      }
}