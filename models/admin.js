const mongoose = require('mongoose');

const adminShema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }  
});

module.exports = mongoose.model('Admin', adminShema);