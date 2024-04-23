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
}