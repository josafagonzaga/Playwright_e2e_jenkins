import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { headerData, type HeaderIconLinkExpectation, type HeaderLinkExpectation } from '../../data/header.data';

export class HeaderComponent extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  visibleHeader() {
    return this.page.locator('.elementor-location-header').filter({ visible: true }).first();
  }

  mobileMenuPanel() {
    return this.page.locator('.dialog-widget-content').filter({ visible: true }).first();
  }

  async expectDesktopHeaderComponentsVisible() {
    const header = this.visibleHeader();

    await expect(header).toBeVisible();
    await expect(this.logoLink(header)).toBeVisible();
    await this.expectLinksVisibleWithHref(header, headerData.desktopNavigationLinks);
    await this.expectLinksVisibleWithHref(header, headerData.desktopSupportLinks);
  }

  async expectMobileTopBarComponentsVisible() {
    const header = this.visibleHeader();

    await expect(header).toBeVisible();
    await expect(this.logoLink(header)).toBeVisible();
    await this.expectLinksVisibleWithHref(header, headerData.mobileTopLinks);
    await expect(this.mobileMenuTrigger(header)).toBeVisible();
  }

  async openMobileMenu() {
    await this.mobileMenuTrigger(this.visibleHeader()).click();
    await expect(this.mobileMenuPanel()).toBeVisible();
  }

  async expectMobileMenuComponentsVisible() {
    const panel = this.mobileMenuPanel();

    await expect(this.logoLink(panel)).toBeVisible();
    await this.expectLinksVisibleWithHref(panel, headerData.mobileMenuLinks);
    await expect(panel.getByText('FALE CONOSCO', { exact: true })).toBeVisible();
    await expect(panel.getByRole('heading', { name: 'CONTATOS', exact: true })).toBeVisible();
    await this.expectLinksVisibleWithHref(panel, headerData.mobileContactLinks);
    await this.expectIconLinksHaveHref(panel, headerData.mobileSocialLinks);
  }

  async findMissingSamePageAnchors(links: HeaderLinkExpectation[]) {
    const missingAnchors: string[] = [];

    for (const link of links) {
      if (link.anchorId && (await this.page.locator(`#${link.anchorId}`).count()) === 0) {
        missingAnchors.push(link.anchorId);
      }
    }

    return missingAnchors;
  }

  private logoLink(root: Locator) {
    return root
      .locator('a')
      .filter({ has: this.page.locator(`img[src*="${headerData.logo.imageFile}"]`) })
      .filter({ visible: true })
      .first();
  }

  private mobileMenuTrigger(root: Locator) {
    return root.locator('a.elementor-icon[href*="popup"]').filter({ visible: true }).first();
  }

  private async expectLinksVisibleWithHref(root: Locator, links: HeaderLinkExpectation[]) {
    for (const link of links) {
      const locator = root.getByRole('link', { name: link.name, exact: link.exact }).filter({ visible: true }).first();

      await expect(locator).toBeVisible();
      await expect(locator).toHaveAttribute('href', link.href);
    }
  }

  private async expectIconLinksHaveHref(root: Locator, links: HeaderIconLinkExpectation[]) {
    for (const link of links) {
      const locator = root.locator(`a[href*="${link.hrefPart}"]`).filter({ visible: true }).first();

      await expect(locator).toBeVisible();
      await expect(locator).toHaveAttribute('href', link.href);
    }
  }
}
