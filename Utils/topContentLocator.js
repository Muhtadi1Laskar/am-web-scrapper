import {
    Utils
} from "./utils.js";

export class TopContentLocator {
    constructor(page) {
        this.page = page;
        this.utils = new Utils();

        this.iterationSelector = "tr[class='ranking-list']>td > span.lightLink";

        this.iterationLocator = this.page.locator(this.iterationSelector);
        this.rankSelector = "tr[class='ranking-list']>td > span.lightLink";
        this.titleSelector = "tr[class='ranking-list']>td>div[class='detail'] h3 > a";
        this.infoSelector = "tr[class='ranking-list']>td>div[class='detail']>div.information";
        this.scoreSelector = "tr[class='ranking-list']>td.score>div>span";
        this.nextBtnSelector = "a:text-is('Next 50')";

        this.dataList = [];
        this.nextBtnLocator = this.page.locator(this.nextBtnSelector).nth(1);
    }

    async getInfo(itemPos = 221) {
        await this.page.waitForLoadState('domcontentloaded');
        let tableRow = await this.iterationLocator.count();
        let itemPosition = this.getPageNumber(itemPos, tableRow);
        let currentPos = 1;

        for (let tableIndex = 1; tableIndex <= itemPosition; tableIndex++) {
            for (let index = 0; index < 50; index++) {
                if (currentPos > itemPos) {
                    break;
                }
                let data = await this.extractValue(index);
                this.dataList.push(data);
                currentPos++;
            }
            await this.nextBtnLocator.click();
        }
        return this.dataList;
    }

    async extractValue(index) {
        const rankLocator = this.page.locator(this.rankSelector).nth(index);
        const titleLocator = this.page.locator(this.titleSelector).nth(index);
        const infoLocator = this.page.locator(this.infoSelector).nth(index);
        const scoreLocator = this.page.locator(this.scoreSelector).nth(index);

        await this.utils.waitForLocatorState(titleLocator);

        const rank = await rankLocator.textContent();
        const title = await titleLocator.textContent();
        const info = await infoLocator.allInnerTexts();
        const score = await scoreLocator.textContent();
        const formattedInfo = this.formatInfoData(info[0]);

        return {
            rank: rank,
            title: title,
            info: formattedInfo,
            score: +score
        };
    }

    formatInfoData(data) {
        const dataArray = data.trim().split('\n');
        const keyName = ['Type', 'Date Aired', 'Members'];

        const output = keyName.reduce((acc, key, index) => {
            acc[key] = dataArray[index] || '';
            return acc;
        }, {});

        return output;
    }

    getPageNumber(itemNumber, itemsPerPage) {
        if (itemNumber <= itemsPerPage) {
            return 1;
        }
        const pageNumber = Math.ceil(itemNumber / itemsPerPage);
        return pageNumber;
    }
}