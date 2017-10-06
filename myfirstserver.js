const express = require('express');
const bodyParser = require('body-parser');

const Block = require('./block.js');
const Chain = require('./chain');

const app = express();

app.use(bodyParser.json());

const blockchain = new Chain();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    next();
});


app.get('/blockchain', (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.json(blockchain);
    
});

app.post('/mineBlock', (req, res) => {
    console.log(req.body);
    let newBlock = blockchain.generateNextBlock(req.body);
    res.send(newBlock);
});

    // app.post('/mineBlock', (req, res) => {
//     var newBlock = generateNextBlock(req.body.data);
//     addBlock(newBlock);
//     broadcast(responseLatestMsg());
//     console.log('block added: ' + JSON.stringify(newBlock));
//     res.send();
// });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });

      // source.stream().filter(x -> x.id > 5).filter(x -> x.name == "Mateusz").collect(Collectors.toList());
    // List<Block> list = Arrays.newArrayList();
    // lista.stream().map(this::parseTOX).collect(Collectors.toList());