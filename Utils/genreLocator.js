import { Utils } from "./utils.js";

export class Locator {
    constructor(page) {
        this.page = page;
        this.utils = new Utils();

        this.titleSelector = 'h2.h2_anime_title';
        this.divInfoSelector = 'div.info';
        this.spanSelector = 'span';
        this.genreParentSelector = 'div.genres-inner.js-genre-inner';
        this.genreChildSelector = 'span.genre a';
        this.summarySelector = 'p.preline';
        this.scoreSelector = "div[title='Score']";
        this.memberSelector = "div[title='Members']";

        this.titleLocator = this.page.locator(this.titleSelector);
        this.divInfoLocator = this.page.locator(this.divInfoSelector);
        this.spanLocator = this.page.locator(this.spanSelector);
        this.genreParentLocator = this.page.locator(this.genreParentSelector);
        this.summaryLocator = this.page.locator(this.summarySelector);
        this.scoreLocator = this.page.locator(this.scoreSelector);
        this.memberLocator = this.page.locator(this.memberSelector);
    }

    getGenreBtn(genreName) {
        return this.page.getByRole('link').filter({
            hasText: genreName
        });
    }

    getAllLocators(index) {
        let indexForCSS = index - 1;
        let studioSelector = this.getStudioSourceSelector(index, 'studio');
        let sourceSelector = this.getStudioSourceSelector(index, 'source');

        return {
            titleText: this.titleLocator.nth(indexForCSS),
            showStatus: this.divInfoLocator.nth(indexForCSS).locator('span.item').nth(1),
            totalEpisode: this.divInfoLocator.nth(indexForCSS).locator(this.spanSelector).nth(3),
            episodeDuration: this.divInfoLocator.nth(indexForCSS).locator(this.spanSelector).nth(4),
            genre: this.genreParentLocator.nth(indexForCSS).locator(this.genreChildSelector),
            summary: this.summaryLocator.nth(indexForCSS),
            studio: this.page.locator(studioSelector),
            source: this.page.locator(sourceSelector),
            score: this.scoreLocator.nth(indexForCSS),
            member: this.memberLocator.nth(indexForCSS)
        };
    }

    async extractGenreValues(i) {
        const {
            titleText,
            showStatus,
            totalEpisode,
            episodeDuration,
            genre,
            summary,
            studio,
            source,
            score,
            member
        } = this.getAllLocators(i);

        await this.waitForLocatorState(titleText);
        await this.waitForLocatorState(summary);

        let textContent = await titleText.textContent();
        let statusContent = await showStatus.textContent();
        let totalEpisodeContent = await totalEpisode.textContent();
        let episodeDurationContent = await episodeDuration.textContent();
        let genreContent = await genre.allInnerTexts();
        let summaryContent = await summary.textContent();
        let studioContent = await studio.allInnerTexts();
        let sourceContent = await source.textContent();
        let scoreContent = await score.textContent();
        let memberContent = await member.textContent();

        let scoreIntValue = parseFloat(this.utils.extractMeaningfulWords(scoreContent));

        return {
            title: textContent,
            showStatus: statusContent,
            totalEpisode: totalEpisodeContent,
            episodeDuration: episodeDurationContent,
            genre: genreContent,
            summary: summaryContent.replace(/\\n/g, ' '),
            studio: studioContent,
            source: sourceContent,
            score: scoreIntValue,
            watchedBy: this.utils.extractMeaningfulWords(memberContent)
        };
    }

    async waitForLocatorState(locator, state = 'visible') {
        await locator.waitFor({
            state: state
        });
    }

    getStudioSourceSelector(index, field) {
        const selectors = {
            'studio': `((//*[text()='Studio' or text()='Studios'])[${index}]//following-sibling::span)`,
            'source': `((//*[text()='Source'])[${index}]//following-sibling::span)`
        }
        return selectors[field];
    }
}
