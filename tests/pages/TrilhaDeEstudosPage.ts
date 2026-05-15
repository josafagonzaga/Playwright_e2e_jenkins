import { footerData } from '../data/shared.data';
import { trilhaDeEstudosData } from '../data/trilha-de-estudos.data';
import { BasePage } from './BasePage';

export class TrilhaDeEstudosPage extends BasePage {
  async goto() {
    await super.goto(trilhaDeEstudosData.url);
  }

  async expectStudyTrailContentVisible() {
    await this.expectHeadingsVisible(trilhaDeEstudosData.headings);
  }

  async expectResourceLinks() {
    await this.expectLinksHaveHref(trilhaDeEstudosData.links);
  }

  async expectFooterLinks() {
    await this.expectLinksHaveHref(footerData.links);
  }
}
