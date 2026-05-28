import { expect, type Page } from '@playwright/test';

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

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL(/.+/);
    await expect(this.page.locator('body')).toBeVisible();
  }

  async expectHeadingsVisible(headings: Array<string | RegExp | HeadingExpectation>) {
    for (const heading of headings) {
      const options = typeof heading === 'object' && !(heading instanceof RegExp) ? heading : { name: heading };

      await expect(this.page.getByRole('heading', options).first()).toBeVisible();
    }
  }

  async expectTextsVisible(texts: string[], exact = false) {
    for (const text of texts) {
      await expect(this.page.getByText(text, { exact }).first()).toBeVisible();
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

  async expectNavigationLinkOpens(link: NavigationExpectation) {
    await this.page.getByRole('navigation').first().getByRole('link', { name: link.name, exact: link.exact }).click();

    await expect(this.page).toHaveURL(link.href);
    await expect(this.page.getByText(link.expectedText).first()).toBeVisible();
  }
}
