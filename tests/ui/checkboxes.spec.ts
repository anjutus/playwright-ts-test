import {test, expect} from '@playwright/test';
import {CheckboxesPage} from '../../pages/CheckboxesPage.js';


test.describe ('Checkbox validation suites',() => {
    //Declare page object variable at the describe level to be accessible in all tests
    let checkboxesPage: CheckboxesPage;

    //beforeEach hook to navigate to the checkboxes page before each test
    test.beforeEach(async ({page}) => {
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.goto();
});

    test ('Should check the states and toggle checkboxes', async () => {
        
 // In HerokuApp: Checkbox 1 is OFF, Checkbox 2 is ON
        await expect(checkboxesPage.checkbox1).not.toBeChecked();
        await expect(checkboxesPage.checkbox2).toBeChecked();

        //Toggle
        await checkboxesPage.toggleCheckbox1();
        await checkboxesPage.toggleCheckbox2();

        //Verify New States.
        await expect(checkboxesPage.checkbox1).toBeChecked();
        await expect(checkboxesPage.checkbox2).not.toBeChecked();
    });

    test('Should handle robust checking ',async () => {
        //Use .setChecked(true) to ensure it's ON
        await checkboxesPage.checkbox1.setChecked(true);
        await expect(checkboxesPage.checkbox1).toBeChecked();     
    });
    
});