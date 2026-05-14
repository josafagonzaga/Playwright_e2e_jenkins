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

  test.describe('Links', () => {
    test('should have valid CTFL-AT resource links', async ({ page }) => {
      await expect(page.getByRole('link', { name: /Capítulo 1 - Teste de Conhecimento/ })).toHaveAttribute(
        'href',
        /forms\.gle\/vwZqC4evv3R66SQL8/,
      );
      await expect(page.getByRole('link', { name: /Capítulo 2 - Teste de conhecimento/ })).toHaveAttribute(
        'href',
        /forms\.gle\/ef9kaqJUKBTT5WcU7/,
      );
      await expect(page.getByRole('link', { name: /Capítulo 3 - Teste de conhecimento/ })).toHaveAttribute(
        'href',
        /forms\.gle\/zdc9ViPmB6A1zELu8/,
      );
    });

    test('should have valid footer links', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Acesse nosso mídia-kit' })).toHaveAttribute(
        'href',
        /midia-kit-cantinhodasqas/,
      );
      await expect(page.getByRole('link', { name: 'Download Mídia-Kit' })).toHaveAttribute(
        'href',
        /drive\.google\.com\/uc\?export=download/,
      );
      await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', /linkedin\.com/);
      await expect(page.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', /instagram\.com/);
      await expect(page.getByRole('link', { name: 'YouTube' })).toHaveAttribute(
        'href',
        /youtube\.com\/@CantinhodasQAs/,
      );
      await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute(
        'href',
        'mailto:contato@cantinhodasqas.com.br',
      );
    });
  });
});
