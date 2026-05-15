import { sitesParaPraticarData } from '../data/sites-para-praticar.data';
import { footerData } from '../data/shared.data';
import { BasePage } from './BasePage';

export class SitesParaPraticarPage extends BasePage {
  async goto() {
    await super.goto(sitesParaPraticarData.url);
  }

  async expectPracticeSiteContentVisible() {
    await this.expectTextsVisible(sitesParaPraticarData.exactTexts, true);
    await this.expectTextsVisible(sitesParaPraticarData.texts);
    await this.expectHeadingsVisible(sitesParaPraticarData.headings);
  }

  async expectPracticeSiteLinks() {
    await this.expectLinksHaveHref(sitesParaPraticarData.links);
  }

  async expectFooterLinks() {
    await this.expectLinksHaveHref(footerData.links);
  }
}
