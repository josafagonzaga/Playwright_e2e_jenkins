import { expect } from '@playwright/test';
import { test } from '../fixtures/pages.fixture';

test.describe('Cabecalho da Complysoft - visual', () => {
  test.describe('desktop', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('deve manter o layout do cabecalho desktop @header @visual', async ({ header }) => {
      await header.goto();
      await expect(header.visibleHeader()).toHaveScreenshot('header-desktop.png', {
        animations: 'disabled',
        maxDiffPixelRatio: 0.02,
      });
    });
  });

  test.describe('mobile', () => {
    test.use({ isMobile: true, viewport: { width: 390, height: 844 } });

    test('deve manter o layout do topo mobile @header @mobile @visual', async ({ header }) => {
      await header.goto();
      await expect(header.visibleHeader()).toHaveScreenshot('header-mobile.png', {
        animations: 'disabled',
        maxDiffPixelRatio: 0.02,
      });
    });

    test('deve manter o layout do menu mobile aberto @header @mobile @visual', async ({ header }) => {
      await header.goto();
      await header.openMobileMenu();
      await expect(header.mobileMenuPanel()).toHaveScreenshot('header-mobile-menu.png', {
        animations: 'disabled',
        maxDiffPixelRatio: 0.02,
      });
    });
  });
});
