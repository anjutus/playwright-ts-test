import type { Locator, Page } from "@playwright/test";
import userData from '../data/userDataPayload.json' with { type: 'json' };

export class ScreenshotPage {
  readonly page: Page;
  readonly nameField: Locator;
  readonly dynamicStatsField: Locator;
  readonly htmlDynamicTableField: Locator;
  readonly url = userData.sitetestautomationblogURL;

  constructor(page: Page) {
    this.page = page;
    this.nameField = page.locator('#name');
    this.dynamicStatsField = page.locator('#Stats1');
    this.htmlDynamicTableField = page.locator('#HTML12');
  }

  async goto() {
        await this.page.goto(`https://${this.url}`);
  }
}