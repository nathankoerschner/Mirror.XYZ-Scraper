const { findAllArweaveTxs } = require("./arweave");

const pipeline = (startBlock, endBlock) => {
	let tickets = await findAllArweaveTxs(startBlock, endBlock, 1000);
	let cleanedTickets = [];
	for (let entry in tickets) {
		let transactionId = entry["node"]["id"];
		let contributer = entry["node"]["tags"][2]["value"];

		cleanedTickets.push([contributer, transactionId]);
	}
};
