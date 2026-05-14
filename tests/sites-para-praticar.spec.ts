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

  test.describe('Links', () => {
    test('should have valid practice site links', async ({ page }) => {
      const practiceLinks = [
        { name: 'Swag Labs', href: /saucedemo\.com/ },
        { name: 'OpenCart', href: /demo\.opencart\.com/ },
        { name: 'Nop Commerce', href: /admin-demo\.nopcommerce\.com/ },
        { name: 'Book Cart', href: /bookcart\.azurewebsites\.net/ },
        { name: 'UI Test Automation Playground', href: /uitestingplayground\.com/ },
        { name: 'DemoQA', href: /demoqa\.com/ },
        { name: 'Automation Testing Practice', href: /testautomationpractice\.blogspot\.com/ },
        { name: 'Front - Serverest', href: /front\.serverest\.dev\/login/ },
        { name: 'BugBank', href: /bugbank\.netlify\.app/ },
        { name: 'Luma', href: /magento\.softwaretestingboard\.com/ },
        { name: 'REQRES', href: /reqres\.in/ },
        { name: 'Serve Rest', href: /serverest\.dev/ },
        { name: 'Selectors Hub', href: /selectorshub\.com\/xpath-practice-page/ },
      ];

      for (const link of practiceLinks) {
        await expect(page.getByRole('link', { name: link.name }).first()).toHaveAttribute('href', link.href);
      }
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
