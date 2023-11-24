const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb+srv://admin:admin@databaselocadora.afuwsy9.mongodb.net/?retryWrites=true&w=majority')

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true,
        unique: true
    },
    adress: String,
    birthDate: String
})

const Client = mongoose.model('Clients', clientSchema)

module.exports = Client