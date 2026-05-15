import { test } from './fixtures/pages.fixture';

test.describe('Quem Somos page', () => {
  test.beforeEach(async ({ quemSomosPage }) => {
    await quemSomosPage.goto();
  });

  test.describe('Header', () => {
    test('should display the top navigation items', async ({ quemSomosPage }) => {
      await quemSomosPage.expectTopNavigationVisible();
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

    test('should have valid administrator profile links', async ({ quemSomosPage }) => {
      await quemSomosPage.expectAdministratorProfileLinksVisible();
    });

    test('should have valid footer links', async ({ quemSomosPage }) => {
      await quemSomosPage.expectFooterLinks();
    });
  });
});
