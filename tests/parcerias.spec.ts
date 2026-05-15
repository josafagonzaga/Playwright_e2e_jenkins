import { test } from './fixtures/pages.fixture';

test.describe('Parcerias page', () => {
  test.beforeEach(async ({ parceriasPage }) => {
    await parceriasPage.goto();
  });

  test.describe('Body', () => {
    test('should display the partnership content', async ({ parceriasPage }) => {
      await parceriasPage.expectPartnershipContentVisible();
    });
  });

  test.describe('Links', () => {
    test('should have valid partnership links', async ({ parceriasPage }) => {
      await parceriasPage.expectPartnershipLinks();
    });

    test('should have valid footer links', async ({ parceriasPage }) => {
      await parceriasPage.expectFooterLinks();
    });
  });
});
