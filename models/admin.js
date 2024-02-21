const mongoose = require('mongoose');

const adminShema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true }  
});

module.exports = mongoose.model('Admin', adminShema);