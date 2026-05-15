import { ctflData } from '../data/ctfl.data';
import { footerData } from '../data/shared.data';
import { BasePage } from './BasePage';

export class CtflPage extends BasePage {
  async goto() {
    await super.goto(ctflData.url);
  }

  async expectStudyContentVisible() {
    await this.expectHeadingsVisible(ctflData.headings);
  }

  async expectResourceLinks() {
    await this.expectLinksHaveHref(ctflData.links);
  }

  async expectFooterLinks() {
    await this.expectLinksHaveHref(footerData.links);
  }
}
