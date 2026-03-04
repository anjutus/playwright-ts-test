import { test, expect } from '@playwright/test';
// Import the JSON data
import userData from '../../data/userDataPayload.json' with { type: 'json' };

test('verify basic auth using credentials from JSON', async ({ page }) => {
 const username = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASS;
  const url = userData.siteBasicAuthUrl;

  // Manually constructing the URL with credentials: https://username:password@url
  // This is how you "enter" them for system-level popups
  await page.goto(`https://${username}:${password}@${url}`);

  // Validation
  const successMessage = page.locator('p');
  await expect(successMessage).toContainText('Congratulations! You must have the proper credentials.');
});