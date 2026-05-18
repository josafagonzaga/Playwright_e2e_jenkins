import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

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
    test('should navigate using the main header link', async ({ parceriasPage }) => {
      await parceriasPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('should have valid partnership links', async ({ parceriasPage }) => {
      await parceriasPage.expectPartnershipLinks();
    });

    test('should display shared footer links', async ({ parceriasPage }) => {
      await parceriasPage.expectSharedFooterLinksVisible();
    });

    test('should have valid footer links', async ({ parceriasPage }) => {
      await parceriasPage.expectFooterLinks();
    });
  });
});
