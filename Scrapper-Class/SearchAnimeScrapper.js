import { SearchLocator } from "../Utils/searchLocator.js";
import { Utils } from "../Utils/utils.js";

export class SearchScrapper {
    constructor(page) {
        this.page = page;
        this.utils = new Utils();
        this.locator = new SearchLocator(page);

        this.searchBarSelector = 'Search Anime...';

        this.searchBarLocator = this.page.getByPlaceholder(this.searchBarSelector);
        this.url = '';
    }

    async main(format, name) {
        await this.visit(format);
        await this.search(name);
        const data = await this.getInfo();
        
        this.locator.clearState();
        this.utils.saveJson(data, name, 'Anime', 'anime');

        return data;
    }

    async visit(name = 'anime') {
        this.setURL(name);
        await this.page.goto(this.url);
    }

    async search(name) {
        await this.searchAnime(name);
        await this.clickOnResult(name);
    }

    async searchAnime(name) {
        await this.utils.waitForLocatorState(this.searchBarLocator, 'visible');
        await this.searchBarLocator.fill(name);
        await this.searchBarLocator.press('Enter');
    }

    async clickOnResult(name) {
        const optionSelector = `strong:text-is("${name}")`;
        const optionLocator = this.page.locator(optionSelector);

        await this.utils.waitForLocatorState(optionLocator, 'visible');
        await optionLocator.click();
    }

    async getInfo() {
        const data = await this.locator.getAnimeInfo("anime");
        return data;
    }

    setURL(type = 'anime') {
        this.url = `https://myanimelist.net/${type}.php`;
    }
}