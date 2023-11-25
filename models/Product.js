const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin:admin@databaselocadora.afuwsy9.mongodb.net/?retryWrites=true&w=majority')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        default: 0
    },
    sinopse: String,
    imdbRating: mongoose.Schema.Types.Decimal128,
    ageRatio: Number,
    studio: String,
    price: mongoose.Schema.Types.Decimal128

})

const Product = mongoose.model('Product', productSchema)

module.exports = Product