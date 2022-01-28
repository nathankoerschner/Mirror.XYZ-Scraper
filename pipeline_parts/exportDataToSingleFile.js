const fs = require("fs");
const path = require("path");

const readJsonFromPath = async (path) => {
	try {
		const data = await JSON.parse(fs.readFileSync(`./data/${path}`));
		return data;
	} catch {
		console.error(`Unable to load and parse ${path}`);
	}
};

const exportData = async (directory, jsonPath) => {
	let failedArray = [];
	let finalArray = [];
	// Our starting point
	try {
		// Get the files as an array
		const filePaths = await fs.promises.readdir(directory);

		// Loop them all with the new for...of
		for (const path of filePaths) {
			const data = await readJsonFromPath(path);
			try {
				finalArray.push(JSON.parse(data));
			} catch {
				failedArray.push(path.slice(0, -5));
			}
		} // End for...of

		finalArray = finalArray.map((row) => {
			if (row["authorship"]) {
				let newRow = {
					contributer: row["authorship"]["contributor"] || "",
					publication: row["content"]["publication"] || "",
					title: row["content"]["title"] || "",
					body: row["content"]["body"] || "",
					timestamp: row["content"]["timestamp"] || "",
					nft: row["nft"] || "",
				};
				return newRow;
			} else {
				console.log(row);
			}
		});
		fs.writeFileSync(jsonPath, JSON.stringify(finalArray));
		fs.writeFileSync(`omitted.json`, JSON.stringify(failedArray));
		console.log(
			`\nSuccess!\nCreated ${jsonPath}, which has ${finalArray.length} items.\n`
		);
		console.log(
			`See ./omitted.json for a list of the ${failedArray.length} omitted items`
		);
		return finalArray;
	} catch (e) {
		// Catch anything bad that happens
		console.error("We've thrown! Whoops!", e);
	}
};

module.exports = { exportData };
