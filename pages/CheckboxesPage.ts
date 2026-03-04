import type { Locator, Page } from "@playwright/test";
import userData from '../data/userDataPayload.json' with { type: 'json' };

export class CheckboxesPage {

    readonly page : Page;
    readonly checkbox1 : Locator;
    readonly checkbox2: Locator;
    readonly url = userData.siteCheckboxesUrl;

    constructor (page :Page){
        this.page = page;
        //Returns locator to the n-th matching element. It's zero based, nth(0) selects the first element.
        this.checkbox1 = page.locator('input[type="checkbox"]').nth(0);
        this.checkbox2 = page.locator('input[type="checkbox"]').nth(1);

    }
    async goto() {
        await this.page.goto(`https://${this.url}`);
    }
    async toggleCheckbox1() {
        await this.checkbox1.check();
    }
    async toggleCheckbox2() {
        await this.checkbox2.uncheck();
    }

}