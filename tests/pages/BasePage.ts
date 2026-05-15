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
}
