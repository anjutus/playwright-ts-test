import { test,expect } from '@playwright/test';
import { AlertPopupPage } from '../../pages/AlertPopupPage.js';
import userData from '../../data/userDataPayload.json' with { type: 'json' };

test.describe('Alert and Popups Suites', () => {
let alertPopupPage: AlertPopupPage;

test.beforeEach(async ({page}) =>{
alertPopupPage = new AlertPopupPage(page);
await alertPopupPage.goto();
})
// Simple Alert Handling
test('should handle Simple alert', async() =>{
    await alertPopupPage.alertBtn.click();
    await alertPopupPage.handleDialog('accept');
})
// Simple Alert Handling - Accept
test('should handle Confirmation alert - Accept', async() =>{
    await alertPopupPage.handleDialog('accept');
    await alertPopupPage.confirmBtn.click();
    await expect(alertPopupPage.demoText).toContainText('You pressed OK!');
})
// Simple Alert Handling - Dismiss
test('should handle Confirmation alert - Dismiss', async() =>{
    await alertPopupPage.handleDialog('dismiss');
    await alertPopupPage.confirmBtn.click();
    await expect(alertPopupPage.demoText).toContainText('You pressed Cancel!');
})
// Simple Alert handling - Prompt
test('should handle Prompt alert - Accept with text input', async () =>{
    const promtInput = 'John Doe';
    await alertPopupPage.handleDialog('accept', promtInput);
    await alertPopupPage.promptBtn.click();
    
    await expect(alertPopupPage.demoText).toContainText(`Hello ${promtInput}! How are you today?`);
})

//  POPUP USE CASES ---
// New Tab Handling
  test('should handle New Tab popup', async ({ context }) => {
    const [newTabPage] = await Promise.all([
      context.waitForEvent('page'),
      alertPopupPage.newTabBtn.click()
    ]);
    await newTabPage.waitForLoadState();
    await expect(newTabPage).toHaveURL(`${userData.newTabURL}`);
    await newTabPage.close();
  });
// New Window Handling
  test('should handle New Browser Window popup', async ({ context }) => {
    //Setup listeners for TWO new pages
    const [newWindow1,newWindow2] = await Promise.all([
      context.waitForEvent('page'),
      context.waitForEvent('page'),
      alertPopupPage.newWindowBtn.click()
    ]);
    //  Wait for both to load
    await newWindow1.waitForLoadState();
    await newWindow2.waitForLoadState();

    //Check titles and URLs
    const titles = [await newWindow1.title(), await newWindow2.title()];
    const urls = [newWindow1.url(), newWindow2.url()];
    // Title of the new window should  not be empty/null
    expect(titles[0]).not.toBeNull();
    expect(titles[1]).not.toBeNull();
    // This verifies that window1 is EITHER Selenium OR Playwright
    await expect(newWindow1).toHaveURL(/selenium\.dev|playwright\.dev/);
    // This verifies that window2 is also EITHER Selenium OR Playwright
    await expect(newWindow2).toHaveURL(/selenium\.dev|playwright\.dev/);
    //Close the new windows
    await newWindow1.close();
    await newWindow2.close();
  });
});

