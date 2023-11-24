const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb+srv://admin:admin@databaselocadora.afuwsy9.mongodb.net/?retryWrites=true&w=majority')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('Users', userSchema)

module.exports = User