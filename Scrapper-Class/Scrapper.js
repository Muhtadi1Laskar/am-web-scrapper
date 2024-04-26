import { chromium } from "@playwright/test";
import { Genre } from "./GenreScrapper.js";
import { SearchScrapper } from "./SearchAnimeScrapper.js";
import { SearchMangaScrapper } from "./SearchMangaScrapper.js";
import { TopContentScrapper } from "./TopContentScrapper.js";

export class Scrapper {
  constructor() {
    this.page;
    this.browser;
    this.playwrightOptions = {
      headless: true,
    };
  }

  async main({ scraperType, ...obj }) {
    await this.startBrowser();
    const data = await this.scrapeData(obj);
    await this.closeBrowser();
    return data;
  }

  async startBrowser() {
    this.browser = await chromium.launch(this.playwrightOptions);
    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(100000);
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async scrapeData({ mediaFormat, name }) {
    const genreScraper = new Genre(this.page);
    const data = await genreScraper.main(mediaFormat, name);
    return data;
  }
}
