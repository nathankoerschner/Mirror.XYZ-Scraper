const fs = require("fs");
const path = require("path");

// Make an async function that gets executed immediately
const touchEachFile = async (directory, returnArray, jsonPath) => {
	let failedArray = [];
	// Our starting point
	try {
		// Get the files as an array
		const filePaths = await fs.promises.readdir(directory);

		// Loop them all with the new for...of
		for (const path of filePaths) {
			const data = await readJsonFromPath(path);
			try {
				returnArray.push(JSON.parse(data));
			} catch {
				failedArray.push(path.slice(0, -5));
			}
		} // End for...of
		console.log(
			`\nSuccess!\nCreated ${jsonPath}, which has ${returnArray.length} items.\n`
		);
		console.log(
			`failed array had ${failedArray.length} items that were not included. \n(See ./failedToTransform.json)`
		);
		fs.writeFileSync(jsonPath, JSON.stringify(returnArray));
		fs.writeFileSync(`failedToTransform.json`, JSON.stringify(failedArray));
		return returnArray;
	} catch (e) {
		// Catch anything bad that happens
		console.error("We've thrown! Whoops!", e);
	}
};

const readJsonFromPath = async (path) => {
	try {
		const data = await JSON.parse(fs.readFileSync(`./data/${path}`));
		return data;
	} catch {
		console.error(`Unable to load and parse ${path}`);
	}
};

const exportData = (location, jsonPath) => {
	let finalArray = [];
	const data = touchEachFile(location, finalArray, jsonPath);

	fs.writeFileSync(jsonPath, JSON.stringify(data));
};

module.exports = { exportData };
