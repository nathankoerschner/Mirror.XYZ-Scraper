const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data.json"));

const finalArray = data.map((row) => {
	if (row["authorship"]) {
		let newRow = {
			contributer: row["authorship"]["contributor"] || "",
			publication: row["content"]["publication"] || "",
			title: row["content"]["title"] || "",
			body: row["content"]["body"] || "",
			timestamp: row["content"]["timestamp"] || "",
			nft: row["nft"] || "",
			transaction: row["transaction"] || "",
		};
		return newRow;
	} else {
		console.log(row);
	}
});

fs.writeFileSync("data.json", JSON.stringify(finalArray));
