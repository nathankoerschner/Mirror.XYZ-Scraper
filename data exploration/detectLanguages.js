const fs = require("fs");
const LanguageDetect = require("languagedetect");
const lngDetector = new LanguageDetect();

const getLanguages = () => {
	let data = JSON.parse(fs.readFileSync("data.json"));

	for (let i in data) {
		let text = data[i]["body"];
		let detected = lngDetector.detect(text, 2);
		let languageDetected, probability;

		if (detected[0]) {
			detected[0].forEach((item) => {
				if (typeof item == "string") {
					languageDetected = item;
				} else {
					probability = item;
				}
			});
		}

		let language =
			languageDetected == "english" && probability > 0.1 ? "english" : "other";

		data[i]["language"] = language;
	}

	fs.writeFileSync("LanguagesData.json", JSON.stringify(data));
	return data;
};

// getLanguages(); generates languages JSON

const returnEnglishCount = async () => {
	let langData = await getLanguages();
	let totalEnglish = 0;
	let total = langData.length;
	for (i in langData) {
		langData[i]["language"] == "english" ? (totalEnglish += 1) : null;
	}

	return totalEnglish; // 33924
};

const numberOfEnglishPubs = returnEnglishCount();
console.log(
	"There are " +
		numberOfEnglishPubs +
		" Mirror.XYZ publications written in English"
);
