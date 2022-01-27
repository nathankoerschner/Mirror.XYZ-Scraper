const { fstat } = require("fs");
const { findAllArweaveTxs } = require("./arweave");
const { fetchData } = require("./fetchTransactionData");
const { exportData } = require("./readJsons");

const pipeline = async (startBlock, endBlock, pathToJSONOutput) => {
	let tickets = await findAllArweaveTxs(startBlock, endBlock, 1000);

	let cleanedTickets = [];
	for (let i in tickets) {
		let transactionId = tickets[i]["node"]["id"];
		let contributer = tickets[i]["node"]["tags"][2]["value"];

		cleanedTickets.push([contributer, transactionId]);
	}
	let uniqCleanedTickets = [...new Set(cleanedTickets)];

	fetchData(uniqCleanedTickets); // will spit out data as records in ./data

	setTimeout(async () => {
		console.log("now exporting data");
		await exportData("./data", pathToJSONOutput); // collects records from fetchData into a single files
		console.log(`Success. Data written to ${pathToJSONOutput}`);
	}, (uniqCleanedTickets.length / 4) * 1000 + 2000);
	//fetchData gets 4 records per second
};
let args = process.argv.slice(2);

// Pass startblock, endblock, .json file path
pipeline(parseInt(args[0]), parseInt(args[1]), args[2]);
