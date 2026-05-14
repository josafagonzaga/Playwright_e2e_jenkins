import { test, expect } from '@playwright/test';

const ctflAtPageUrl = 'https://www.cantinhodasqas.com.br/ctfl-at';

test.describe('CTFL-AT page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ctflAtPageUrl);
  });

  test.describe('Body', () => {
    test('should display CTFL-AT study content', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'CTFL-AT  - Capítulo 1 - Teste de Conhecimento' }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'CTFL-AT  - Capítulo 2 - Teste de conhecimento' }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'CTFL-AT -  Capítulo 3 - Teste de conhecimento' }),
      ).toBeVisible();
    });
  });
});
