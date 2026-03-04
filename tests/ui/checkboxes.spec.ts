import {test, expect} from '@playwright/test';
import {CheckboxesPage} from '../../pages/CheckboxesPage.js';

test.describe ('Checkbox validation suites',() => {
    test ('Should check the states and toggle checkboxes', async ({page}) => {
        const checkboxesPage = new CheckboxesPage(page);
        await checkboxesPage.goto();

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

    test('Should handle robust checking ',async ({page}) => {
        const checkboxesPage = new CheckboxesPage (page);
        await checkboxesPage.goto();

        //Use .setChecked(true) to ensure it's ON
        await checkboxesPage.checkbox1.setChecked(true);
        await expect(checkboxesPage.checkbox1).toBeChecked();
    });
});