import { test, expect } from '@playwright/test';

const studyTrailPageUrl = 'https://www.cantinhodasqas.com.br/trilha-de-estudos';

test.describe('Trilha de Estudos page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(studyTrailPageUrl);
  });

  test.describe('Body', () => {
    test('should display the study trail content', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'Trilha Quality Assurance', exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Trilha Quality Assurance - Por Vivian Lima' }),
      ).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Introdução ao Teste de Software' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Lógica de Programação' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Git Para Testers' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Testes de API com Postman' })).toBeVisible();
    });
  });

  test.describe('Links', () => {
    test('should have valid study trail resource links', async ({ page }) => {
      const resourceLinks = [
        {
          name: 'Trilha Quality Assurance',
          href: /notion\.site\/Trilha-Quality-Assurance/,
        },
        {
          name: 'Explorando Cargos em Teste de Software',
          href: /udemy\.com\/share\/109fsY/,
        },
        {
          name: 'Aprendendo a Testar',
          href: /sympla\.com\.br\/play\/aprendendo-a-testar/,
        },
        {
          name: 'Introdução ao Teste de Software',
          href: /coursera\.org\/learn\/intro-teste-de-software/,
        },
        {
          name: 'Introdução ao Jira e Confluence',
          href: /canalvalor\.com\/curso-gratuito-de-jira/,
        },
        {
          name: 'Lógica de Programação',
          href: /youtube\.com\/playlist/,
        },
        {
          name: 'Git Para Testers',
          href: /udemy\.com\/course\/curso-de-git-para-testers/,
        },
        {
          name: 'Testes de API com Postman',
          href: /youtube\.com\/playlist/,
        },
        {
          name: 'Curso de Testes de API Rest (com Certificado)',
          href: /youtube\.com\/playlist/,
        },
        {
          name: 'Cypress eXpress',
          href: /qaxperience\.com\/pt\/cursos\/cypress-express/,
        },
        {
          name: 'QA Engineer',
          href: /roadmap\.sh\/qa/,
        },
      ];

      for (const link of resourceLinks) {
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
