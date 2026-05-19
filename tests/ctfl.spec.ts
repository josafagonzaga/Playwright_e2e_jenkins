import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

test.describe('CTFL page', () => {
  test.beforeEach(async ({ ctflPage }) => {
    await ctflPage.goto();
  });

  test.describe('Body', () => {
    test('deve exibir o conteudo de estudos CTFL @ctfl @content @smoke', async ({ ctflPage }) => {
      await ctflPage.expectStudyContentVisible();
    });
  });

  test.describe('Links', () => {
    test('deve exibir os links principais de navegacao @ctfl @navigation @smoke', async ({ ctflPage }) => {
      await ctflPage.expectMainNavigationLinksVisible();
    });

    test('deve navegar pelo link principal do cabecalho @ctfl @navigation', async ({ ctflPage }) => {
      await ctflPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('deve validar os links de recursos CTFL @ctfl @links', async ({ ctflPage }) => {
      await ctflPage.expectResourceLinks();
    });

    test('deve exibir os links compartilhados do rodape @ctfl @footer', async ({ ctflPage }) => {
      await ctflPage.expectSharedFooterLinksVisible();
    });

    test('deve validar os links do rodape @ctfl @footer @links', async ({ ctflPage }) => {
      await ctflPage.expectFooterLinks();
    });
  });
});
