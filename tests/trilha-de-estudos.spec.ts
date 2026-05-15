import { test } from './fixtures/pages.fixture';

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
    test('should have valid study trail resource links', async ({ trilhaDeEstudosPage }) => {
      await trilhaDeEstudosPage.expectResourceLinks();
    });

    test('should have valid footer links', async ({ trilhaDeEstudosPage }) => {
      await trilhaDeEstudosPage.expectFooterLinks();
    });
  });
});
