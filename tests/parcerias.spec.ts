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

  test.describe('Links', () => {
    test('should have valid partnership links', async ({ page }) => {
      await expect(
        page.getByRole('link', { name: 'Plataforma - Qualitersclub - Priscila Caimi' }),
      ).toHaveAttribute('href', /pay\.kirvano\.com\/r\/4b321c2e-0594-485b-aa44-17b6fa76a904/);
      await expect(page.getByRole('link', { name: 'Workshop - 4ALL Tests' })).toHaveAttribute(
        'href',
        /sympla\.com\.br\/play\/imersao-em-testes-de-software\/1845016/,
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
