const fs = require("fs");
const { reqData } = require("./request.js");
const util = require("util");

const waitForPromise = async (promised, continuation = () => true) => {
	let interval = setInterval(() => {
		let pending = util.inspect(promised).includes("pending");
		if (!pending) {
			clearInterval(interval);
			continuation();
		}
	}, 1000);
};

const fetchData = async (array) => {
	console.log(array.length);
	let maxIterations = 4;
	if (array.length < maxIterations) {
		maxIterations = array.length;
	}

	for (i = 0; i < maxIterations; i++) {
		let promised = reqData(array[i][1]);
		if (i == maxIterations - 1) {
			waitForPromise(promised, () => {
				array.splice(0, maxIterations);
				fetchData(array);
			});
		}
	}
};

// for finding any left off transactions
const fetchMissing = async (array) => {
	let arrayOfLostTickets = array.filter((row) => {
		return !fs.existsSync(`./data/${row[1]}.json`);
	});

	let arrayOfExistingTickets = array.filter((row) => {
		return fs.existsSync(`./data/${row[1]}.json`);
	});

	console.log(arrayOfExistingTickets.length);
	fs.writeFileSync("unfetched.json", JSON.stringify(arrayOfLostTickets));
	console.log(arrayOfLostTickets);
	return arrayOfLostTickets;
};

const run = async (pathToCSV) => {
	var ticketArray = fs
		.readFileSync(pathToCSV, "utf-8")
		.split("\n")
		.map((line) => line.split(","));
	console.log(ticketArray.length);
	fetchData(ticketArray);
};

run("arrayOfFailedIds.csv");
