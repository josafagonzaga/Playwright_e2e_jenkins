import { test } from './fixtures/pages.fixture';

test.describe('Home da Complysoft', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('deve carregar a pagina inicial da Complysoft @smoke @home', async ({ homePage }) => {
    await homePage.expectHomePageAvailable();
    await homePage.expectHeroVisible();
  });

  test('deve exibir secoes institucionais e solucoes principais @content @home', async ({ homePage }) => {
    await homePage.expectCoreSectionsVisible();
    await homePage.expectMainSolutionsVisible();
    await homePage.expectBusinessSegmentsVisible();
  });

  test('deve validar links das solucoes principais @links @home', async ({ homePage }) => {
    await homePage.expectMainSolutionLinksAvailable();
  });

  test('deve exibir canais principais de contato @links @contact @home', async ({ homePage }) => {
    await homePage.expectContactChannelsVisible();
  });
});
