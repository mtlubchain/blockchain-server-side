const Block = require('./block.js');
const express = require('express');


// let tempBlock0 = new Block(0,'dupa0', 'dzisiaj','oto moje dane','smaz hasz');
// let tempBlock1 = new Block(0,'dupa1', 'wczoraj','oto moje dane','smaz hasz');


let tempBlock0 = new Block(0,"dupa0","dzisiaj","oto moje dane","smaz hasz");
let tempBlock1 = new Block(1,"dupa1","wczoraj","oto moje dane","smaz hasz");

const arr = [];
arr.push(tempBlock0);
arr.push(tempBlock1);


const app = express();
app.get('/',function(req, res) {
    res.setHeader('Content-type', 'application/json');
    res.json(arr);
});
// TUTORIAL how to use params
app.get('/users/:userId/token/:key', (req, res) => {
    res.send(req.params);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });