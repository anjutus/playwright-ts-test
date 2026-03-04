import {test, expect } from '@playwright/test';
import userData from '../../data/userDataPayload.json' with { type: 'json' };

//used .serial to ensure Test 1 finishes before Test 2 starts, as there is data dependency between two tests.
test.describe.serial
('Herokuapp Booking API Suite',() => {
    let bookingId : number;
    const url = userData.siterestfulbookingUrl;
    // POST the the booking endpoint to create a new booking and store the bookingId for later use
    test('POST : Should create a new booking', async ({ request }) => {
        const response = await request.post(`https://${url}`, {
           data: userData.bookingData
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        // Validate that the response matches our JSON data
        expect(responseBody.booking.firstname).toBe(userData.bookingData.firstname);
        bookingId = responseBody.bookingid;
        console.log('Created Booking ID:', bookingId);
    });
    // Get the booking using the bookingId from the previous test and validate the response
    test('should retrieve the created booking', async ({request}) =>{
        console.log('Booking ID:', bookingId);
        expect(bookingId).toBeDefined();
        const response = await request.get(`https://${url}/${bookingId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.firstname).toBe(userData.bookingData.firstname);
        expect(responseBody.lastname).toBe(userData.bookingData.lastname);

    })
})