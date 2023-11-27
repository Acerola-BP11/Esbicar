const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin:admin@databaselocadora.afuwsy9.mongodb.net/?retryWrites=true&w=majority')

const saleSchema = mongoose.Schema({
    client: mongoose.SchemaTypes.ObjectId,
    productList: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number
        }
    ],
    date: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now()
    }
})

const Sale = mongoose.model('Sale', saleSchema)

module.exports = Sale