const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin:admin@databaselocadora.afuwsy9.mongodb.net/?retryWrites=true&w=majority')

const saleSchema = mongoose.Schema({
    client: Number,
    productList: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number
        }
    ]
})

const Sale = mongoose.model('Sale', saleSchema)

module.export = Sale