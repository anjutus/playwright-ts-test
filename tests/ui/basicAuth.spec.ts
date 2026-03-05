import { test, expect } from '@playwright/test';
// Import the JSON data
import userData from '../../data/userDataPayload.json' with { type: 'json' };
import BasicAuthPage  from '../../pages/BasicAuthPage.js';

test('verify basic auth using credentials from JSON', async ({ page }) => {
  const basicAuthPage = new BasicAuthPage(page);
  basicAuthPage.username = process.env.BASIC_AUTH_USER || "";
  basicAuthPage.password = process.env.BASIC_AUTH_PASS || "";
  const url = userData.siteBasicAuthUrl;

  // Pass the URL and test credential to the page method
  await basicAuthPage.gotoWithCredentials(url, basicAuthPage.username, basicAuthPage.password);
  
  // Validation
  const successMessage = basicAuthPage.successMessage();
  await expect(successMessage).toBeVisible({ timeout: 10000 });
  await expect(successMessage).toContainText('Congratulations! You must have the proper credentials.');
});