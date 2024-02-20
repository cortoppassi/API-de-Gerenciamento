const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    admin: { type: Boolean, default: false },
});

module.exports = mongoose.model('Student', studentSchema);
