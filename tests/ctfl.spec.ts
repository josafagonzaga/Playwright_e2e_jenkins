import { test } from './fixtures/pages.fixture';

test.describe('CTFL page', () => {
  test.beforeEach(async ({ ctflPage }) => {
    await ctflPage.goto();
  });

  test.describe('Body', () => {
    test('should display CTFL study content', async ({ ctflPage }) => {
      await ctflPage.expectStudyContentVisible();
    });
  });

  test.describe('Links', () => {
    test('should have valid CTFL resource links', async ({ ctflPage }) => {
      await ctflPage.expectResourceLinks();
    });

    test('should have valid footer links', async ({ ctflPage }) => {
      await ctflPage.expectFooterLinks();
    });
  });
});
