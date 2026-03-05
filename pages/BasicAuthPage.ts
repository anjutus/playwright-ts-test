import type { Page } from '@playwright/test';

export default class BasicAuthPage {
  readonly page: Page;
  username?: string;
  password?: string;  

  constructor(page: Page) {
    this.page = page;
  }

  async gotoWithCredentials(url: string, username: string, password: string) {
    // constructing a URL like https://user:pass@host
    await this.page.goto(`https://${username}:${password}@${url}`, { waitUntil: 'networkidle' });
  }

  /**
   * Return the success message element that appears after login.
   */
  successMessage() {
    return this.page.getByText('Congratulations!');
  }
}
