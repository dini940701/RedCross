import { test, expect } from '../fixtures/baseFixture.js';

test('Search for an product', async ({ homePage }) => {
  expect(homePage.page).toHaveURL('https://development.redcross.org/');
  await homePage.doSearch('adult');
});

