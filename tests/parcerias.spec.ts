import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

test.describe('Parcerias page', () => {
  test.beforeEach(async ({ parceriasPage }) => {
    await parceriasPage.goto();
  });

  test.describe('Body', () => {
    test('deve exibir o conteudo de parcerias @parcerias @content @smoke', async ({ parceriasPage }) => {
      await parceriasPage.expectPartnershipContentVisible();
    });
  });

  test.describe('Links', () => {
    test('deve navegar pelo link principal do cabecalho @parcerias @navigation', async ({ parceriasPage }) => {
      await parceriasPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('deve validar os links de parcerias @parcerias @links', async ({ parceriasPage }) => {
      await parceriasPage.expectPartnershipLinks();
    });

    test('deve exibir os links compartilhados do rodape @parcerias @footer', async ({ parceriasPage }) => {
      await parceriasPage.expectSharedFooterLinksVisible();
    });

    test('deve validar os links do rodape @parcerias @footer @links', async ({ parceriasPage }) => {
      await parceriasPage.expectFooterLinks();
    });
  });
});
