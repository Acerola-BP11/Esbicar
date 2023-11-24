const { default: mongoose } = require("mongoose");

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
    imdbRating: Float64Array,
    ageRatio: Number,
    studio: String

})

const Product = mongoose.model('Product', productSchema)

module.exports = Product