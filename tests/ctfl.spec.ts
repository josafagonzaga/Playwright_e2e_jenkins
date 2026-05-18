import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

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
    test('should navigate using the main header link', async ({ ctflPage }) => {
      await ctflPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('should have valid CTFL resource links', async ({ ctflPage }) => {
      await ctflPage.expectResourceLinks();
    });

    test('should display shared footer links', async ({ ctflPage }) => {
      await ctflPage.expectSharedFooterLinksVisible();
    });

    test('should have valid footer links', async ({ ctflPage }) => {
      await ctflPage.expectFooterLinks();
    });
  });
});
