const express = require('express');
const router = express.Router();
var cron = require('node-cron');

cron.schedule('*/30 * * * * *', () => {
    console.log('30 segundos');
});

router.get('/', (req, res) => {
    res.send('Funcionado')
})

module.exports = router