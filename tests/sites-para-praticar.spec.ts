import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

test.describe('Sites para Praticar page', () => {
  test.beforeEach(async ({ sitesParaPraticarPage }) => {
    await sitesParaPraticarPage.goto();
  });

  test.describe('Body', () => {
    test('deve exibir categorias e exemplos de sites para praticar @sites-para-praticar @content @smoke', async ({
      sitesParaPraticarPage,
    }) => {
      await sitesParaPraticarPage.expectPracticeSiteContentVisible();
    });
  });

  test.describe('Links', () => {
    test('deve navegar pelo link principal do cabecalho @sites-para-praticar @navigation', async ({
      sitesParaPraticarPage,
    }) => {
      await sitesParaPraticarPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('deve validar os links de sites para praticar @sites-para-praticar @links', async ({
      sitesParaPraticarPage,
    }) => {
      await sitesParaPraticarPage.expectPracticeSiteLinks();
    });

    test('deve exibir os links compartilhados do rodape @sites-para-praticar @footer', async ({
      sitesParaPraticarPage,
    }) => {
      await sitesParaPraticarPage.expectSharedFooterLinksVisible();
    });

    test('deve validar os links do rodape @sites-para-praticar @footer @links', async ({ sitesParaPraticarPage }) => {
      await sitesParaPraticarPage.expectFooterLinks();
    });
  });
});
