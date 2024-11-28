const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
}, {timestamps: true})

const BookModel = mongoose.model('Books', bookSchema)
module.exports = BookModel