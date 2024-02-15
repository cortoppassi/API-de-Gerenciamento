const express = require('express');
const router = express.Router();
var cron = require('node-cron');

cron.schedule('*/10 * * * * *', () => {
    console.log('Execultando o Node-Cron em 10 segundos');
});

router.get('/', (req, res) => {
    res.send('Funcionado')
})

module.exports = router