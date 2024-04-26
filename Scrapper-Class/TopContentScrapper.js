import { TopContentLocator } from "../Utils/topContentLocator.js";
import { Utils } from "../Utils/utils.js";

export class TopContentScrapper {
    constructor(page) {
        this.page = page;
        this.locator = new TopContentLocator(page);
        this.utils = new Utils();

        this.url = '';
    }

    async main(mediaFormat, totalItems) {
        await this.visit(mediaFormat);
        const data = await this.locator.getInfo(totalItems);

        this.utils.saveJson(data, 'top-content', 'top-content', mediaFormat);
        return data;
    }

    async visit(name = 'anime') {
        this.setURL(name);
        await this.page.goto(this.url);
    }

    setURL(type = 'anime') {
        const format = {
            anime: 'topanime',
            manga: 'topmanga',
        }
        this.url = `https://myanimelist.net/${format[type]}.php`;
    }
}