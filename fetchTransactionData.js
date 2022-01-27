const { reqData } = require("./request.js");
const util = require("util");

const waitForPromise = (promised, continuation = () => true) => {
	let interval = setInterval(() => {
		let pending = util.inspect(promised).includes("pending");
		if (!pending) {
			clearInterval(interval);
			continuation();
		}
	}, 1000);
};

const fetchData = (array) => {
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

module.exports = { fetchData };
