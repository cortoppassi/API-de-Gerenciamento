//subscriber.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    disponibility: { type: Boolean, required: true },
    deliveryDate: { type: Date, required: null },
})

module.exports = mongoose.model('Book', bookSchema);