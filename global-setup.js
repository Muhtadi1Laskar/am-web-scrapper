import { chromium } from '@playwright/test';
import { Genre } from './Scrapper-Class/GenreScrapper.js';
import { SearchScrapper } from './Scrapper-Class/SearchAnimeScrapper.js';
import { SearchMangaScrapper } from './Scrapper-Class/SearchMangaScrapper.js';
import { TopContentScrapper } from './Scrapper-Class/TopContentScrapper.js';

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const page = await browser.newPage();
  const genre = new Genre(page);
  const search = new SearchScrapper(page);
  const searchManga = new SearchMangaScrapper(page);
  const contentScrapper = new TopContentScrapper(page);

  page.setDefaultTimeout(100000);

  await genre.main('anime', 'Comedy');
  await search.main('anime', 'Cowboy Bebop');
  await searchManga.main('manga', 'Gintama');
  await contentScrapper.main('manga', 50);

  await browser.close();
})();