import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

test.describe('Quem Somos page', () => {
  test.beforeEach(async ({ quemSomosPage }) => {
    await quemSomosPage.goto();
  });

  test.describe('Header', () => {
    test('should display the top navigation items', async ({ quemSomosPage }) => {
      await quemSomosPage.expectTopNavigationVisible();
    });

    test('should display the main navigation on mobile viewport', async ({ page, quemSomosPage }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await quemSomosPage.goto();
      await page.getByRole('button', { name: 'Show sidebar' }).click();

      await quemSomosPage.expectMainNavigationLinksVisible();
    });

    test('should search the site from the header', async ({ quemSomosPage }) => {
      await quemSomosPage.expectSearchResults();
    });
  });

  test.describe('Body', () => {
    test('should display the main section headings', async ({ quemSomosPage }) => {
      await quemSomosPage.expectMainHeadingsVisible();
    });
  });

  test.describe('Footer', () => {
    test('should display support links and social media items', async ({ quemSomosPage }) => {
      await quemSomosPage.expectSupportFooterVisible();
    });
  });

  test.describe('Links', () => {
    test('should navigate using the main internal links', async ({ quemSomosPage }) => {
      await quemSomosPage.expectInternalNavigation();
    });

    test('should display more menu links when clicking More', async ({ quemSomosPage }) => {
      await quemSomosPage.expectMoreMenuLinksVisible();
    });

    test('should have valid more menu links', async ({ quemSomosPage }) => {
      await quemSomosPage.expectMoreMenuLinksHaveHref();
    });

    test('should navigate using the main header link', async ({ quemSomosPage }) => {
      await quemSomosPage.expectMainNavigationLinkOpens(navigationData.links[1]);
    });

    test('should have valid administrator profile links', async ({ quemSomosPage }) => {
      await quemSomosPage.expectAdministratorProfileLinksVisible();
    });

    test('should have valid footer links', async ({ quemSomosPage }) => {
      await quemSomosPage.expectFooterLinks();
    });
  });
});
