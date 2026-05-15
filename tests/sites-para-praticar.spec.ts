import { test } from './fixtures/pages.fixture';

test.describe('Sites para Praticar page', () => {
  test.beforeEach(async ({ sitesParaPraticarPage }) => {
    await sitesParaPraticarPage.goto();
  });

  test.describe('Body', () => {
    test('should display practice site categories and examples', async ({ sitesParaPraticarPage }) => {
      await sitesParaPraticarPage.expectPracticeSiteContentVisible();
    });
  });

  test.describe('Links', () => {
    test('should have valid practice site links', async ({ sitesParaPraticarPage }) => {
      await sitesParaPraticarPage.expectPracticeSiteLinks();
    });

    test('should have valid footer links', async ({ sitesParaPraticarPage }) => {
      await sitesParaPraticarPage.expectFooterLinks();
    });
  });
});
