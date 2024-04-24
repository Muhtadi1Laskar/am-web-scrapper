import { Utils } from "./utils.js";

export class SearchLocator {
    constructor(page) {
        this.page = page;
        this.utils = new Utils();

        this.titleSelector = "h1[class='title-name h1_bold_none'] strong";
        this.descriptionSelector = "//*[@itemprop='description']";
        this.imageSelector = "img[class=' lazyloaded']";
        this.statTabSelector = "a:text-is('Stats')";

        this.titleLocator = this.page.locator(this.titleSelector);
        this.descriptionLocator = this.page.locator(this.descriptionSelector);
        this.imageLocator = this.page.locator(this.imageSelector).nth(0);
        this.statTabLocator = this.page.locator(this.statTabSelector);
        this.dataObject = {};
        this.dataWrapper = [];
    }

    async getAnimeInfo() {
        await this.utils.waitForLocatorState(this.titleLocator, "visible");
        await this.utils.waitForLocatorState(this.imageLocator, "visible");
        const infoTitles = [
            "Synonyms",
            "Japanese",
            "English",
            "Type",
            "Episodes",
            "Status",
            "Aired",
            "Premiered",
            "Broadcast",
            "Producers",
            "Licensors",
            "Studios",
            "Source",
            "Genres",
            "Themes",
            "Demographic",
            "Duration",
            "Rating",
            "Ranked",
            "Popularity",
            "Members",
            "Favorites",
        ];

        for (let elem of infoTitles) {
            let finalData = await this.getInfoLocator(elem);
            this.dataObject[elem] = finalData;
        }
        await this.getDescription();
        await this.getCharacterData();
        await this.getImageSource();
        await this.getStatData();

        this.dataWrapper.push(this.dataObject);

        return this.dataWrapper;
    }

    async getImageSource() {
        const imageSrc = await this.imageLocator.getAttribute("data-src");
        this.dataObject['imageSource'] = imageSrc;
    }

    async getDescription() {
        let description = await this.descriptionLocator.textContent();
        description = this.utils.extractMeaningfulWords(description);

        this.dataObject['description'] = description;
    }

    async getCharacterData() {
        const selector = "h3[class='h3_characters_voice_actors'] a";
        const locator = this.page.locator(selector);
        const tags = await locator.all();
        const characterList = [];

        for(let elem of tags) {
            let text = await elem.innerText();
            characterList.push(text);
        }

        this.dataObject['characters'] = characterList;
    }

    async getInfoLocator(elem) {
        const selector = `(//span[text()='${elem}:']//parent::div)`;
        let info = (await this.page.$$eval(selector,
            (el) => el.map((elem) => elem.innerText)[0]
        )) || "";
        let finalData = info.replace(`${elem}:`, "").trim();
        return finalData;
    }

    async getStatData() {
        const statistics = {};
        const infoTitles = [
            'Watching',
            'Completed',
            'On-Hold',
            'Dropped',
            'Plan to Watch',
            'Total'
        ];

        await this.statTabLocator.click();
        await this.page.waitForTimeout(20000);
        
        for(let elem of infoTitles) {
            const stats = await this.getInfoLocator(elem); 
            statistics[elem] = stats;
        }

        this.dataObject['statistics'] = statistics;
    }
}