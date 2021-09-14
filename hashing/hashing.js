"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

for (let line of poem) {
	createBlock({ data: line });
}

function createBlock({ data }) {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length -1].hash, 
		data, 
		timeStamp: Date.now()
	}
	block.hash = blockHash(block);
	Blockchain.blocks.push(block);
	return block;
}

function blockHash(block) {
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		JSON.stringify(block)
	).digest("hex");
}

function verifyChain(Blockchain) {
	var blockchainIsValid = true;
	Blockchain.blocks.map((block, index) => {
		if (index > 0 && blockchainIsValid) {
			let blockCopy = JSON.stringify(block);
			blockCopy = JSON.parse(blockCopy);
			delete blockCopy.hash;
			blockchainIsValid = (
				block.data &&
				block.prevHash &&
				block.index >= 0 &&
				block.hash === blockHash(blockCopy) &&
				block.prevHash === Blockchain.blocks[index - 1].hash
			) ? true : false;
		}
	})
	return blockchainIsValid;
}

// Test to invalidate the blockchain
// Blockchain.blocks[2].prevHash = 'a';

console.log(
	'blocks: ', Blockchain.blocks,
	'verfied: ', verifyChain(Blockchain)
);