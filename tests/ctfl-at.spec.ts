import { test } from './fixtures/pages.fixture';

test.describe('CTFL-AT page', () => {
  test.beforeEach(async ({ ctflAtPage }) => {
    await ctflAtPage.goto();
  });

  test.describe('Body', () => {
    test('should display CTFL-AT study content', async ({ ctflAtPage }) => {
      await ctflAtPage.expectStudyContentVisible();
    });
  });

  test.describe('Links', () => {
    test('should have valid CTFL-AT resource links', async ({ ctflAtPage }) => {
      await ctflAtPage.expectResourceLinks();
    });

    test('should have valid footer links', async ({ ctflAtPage }) => {
      await ctflAtPage.expectFooterLinks();
    });
  });
});
