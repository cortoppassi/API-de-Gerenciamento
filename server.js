
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const subscribers = require('./routes/subscribers')

const schedule = require('node-schedule');
const data = new Date(2024, 1, 13, 19, 34);

schedule.scheduleJob(data, () => {
    mongoose.connect(process.env.DATABASE_STRING)
    const db = mongoose.connection
    db.on('error', (err)=> console.log(err))
    db.once('open', ()=> console.log('Databese Connected'))
})

require('dotenv').config()

app.use(express.json());



app.use('/subscribers', subscribers)

const port = 3000;
app.listen(port, () =>{
    console.log(`Servidor escultando na porta http://localhost:${port}`)
})