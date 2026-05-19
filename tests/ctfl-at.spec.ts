import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

test.describe('CTFL-AT page', () => {
  test.beforeEach(async ({ ctflAtPage }) => {
    await ctflAtPage.goto();
  });

  test.describe('Body', () => {
    test('deve exibir o conteudo de estudos CTFL-AT @ctfl-at @content @smoke', async ({ ctflAtPage }) => {
      await ctflAtPage.expectStudyContentVisible();
    });
  });

  test.describe('Links', () => {
    test('deve exibir os links principais de navegacao @ctfl-at @navigation @smoke', async ({ ctflAtPage }) => {
      await ctflAtPage.expectMainNavigationLinksVisible();
    });

    test('deve navegar pelo link principal do cabecalho @ctfl-at @navigation', async ({ ctflAtPage }) => {
      await ctflAtPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('deve validar os links de recursos CTFL-AT @ctfl-at @links', async ({ ctflAtPage }) => {
      await ctflAtPage.expectResourceLinks();
    });

    test('deve exibir os links compartilhados do rodape @ctfl-at @footer', async ({ ctflAtPage }) => {
      await ctflAtPage.expectSharedFooterLinksVisible();
    });

    test('deve validar os links do rodape @ctfl-at @footer @links', async ({ ctflAtPage }) => {
      await ctflAtPage.expectFooterLinks();
    });
  });
});
