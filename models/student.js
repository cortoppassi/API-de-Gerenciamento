const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    rentedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Student', studentSchema);
