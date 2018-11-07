const SHA256 = require('crypto-js/sha256');

class Transaction{
	constructor(){

	}
}



class Block {
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash =previousHash;
		this.hash = this.calculateHash;
		this.nonce = 0;
	}


	calculateHash(){
		return SHA256(this.index + this.timestamp + this.data + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
	}


	//

	mineBlock(difficulty){
		while(this.hash.toString().substring(0, difficulty) !== Array(difficulty+1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Block mined: " + this.hash);
	}
}









class BlockChain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
	}
	createGenesisBlock(){
		var newBlock = new Block(0, "05/10/2018", "genesis Block", "0");
		newBlock.hash = newBlock.calculateHash();
		return newBlock;

	}

	getLatestBlock(){

		return this.chain[this.chain.length-1];

	}
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		
		this.chain.push(newBlock);
	}

	isChainValid(){
		for(let i=1; i<this.chain.length;i++){
			const currentBlock =this.chain[i];
			const previousBlock =this.chain[i-1];


			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;

			}

			if(currentBlock.previousHash !== previousBlock.hash ){
				return false;
			}


		}

		return true;
	}
}


let doggeCoin = new BlockChain();
doggeCoin.addBlock(new Block(1, "05/10/2018", {amount:4}));
doggeCoin.addBlock(new Block(2, "05/10/2018", {amount:10}));


console.log('is the blockChain valid', doggeCoin.isChainValid());

console.log(JSON.stringify(doggeCoin,null,4));

