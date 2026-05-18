import { expect, type Page } from '@playwright/test';
import { footerData, navigationData, searchData } from '../data/shared.data';

type LinkName = string | RegExp;
type LinkHref = string | RegExp;

export type LinkExpectation = {
  name: LinkName;
  href: LinkHref;
  exact?: boolean;
};

export type HeadingExpectation = {
  name: string | RegExp;
  exact?: boolean;
};

export type NavigationExpectation = LinkExpectation & {
  expectedText: string;
};

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async expectHeadingsVisible(headings: Array<string | RegExp | HeadingExpectation>) {
    for (const heading of headings) {
      const options = typeof heading === 'object' && !(heading instanceof RegExp) ? heading : { name: heading };

      await expect(this.page.getByRole('heading', options)).toBeVisible();
    }
  }

  async expectTextsVisible(texts: string[], exact = false) {
    for (const text of texts) {
      await expect(this.page.getByText(text, { exact })).toBeVisible();
    }
  }

  async expectLinksHaveHref(links: LinkExpectation[]) {
    for (const link of links) {
      await expect(this.page.getByRole('link', { name: link.name, exact: link.exact }).first()).toHaveAttribute(
        'href',
        link.href,
      );
    }
  }

  async expectSearchResults() {
    await this.page.getByRole('button', { name: 'Open search bar' }).click();

    const searchInput = this.page.getByRole('combobox', { name: 'Search this site' });

    await expect(searchInput).toBeVisible();
    await searchInput.fill(searchData.query);
    await searchInput.press('Enter');

    await expect(this.page).toHaveURL(searchData.resultsUrl);
    await expect(this.page.getByText('Results from this site')).toBeVisible();
    await this.expectLinksHaveHref(searchData.results);
  }

  async expectSupportFooterVisible() {
    await this.expectTextsVisible(footerData.supportTexts);

    for (const linkName of footerData.visibleLinks) {
      await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
    }
  }

  async expectSharedFooterLinksVisible() {
    await this.expectTextsVisible(footerData.commonTexts);

    for (const linkName of footerData.commonVisibleLinks) {
      await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
    }
  }

  async expectFooterLinks() {
    await this.expectLinksHaveHref(footerData.links);
  }

  async expectMoreMenuLinksHaveHref() {
    await this.page.getByRole('link', { name: 'More' }).click();
    await this.expectLinksHaveHref(navigationData.moreMenuLinks);
  }

  async expectMainNavigationLinksVisible() {
    for (const link of navigationData.links) {
      await expect(
        this.page
          .locator('a:visible')
          .filter({ hasText: String(link.name) })
          .first(),
      ).toBeVisible();
    }
  }

  async expectMainNavigationLinksHaveHref() {
    await this.expectLinksHaveHref(navigationData.links);
  }

  async expectMainNavigationLinkOpens(link: NavigationExpectation) {
    await this.page.getByRole('navigation').getByRole('link', { name: link.name, exact: link.exact }).click();

    await expect(this.page).toHaveURL(link.href);
    await expect(this.page.getByText(link.expectedText).first()).toBeVisible();
  }
}
