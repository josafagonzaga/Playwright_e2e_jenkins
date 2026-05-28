import { expect } from '@playwright/test';
import { test } from '../fixtures/pages.fixture';
import { headerData } from '../data/header.data';

const baseURL = process.env.BASE_URL ?? 'https://complysolutions.com.br';

test.describe('Cabecalho da Complysoft - funcional', () => {
  test.describe('desktop', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test.beforeEach(async ({ header }) => {
      await header.goto();
    });

    test('deve exibir logo, menu principal, suporte, telefone e CTA @header @functional', async ({ header }) => {
      await header.expectDesktopHeaderComponentsVisible();
    });

    test('deve manter os anchors internos do menu desktop disponiveis @header @links', async ({ header }) => {
      await expect(header.findMissingSamePageAnchors(headerData.desktopNavigationLinks)).resolves.toEqual([]);
    });
  });

  test.describe('mobile', () => {
    test.use({ isMobile: true, viewport: { width: 390, height: 844 } });

    test.beforeEach(async ({ header }) => {
      await header.goto();
    });

    test('deve exibir logo, CTA e acionador do menu mobile @header @mobile @functional', async ({ header }) => {
      await header.expectMobileTopBarComponentsVisible();
    });

    test('deve abrir o menu mobile com navegacao, contatos e redes sociais @header @mobile @links', async ({
      header,
    }) => {
      await header.openMobileMenu();
      await header.expectMobileMenuComponentsVisible();
    });
  });

  test('deve responder os destinos internos usados no cabecalho @header @links', async ({ request }) => {
    for (const target of headerData.internalHttpTargets) {
      const response = await request.get(new URL(target, baseURL).toString());

      expect(response.status(), `${target} deve responder com sucesso`).toBeLessThan(400);
    }
  });
});
