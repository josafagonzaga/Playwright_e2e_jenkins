import { test, expect } from '@playwright/test';

const ctflPageUrl = 'https://www.cantinhodasqas.com.br/ctfl';

test.describe('CTFL page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ctflPageUrl);
  });

  test.describe('Body', () => {
    test('should display CTFL study content', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Simulado CTFL 4.0' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Audio Book CTFL 4.0' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'CTFL Aulão' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'CTFL 4.0 - O que mudou' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'CTFL 4.0 - Tópicos Quentes' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'CTFL 4.0 - Simulados' })).toBeVisible();
    });
  });
});
