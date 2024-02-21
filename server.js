const express = require('express');
const app = express();
const mongoose = require('mongoose');
const books = require('./routes/books');
const students = require('./routes/students');
const adm = require('./routes/adm');
require('dotenv').config();


mongoose.connect(process.env.DATABASE_STRING);
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database Connected'));


app.use(express.json());
app.use('/', books);
app.use('/students', students);
app.use('/adm', adm);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escutando na porta http://localhost:${port}`);
});
