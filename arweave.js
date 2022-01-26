const { request, gql, GraphQLClient } = require("graphql-request");
const fs = require("fs");
const { findSourceMap } = require("module");
const { resourceLimits } = require("worker_threads");
const endpoint = "https://arweave.net/graphql";

const requestData = async (startBlock, step) => {
	const stopBlock = startBlock + step;
	let toReturn = [];

	let query = gql`
    {
        transactions(first:100, block: {min:${startBlock}, max:${stopBlock}}, tags: {name: "App-Name", values: "MirrorXYZ"}) {
            edges {
            cursor
                node {
                    id
                    tags{
                        name
                        value
                    }
                }
            }
        }
    }
    `;

	await request(endpoint, query).then((data) => {
		if (data.transactions.edges) {
			amount = Object.keys(data.transactions.edges).length;
			console.log("found " + amount + " tickets matching the query");
			toReturn = data.transactions.edges;
		} else {
			console.log("No transactions found.");
			toReturn = [];
		}
	});
	return toReturn;
};

// uses the query defined above to fetch all transactions matching this query between the blocks specified.
// includes a step variation feature, which changes the range based on the density of results, to efficiantly fetch data while complying with rate limits.
const findAll = async (startBlock, endBlock, initialStep) => {
	let step = initialStep;
	let results = [];

	currentBlock = startBlock;
	while (currentBlock < endBlock) {
		console.log("\n\n\n Current Block is ", currentBlock);
		await requestData(currentBlock, step).then((data) => {
			let numberOfResults = Object.keys(data).length;
			console.log(data);
			console.log(numberOfResults);
			if (numberOfResults == 100 && step != 1) {
				step = step / 10; // change to a smaller step
				currentBlock = currentBlock - step; // rewind to the previous block (accounting for end of while loop where step is added back)
				console.log("Changed Step to ", step);
			} else if (numberOfResults < 10 && step < initialStep) {
				step = step * 10; // speed up the parsing
				console.log("Changed Step to ", step);
			} else {
				results = results.concat(data);
			}
		});

		currentBlock += step;
	}

	console.log(results);
	let jsonData = JSON.stringify(results);
	fs.writeFileSync(`blocks_${startBlock}_to_${endBlock}.json`, jsonData);
	return results;
};

// first Arweave transaction is at 559678, 751000 is where they start to get dense
// steps should be a multiple of 10
module.exports = { findAll };
