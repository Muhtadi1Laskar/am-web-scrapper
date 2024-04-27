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

  async main({ scraperType, ...scrapeOptions  }) {
    let data;

    await this.startBrowser();

    switch (scraperType) {
      case 'genre':
        data = await this.scrapeGenreData(scrapeOptions);
        break;
      case 'anime details':
        data = await this.scrapeAnimeData(scrapeOptions);
        break;
      case 'manga details':
        data = await this.scrapeMangaData(scrapeOptions);
        break;
      case 'top content':
        data = await this.scrapeTopContent(scrapeOptions);
    }

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

  async scrapeGenreData({ mediaFormat, name }) {
    const genreScraper = new Genre(this.page);
    const data = await genreScraper.main(mediaFormat, name);
    return data;
  }

  async scrapeAnimeData({ mediaFormat, name }) {
    const genreScraper = new SearchScrapper(this.page);
    const data = await genreScraper.main(mediaFormat, name);
    return data;
  }

  async scrapeMangaData({ mediaFormat, name }) {
    const genreScraper = new SearchMangaScrapper(this.page);
    const data = await genreScraper.main(mediaFormat, name);
    return data;
  }

  async scrapeTopContent({ mediaFormat, name }) {
    const genreScraper = new TopContentScrapper(this.page);
    const data = await genreScraper.main(mediaFormat, name);
    return data;
  }
}
