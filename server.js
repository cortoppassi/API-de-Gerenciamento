const express = require('express');
const app = express();
const mongoose = require('mongoose');
const subscribers = require('./routes/subscribers');
const nodeCron = require('./routes/nodeCron');
const schedule = require('node-schedule');
require('dotenv').config();

const desligar = schedule.scheduleJob('*/30 * * * * *', function(){
    console.log('Servidor encerrado');
});

mongoose.connect(process.env.DATABASE_STRING);
const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database Connected'));

app.use(express.json());
app.use('/nodeCron', nodeCron);
app.use('/subscribers', subscribers);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escutando na porta http://localhost:${port}`);
});
