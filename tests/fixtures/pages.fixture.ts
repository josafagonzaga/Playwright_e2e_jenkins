import { test as base } from '@playwright/test';
import { CtflAtPage } from '../pages/CtflAtPage';
import { CtflPage } from '../pages/CtflPage';
import { ParceriasPage } from '../pages/ParceriasPage';
import { QuemSomosPage } from '../pages/QuemSomosPage';
import { SitesParaPraticarPage } from '../pages/SitesParaPraticarPage';
import { TrilhaDeEstudosPage } from '../pages/TrilhaDeEstudosPage';

type PageFixtures = {
  ctflAtPage: CtflAtPage;
  ctflPage: CtflPage;
  parceriasPage: ParceriasPage;
  quemSomosPage: QuemSomosPage;
  sitesParaPraticarPage: SitesParaPraticarPage;
  trilhaDeEstudosPage: TrilhaDeEstudosPage;
};

export const test = base.extend<PageFixtures>({
  ctflAtPage: async ({ page }, use) => {
    await use(new CtflAtPage(page));
  },
  ctflPage: async ({ page }, use) => {
    await use(new CtflPage(page));
  },
  parceriasPage: async ({ page }, use) => {
    await use(new ParceriasPage(page));
  },
  quemSomosPage: async ({ page }, use) => {
    await use(new QuemSomosPage(page));
  },
  sitesParaPraticarPage: async ({ page }, use) => {
    await use(new SitesParaPraticarPage(page));
  },
  trilhaDeEstudosPage: async ({ page }, use) => {
    await use(new TrilhaDeEstudosPage(page));
  },
});
