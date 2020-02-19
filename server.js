const express = require('express');
const app = express();
const stocksArray = require('./scraper');

app.get('/api/stocks', (req, res) => {
    res.json(stocksArray);
});


const port = 5000;

app.listen(
    port, 
    () => console.log('Server started on port' + ' ' + port)
    );