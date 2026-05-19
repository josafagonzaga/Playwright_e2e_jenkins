import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

test.describe('Trilha de Estudos page', () => {
  test.beforeEach(async ({ trilhaDeEstudosPage }) => {
    await trilhaDeEstudosPage.goto();
  });

  test.describe('Body', () => {
    test('deve exibir o conteudo da trilha de estudos @trilha-de-estudos @content @smoke', async ({
      trilhaDeEstudosPage,
    }) => {
      await trilhaDeEstudosPage.expectStudyTrailContentVisible();
    });
  });

  test.describe('Links', () => {
    test('deve exibir os links principais de navegacao @trilha-de-estudos @navigation @smoke', async ({
      trilhaDeEstudosPage,
    }) => {
      await trilhaDeEstudosPage.expectMainNavigationLinksVisible();
    });

    test('deve navegar pelo link principal do cabecalho @trilha-de-estudos @navigation', async ({
      trilhaDeEstudosPage,
    }) => {
      await trilhaDeEstudosPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('deve validar os links de recursos da trilha de estudos @trilha-de-estudos @links', async ({
      trilhaDeEstudosPage,
    }) => {
      await trilhaDeEstudosPage.expectResourceLinks();
    });

    test('deve exibir os links compartilhados do rodape @trilha-de-estudos @footer', async ({
      trilhaDeEstudosPage,
    }) => {
      await trilhaDeEstudosPage.expectSharedFooterLinksVisible();
    });

    test('deve validar os links do rodape @trilha-de-estudos @footer @links', async ({ trilhaDeEstudosPage }) => {
      await trilhaDeEstudosPage.expectFooterLinks();
    });
  });
});
