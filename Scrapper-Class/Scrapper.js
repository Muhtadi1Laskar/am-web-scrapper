import { Locator } from '../Utils/locator.js';

export class Genre {
    constructor(page) {
        this.page = page;
        this.locator = new Locator(page);

        this.url = '';
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