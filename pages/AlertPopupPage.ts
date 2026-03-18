import type { Page, Locator } from '@playwright/test';
import userData from '../data/userDataPayload.json' with { type: 'json' };

export class AlertPopupPage {
    readonly page: Page;
    readonly alertBtn: Locator;
    readonly confirmBtn: Locator;
    readonly promptBtn: Locator;
    readonly newTabBtn: Locator;
    readonly newWindowBtn: Locator;
    readonly demoText: Locator;

    readonly url = userData.sitetestautomationblogURL;
    
    constructor(page: Page) {
        this.page=page;
        this.alertBtn = page.locator('#alertBtn');
        this.confirmBtn = page.locator('#confirmBtn');
        this.promptBtn = page.locator('#promptBtn');
        this.newTabBtn = page.getByRole('button', { name: 'New Tab' });
        this.newWindowBtn = page.getByRole('button', { name: 'Popup Windows' });
        this.demoText = page.locator('#demo');
    }
    async goto() {
        await this.page.goto(`https://${this.url}`);
    }   
    async handleDialog(action: 'accept' | 'dismiss', promptText?: string) 
    {
        this.page.once('dialog', async dialog => {
            if (promptText) {
                await dialog.accept(promptText);
            }
            else if (action === 'accept') {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
    }

}