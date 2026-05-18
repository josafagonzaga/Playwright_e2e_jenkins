import { test } from './fixtures/pages.fixture';
import { navigationData } from './data/shared.data';

test.describe('Trilha de Estudos page', () => {
  test.beforeEach(async ({ trilhaDeEstudosPage }) => {
    await trilhaDeEstudosPage.goto();
  });

  test.describe('Body', () => {
    test('should display the study trail content', async ({ trilhaDeEstudosPage }) => {
      await trilhaDeEstudosPage.expectStudyTrailContentVisible();
    });
  });

  test.describe('Links', () => {
    test('should navigate using the main header link', async ({ trilhaDeEstudosPage }) => {
      await trilhaDeEstudosPage.expectMainNavigationLinkOpens(navigationData.links[0]);
    });

    test('should have valid study trail resource links', async ({ trilhaDeEstudosPage }) => {
      await trilhaDeEstudosPage.expectResourceLinks();
    });

    test('should display shared footer links', async ({ trilhaDeEstudosPage }) => {
      await trilhaDeEstudosPage.expectSharedFooterLinksVisible();
    });

    test('should have valid footer links', async ({ trilhaDeEstudosPage }) => {
      await trilhaDeEstudosPage.expectFooterLinks();
    });
  });
});
