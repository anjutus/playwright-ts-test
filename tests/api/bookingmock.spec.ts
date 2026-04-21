import {test, expect } from '@playwright/test';
import userData from '../../data/userDataPayload.json' with { type: 'json' };

test('verify booking mock API request', async ({ page }) => {
// Mock the api call before navigating to the page
const url = userData.siterestfulbookingURL;
    await page.route(`https://${url}` , async route =>{
        const jsonResponse = {
            "booking": {
                bookingid: 1234,
                booking: userData.bookingData
            }
        };
        // Validate the request BEFORE fulfilling it
        expect(route.request().method()).toBe('GET');
        // If you want to see the request payload (for POST/PUT), you can log it here
        const payload = route.request().postDataJSON();
        console.log('Request Payload Captured:', payload);
        
        // Fulfill the request with your mock data
        await route.fulfill({ 
            status: 200,
            contentType: 'application/json',
            json: jsonResponse 
        });
    } );
await page.goto('https://' + url.split('/')[0]); // Go to the base site
});