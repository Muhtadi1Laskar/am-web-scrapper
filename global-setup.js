import { chromium } from '@playwright/test';
import { Genre } from './Scrapper-Class/Scrapper.js';

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const page = await browser.newPage();
  const genre = new Genre(page);

  page.setDefaultTimeout(100000);
  await genre.visit('anime');

  await genre.selectGenre('Music');

  const data = await genre.getValues();

  console.log(data);

  await page.pause();

  await browser.close();
})();