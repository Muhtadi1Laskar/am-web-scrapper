import { chromium } from '@playwright/test';
import { Genre } from './Scrapper-Class/Scrapper.js';

(async () => {
  const browser = await chromium.launch({
    headless: true
  });
  const page = await browser.newPage();
  const genre = new Genre(page);

  page.setDefaultTimeout(100000);

  await genre.main('anime', 'Comedy');

  await browser.close();
})();