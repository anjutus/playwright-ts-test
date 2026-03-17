import {test, expect} from '@playwright/test';
import { ScreenshotPage } from '../../pages/ScreenshotPage.js';

test.describe.serial('Visual Testing - Screenshot Suite', () => {
    let screenShotPage: ScreenshotPage;
    //beforeEach hook to navigate to the screenshot page before each test
     test.beforeEach(async ({page}) => {
        screenShotPage = new ScreenshotPage(page);
        await screenShotPage.goto();
        await screenShotPage.page.waitForLoadState('domcontentloaded');
    });
    
    test('Visual Testing - page snapshot - clip ', async () => {
    
    //Capture a specific coordinate on the screen
    const screenshot =await screenShotPage.page.screenshot({
        path: 'header-clip.png',
        clip: {
            x: 0,
            y: 0,
            width: 1000,
            height: 200
        }
        
        });
        await expect(screenshot).toMatchSnapshot('header-clip.png',{ maxDiffPixelRatio : 0.05});
    });
 

test('Visual Testing - page snapshot - Element-Level ', async () => {

  //Element-Level Screenshots
 await screenShotPage.nameField.waitFor({ state: 'visible' });
 await expect(screenShotPage.nameField).toHaveScreenshot('name-field.png',{threshold : 0.2 ,maxDiffPixelRatio: 0.05, // More robust than maxDiffPixels
    animations: 'disabled'});
 
});

test('Visual Testing - page snapshot - Dynamic element masking ', async () => {
    // Manually hide the dynamic stats before the screenshot
    await screenShotPage.page.addStyleTag({
    content: `
      #Stats1_content, 
      #dStats1_totalCount { 
        visibility: hidden !important; 
      }
    `
  });
    await expect(screenShotPage.page).toHaveScreenshot('SS.png',{fullPage: true,
    mask: [
      screenShotPage.htmlDynamicTableField
    ],maxDiffPixelRatio: 0.07});
 
});

});
