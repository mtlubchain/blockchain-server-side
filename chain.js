const Block = require('./block.js');
const CryptoJS = require("crypto-js");

class Chain {

    constructor() {
        this.blockchain = [new Block(0, "0", 1465154705, "my genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7")];
    }

    getLatestBlock()  { return this.blockchain[this.blockchain.length - 1]; }

    generateNextBlock(blockData) {
        let previousBlock = this.getLatestBlock();
        let nextIndex = previousBlock.index + 1;
        let nextTimestamp = new Date().getTime() / 1000;
        let nextHash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
        return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
    }

    calculateHashForBlock(block) {
        return this.calculateHash(block.index, block.previousHash, block.timestamp, block.data);
    };

    calculateHash(index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    };

    addBlock(newBlock) {
        if (this.isValidNewBlock(newBlock, this.getLatestBlock())) {
            this.blockchain.push(newBlock);
        }
    }

    isValidNewBlock (newBlock, previousBlock) {
        if (previousBlock.index + 1 !== newBlock.index) {
            console.log('invalid index');
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash) {
            console.log('invalid previoushash');
            return false;
        } else if (this.calculateHashForBlock(newBlock) !== newBlock.hash) {
            console.log(typeof (newBlock.hash) + ' ' + typeof this.calculateHashForBlock(newBlock));
            console.log('invalid hash: ' + this.calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
            return false;
        }
        return true;
    };

}

module.exports = Chain;