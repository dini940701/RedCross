import { test, expect } from '../fixtures/baseFixture.js';
import { PDP } from '../POM/PDP.js';
import { SRP } from '../POM/SRP.js';

test('Verify the Product Header and Image Count', async ({ homePage }) => {
  const srp:SRP=await homePage.doSearch('adult');
  const pdp:PDP=await srp.selectProduct('CPR Manikin Carrying Bag - Adult 4 Pack');
  expect(await pdp.getHeader()).toBe('CPR Manikin Carrying Bag - Adult 4 Pack');
  expect(await pdp.getImageCount()).toBe(2);
  const actualProdDetails=await pdp.getProdDetails();
  expect(actualProdDetails.get('header')).toBe('CPR Manikin Carrying Bag - Adult 4 Pack');
//   expect(actualProdDetails.get('MANUFACTURER')).toBe('Prestan');
});