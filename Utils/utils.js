import fs from 'fs';

export class Utils {
    constructor() {

    }

    extractMeaningfulWords(str) {
        str = str.trim();
        const words = str.split(/\s*\+\s*/).join("");
        return words;
    }

    removeStopWord(str, word) {
        const newStr = str.replace(word, '').trim();
        return newStr;
    }

    genreBtnLocator(genreName) {
        return
    }

    async waitForLocatorState(locator, state = 'visible') {
        await locator.waitFor({
            state: state
        });
    }

    saveJson(data, type, folder) {
        const filePath = `Data/${folder}/${type}.json`;
        const formattedData = JSON.stringify(data);

        fs.writeFileSync(filePath, formattedData, 'utf-8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Data Successfully Saved");
        });
    }
}