import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

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
    test('should navigate using the main header link', async ({ ctflAtPage }) => {
      await ctflAtPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('should have valid CTFL-AT resource links', async ({ ctflAtPage }) => {
      await ctflAtPage.expectResourceLinks();
    });

    test('should display shared footer links', async ({ ctflAtPage }) => {
      await ctflAtPage.expectSharedFooterLinksVisible();
    });

    test('should have valid footer links', async ({ ctflAtPage }) => {
      await ctflAtPage.expectFooterLinks();
    });
  });
});
