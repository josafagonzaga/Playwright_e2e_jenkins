import { test, expect } from '@playwright/test';

const partnershipsPageUrl = 'https://www.cantinhodasqas.com.br/parcerias';

test.describe('Parcerias page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(partnershipsPageUrl);
  });

  test.describe('Body', () => {
    test('should display the partnership content', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'Plataforma - Qualitersclub - Priscila Caimi' }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Desconto de 15% através do link e cupom: CANTINHO15' }),
      ).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Workshop - 4ALL Tests' })).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Desconto de 30% através do link' }),
      ).toBeVisible();
    });
  });
});
