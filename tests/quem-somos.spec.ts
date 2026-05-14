import { test, expect } from '@playwright/test';

const quemSomosPageUrl = 'https://www.cantinhodasqas.com.br/quem-somos';

test.describe('Quem Somos page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(quemSomosPageUrl);
  });

  test.describe('Header', () => {
    test('should display the top navigation items', async ({ page }) => {
      await expect(page.getByRole('link', { name: /Cantinho das QAs/ })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Quem Somos' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Trilha de Estudos' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Parcerias' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Sites para Praticar' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'CTFL', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'CTFL - AT' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'More' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Open search bar' })).toBeVisible();
    });
  });

  test.describe('Body', () => {
    test('should display the main section headings', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'MISSÃO' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'VISÃO' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'VALORES' })).toBeVisible();
    });
  });

  test.describe('Footer', () => {
    test('should display support links and social media items', async ({ page }) => {
      await expect(page.getByText('Quer apoiar o Cantinho?')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Clique e apoie !' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Acesse nosso mídia-kit' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Download Mídia-Kit' })).toBeVisible();
      await expect(page.getByText('Siga nossas redes sociais:')).toBeVisible();
      await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Instagram' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'YouTube' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Email' })).toBeVisible();
      await expect(page.getByText('contato@cantinhodasqas.com.br')).toBeVisible();
    });
  });

  test.describe('Links', () => {
    test('should navigate using the main internal links', async ({ page }) => {
      const internalLinks = [
        { name: 'Quem Somos', path: /\/quem-somos$/, expectedText: 'MISSÃO' },
        { name: 'Trilha de Estudos', path: /\/trilha-de-estudos$/, expectedText: 'Trilha Quality Assurance' },
        { name: 'Parcerias', path: /\/parcerias$/, expectedText: 'Plataforma - Qualitersclub - Priscila Caimi' },
        { name: 'Sites para Praticar', path: /\/sites-para-praticar$/, expectedText: 'Testes Manuais' },
        { name: 'CTFL', path: /\/ctfl$/, expectedText: 'Simulado CTFL 4.0' },
        { name: 'CTFL - AT', path: /\/ctfl-at$/, expectedText: 'CTFL-AT' },
      ];

      for (const link of internalLinks) {
        await page.goto(quemSomosPageUrl);
        await page.getByRole('navigation').getByRole('link', { name: link.name, exact: true }).click();

        await expect(page).toHaveURL(link.path);
        await expect(page.getByText(link.expectedText).first()).toBeVisible();
      }
    });

    test('should display more menu links when clicking More', async ({ page }) => {
      await page.getByRole('link', { name: 'More' }).click();

      await expect(page.getByRole('link', { name: '3º Aniversário do Cantinho das QAs' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Eventos' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Nosso Canal' })).toBeVisible();
    });

    test('should have valid administrator profile links', async ({ page }) => {
      await expect(page.locator('a[href*="linkedin.com%2Fin%2Fsara-r-s-vieira"]').first()).toBeVisible();
      await expect(page.locator('a[href*="linkedin.com%2Fin%2Freginaazzi"]').first()).toBeVisible();
      await expect(page.locator('a[href*="linkedin.com%2Fin%2Fvivianflima"]').first()).toBeVisible();
    });

    test('should have valid footer links', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Clique e apoie !' })).toHaveAttribute('href', /apoia\.se/);
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
