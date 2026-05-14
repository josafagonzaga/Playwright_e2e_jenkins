import { test, expect } from '@playwright/test';

const practiceSitesPageUrl = 'https://www.cantinhodasqas.com.br/sites-para-praticar';

test.describe('Sites para Praticar page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(practiceSitesPageUrl);
  });

  test.describe('Body', () => {
    test('should display practice site categories and examples', async ({ page }) => {
      await expect(page.getByText('Testes Manuais', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Swag Labs' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'OpenCart' })).toBeVisible();

      await expect(page.getByText('Testes Automatizados', { exact: true })).toBeVisible();
      await expect(page.getByText('UI Test Automation Playground')).toBeVisible();
      await expect(page.getByText('DemoQA')).toBeVisible();
      await expect(page.getByText('Automation Testing Practice')).toBeVisible();

      await expect(page.getByText('Testes Manuais e Automatizados', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'BugBank' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Luma' })).toBeVisible();

      await expect(page.getByText('API', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'REQRES' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Serve Rest' })).toBeVisible();

      await expect(page.getByText('Captura de Elementos', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Selectors Hub' })).toBeVisible();
    });
  });
});
