import fs from 'fs';

export class Utils {
    constructor() {

    }
    extractMeaningfulWords(str) {
        str = str.trim();
        const words = str.split(/\s*\+\s*/).join("");
        return words;
    }

    genreBtnLocator(genreName) {
        return 
    }

    saveJson(data, type) {
        const formattedData = JSON.stringify(data);

        fs.writeFileSync(`Data/Genre/${type}.json`, formattedData, 'utf-8', (err) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log("Data Successfully Saved");
        });
    }
}