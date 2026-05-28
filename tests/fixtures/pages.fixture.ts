import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { HeaderComponent } from '../pages/components/HeaderComponent';

type PageFixtures = {
  header: HeaderComponent;
  homePage: HomePage;
};

export const test = base.extend<PageFixtures>({
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});
