import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { applicationData, homePageData } from '../data/shared.data';

export class HomePage extends BasePage {
  async expectHomePageAvailable() {
    await this.expectPageLoaded();
    await expect(this.page).toHaveTitle(applicationData.expectedTitle);
    await expect(this.page.locator('body')).not.toHaveText('');
  }

  async expectHeroVisible() {
    await expect(this.page.getByRole('heading', { name: homePageData.heroHeading, exact: true }).first()).toBeVisible();
    await expect(this.page.getByText(homePageData.heroSubtitle, { exact: true }).first()).toBeVisible();
  }

  async expectCoreSectionsVisible() {
    await this.expectHeadingsVisible(homePageData.coreHeadings);
  }

  async expectMainSolutionsVisible() {
    for (const solution of homePageData.solutions) {
      await expect(this.page.getByRole('heading', { name: solution, exact: true }).first()).toBeVisible();
    }
  }

  async expectBusinessSegmentsVisible() {
    for (const segment of homePageData.businessSegments) {
      await expect(this.page.getByRole('link', { name: segment, exact: true }).first()).toBeVisible();
    }
  }

  async expectContactChannelsVisible() {
    await this.expectTextsVisible(homePageData.contactTexts);
    await expect(this.page.getByRole('link', { name: /Fale com (um )?Especialista/i }).first()).toHaveAttribute(
      'href',
      /whatsapp\.com|wa\.me/,
    );
  }
}
