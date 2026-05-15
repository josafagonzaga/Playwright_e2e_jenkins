import { expect, type Page } from '@playwright/test';
import { quemSomosData } from '../data/quem-somos.data';
import { footerData } from '../data/shared.data';
import { BasePage } from './BasePage';

export class QuemSomosPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto(quemSomosData.url);
  }

  async expectTopNavigationVisible() {
    for (const linkName of quemSomosData.headerLinks) {
      const exact = typeof linkName === 'string';

      await expect(this.page.getByRole('link', { name: linkName, exact })).toBeVisible();
    }

    await expect(this.page.getByRole('button', { name: 'Open search bar' })).toBeVisible();
  }

  async expectMainHeadingsVisible() {
    await this.expectHeadingsVisible(quemSomosData.mainHeadings);
  }

  async expectSupportFooterVisible() {
    await this.expectTextsVisible(footerData.supportTexts);

    for (const linkName of footerData.visibleLinks) {
      await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
    }
  }

  async expectInternalNavigation() {
    for (const link of quemSomosData.internalLinks) {
      await this.goto();
      await this.page.getByRole('navigation').getByRole('link', { name: link.name, exact: true }).click();

      await expect(this.page).toHaveURL(link.path);
      await expect(this.page.getByText(link.expectedText).first()).toBeVisible();
    }
  }

  async expectMoreMenuLinksVisible() {
    await this.page.getByRole('link', { name: 'More' }).click();

    for (const linkName of quemSomosData.moreMenuLinks) {
      await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
    }
  }

  async expectAdministratorProfileLinksVisible() {
    for (const href of quemSomosData.administratorProfileHrefs) {
      await expect(this.page.locator(`a[href*="${href}"]`).first()).toBeVisible();
    }
  }

  async expectFooterLinks() {
    await this.expectLinksHaveHref([...quemSomosData.footerLinks, ...footerData.links]);
  }
}
