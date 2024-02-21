const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    cpf: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
