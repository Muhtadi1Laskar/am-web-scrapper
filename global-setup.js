import { chromium } from '@playwright/test';
import { Genre } from './Scrapper-Class/GenreScrapper.js';
import { SearchScrapper } from './Scrapper-Class/SearchAnimeScrapper.js';

(async () => {
  const browser = await chromium.launch({
    headless: true
  });
  const page = await browser.newPage();
  const genre = new Genre(page);
  const search = new SearchScrapper(page);

  page.setDefaultTimeout(100000);

  // await genre.main('anime', 'Adventure');
  await search.main('anime', 'One Piece');

  await browser.close();
})();