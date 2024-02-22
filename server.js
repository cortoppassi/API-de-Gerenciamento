const express = require('express');
const app = express();
const connectDB = require('./db');

connectDB();

const books = require('./routes/books');
const students = require('./routes/students');
const adm = require('./routes/adm');

app.use(express.json());
app.use('/', books);
app.use('/students', students);
app.use('/adm', adm);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escutando na porta http://localhost:${port}`);
});
