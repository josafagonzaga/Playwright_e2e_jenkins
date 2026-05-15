import { ctflAtData } from '../data/ctfl-at.data';
import { footerData } from '../data/shared.data';
import { BasePage } from './BasePage';

export class CtflAtPage extends BasePage {
  async goto() {
    await super.goto(ctflAtData.url);
  }

  async expectStudyContentVisible() {
    await this.expectHeadingsVisible(ctflAtData.headings);
  }

  async expectResourceLinks() {
    await this.expectLinksHaveHref(ctflAtData.links);
  }

  async expectFooterLinks() {
    await this.expectLinksHaveHref(footerData.links);
  }
}
