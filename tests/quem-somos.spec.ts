import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

test.describe('Quem Somos page', () => {
  test.beforeEach(async ({ quemSomosPage }) => {
    await quemSomosPage.goto();
  });

  test.describe('Header', () => {
    test('deve exibir os itens da navegacao principal @quem-somos @navigation @smoke', async ({ quemSomosPage }) => {
      await quemSomosPage.expectTopNavigationVisible();
    });

    test('deve exibir a navegacao principal no mobile @quem-somos @navigation @mobile', async ({
      page,
      quemSomosPage,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await quemSomosPage.goto();
      await page.getByRole('button', { name: 'Show sidebar' }).click();

      await quemSomosPage.expectMainNavigationLinksVisible();
    });

    test('deve pesquisar pelo cabecalho do site @quem-somos @search', async ({ quemSomosPage }) => {
      await quemSomosPage.expectSearchResults();
    });
  });

  test.describe('Body', () => {
    test('deve exibir os titulos principais da pagina @quem-somos @content', async ({ quemSomosPage }) => {
      await quemSomosPage.expectMainHeadingsVisible();
    });
  });

  test.describe('Footer', () => {
    test('deve exibir links de apoio e redes sociais @quem-somos @footer @smoke', async ({ quemSomosPage }) => {
      await quemSomosPage.expectSupportFooterVisible();
    });
  });

  test.describe('Links', () => {
    test('deve navegar pelos links internos principais @quem-somos @navigation', async ({ quemSomosPage }) => {
      await quemSomosPage.expectInternalNavigation();
    });

    test('deve exibir os links do menu More @quem-somos @navigation', async ({ quemSomosPage }) => {
      await quemSomosPage.expectMoreMenuLinksVisible();
    });

    test('deve validar os links do menu More @quem-somos @navigation @links', async ({ quemSomosPage }) => {
      await quemSomosPage.expectMoreMenuLinksHaveHref();
    });

    test('deve navegar pelo link principal do cabecalho @quem-somos @navigation', async ({ quemSomosPage }) => {
      await quemSomosPage.expectMainNavigationLinkOpens(navigationData.links[1]);
    });

    test('deve validar os links dos perfis das administradoras @quem-somos @links', async ({ quemSomosPage }) => {
      await quemSomosPage.expectAdministratorProfileLinksVisible();
    });

    test('deve validar os links do rodape @quem-somos @footer @links', async ({ quemSomosPage }) => {
      await quemSomosPage.expectFooterLinks();
    });
  });
});
