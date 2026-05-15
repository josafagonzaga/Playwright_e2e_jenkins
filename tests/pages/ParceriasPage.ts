import { parceriasData } from '../data/parcerias.data';
import { footerData } from '../data/shared.data';
import { BasePage } from './BasePage';

export class ParceriasPage extends BasePage {
  async goto() {
    await super.goto(parceriasData.url);
  }

  async expectPartnershipContentVisible() {
    await this.expectHeadingsVisible(parceriasData.headings);
  }

  async expectPartnershipLinks() {
    await this.expectLinksHaveHref(parceriasData.links);
  }

  async expectFooterLinks() {
    await this.expectLinksHaveHref(footerData.links);
  }
}
