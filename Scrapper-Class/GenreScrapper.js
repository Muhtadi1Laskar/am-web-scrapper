import { Locator } from '../Utils/genreLocator.js';
import { Utils } from '../Utils/utils.js';

export class Genre {
    constructor(page) {
        this.page = page;
        this.locator = new Locator(page);
        this.utils = new Utils();

        this.url = '';
    }

    async main(format='anime', type='comedy') {
        await this.visit(format);
        await this.selectGenre(type);
        
        const data = await this.getValues();

        this.utils.saveJson(data, type, 'Genre', 'anime');

        return data;
    }

    async selectGenre(genre) {
        const locator = this.locator.getGenreBtn(genre);

        await this.locator.waitForLocatorState(locator);
        await locator.click();
    }

    async visit(type = 'anime') {
        this.setURL(type);

        await this.page.goto(this.url);
    }

    async getValues() {
        let resultArray = [];

        for (let i = 1; i < 101; i++) {
            const data = await this.locator.extractGenreValues(i);
            resultArray.push(data);
        }
        return resultArray;
    }

    setURL(type = 'anime') {
        this.url = `https://myanimelist.net/${type}.php`;
    }
}