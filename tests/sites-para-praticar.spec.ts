import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

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
    test('should navigate using the main header link', async ({ sitesParaPraticarPage }) => {
      await sitesParaPraticarPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('should have valid practice site links', async ({ sitesParaPraticarPage }) => {
      await sitesParaPraticarPage.expectPracticeSiteLinks();
    });

    test('should display shared footer links', async ({ sitesParaPraticarPage }) => {
      await sitesParaPraticarPage.expectSharedFooterLinksVisible();
    });

    test('should have valid footer links', async ({ sitesParaPraticarPage }) => {
      await sitesParaPraticarPage.expectFooterLinks();
    });
  });
});
