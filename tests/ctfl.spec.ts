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

  test.describe('Links', () => {
    test('should have valid CTFL resource links', async ({ page }) => {
      const ctflLinks = [
        { name: 'Simulado CTFL', href: /docs\.google\.com\/forms/ },
        { name: 'Audio Book CTFL 4.0', href: /youtube\.com\/watch\?v=xB6sQzPis_k/ },
        { name: 'CTFL Aulão', href: /youtube\.com\/watch\?v=eXv2-tS6bKM/ },
        { name: 'CTFL 4.0 - O que mudou', href: /youtube\.com\/watch\?v=3863I0l9UN8/ },
        { name: 'Tópicos Quentes live 54', href: /youtube\.com\/watch\?v=1Gs4sGjC_Vg/ },
        { name: 'Tópicos Quentes live 55', href: /youtube\.com\/watch\?v=y1ST3Ar2yFI/ },
        { name: 'CTFL 4.0 - Simulado B - Questões 1 a 15', href: /youtube\.com\/watch\?v=wXuzScmImAE/ },
        {
          name: 'Simulado CTFL 4.0 C - parte 1 - O ChatGPT acertaria?',
          href: /youtube\.com\/watch\?v=t-48IDei5II/,
        },
        { name: 'CTFL 4.0: Simulado C - Parte 1', href: /youtube\.com\/watch\?v=nGyvH40i8Ug/ },
        { name: 'CTFL 4.0 - Simulado D - Parte 1', href: /youtube\.com\/watch\?v=Bh4HOrexqQc/ },
      ];

      for (const link of ctflLinks) {
        await expect(page.getByRole('link', { name: link.name }).first()).toHaveAttribute('href', link.href);
      }

      await expect(
        page.getByRole('link', { name: 'https://bcr.bstqb.org.br/docs/exam_ctfl_4.0_sample_A[v1br].pdf' }),
      ).toHaveAttribute('href', /bcr\.bstqb\.org\.br\/docs\/exam_ctfl_4\.0_sample_A%5Bv1br%5D\.pdf/);
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
