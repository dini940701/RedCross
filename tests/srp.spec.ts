import { test, expect } from '../fixtures/baseFixture.js';
import { SRP } from '../POM/SRP.js';

test('Search for an product', async ({ homePage }) => {
  const srp:SRP=await homePage.doSearch('adult');
  expect(await srp.searchResultCount()).toContain('90')
});