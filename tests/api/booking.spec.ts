import {test, expect } from '@playwright/test';
import { request } from 'node:http';

//used .serial to ensure Test 1 finishes before Test 2 starts, as there is data dependency between two tests.
test.describe.serial
('Herokuapp Booking API Suite',() => {
    let bookingId : number;
    // POST the the booking endpoint to create a new booking and store the bookingId for later use
    test('POST : Should create a new booking', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                "firstname": "Test",
                "lastname": "Tester",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2026-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        bookingId = responseBody.bookingid;
        console.log('Created Booking ID:', bookingId);
    });
    // Get the booking using the bookingId from the previous test and validate the response
    test('should retrieve the created booking', async ({request}) =>{
        console.log('Booking ID:', bookingId);
        expect(bookingId).toBeDefined();
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.firstname).toBe('Test');
        expect(responseBody.lastname).toBe('Tester');

    })
})