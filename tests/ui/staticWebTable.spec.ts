import { test, expect } from '@playwright/test';
import { StaticWebTablePage } from '../../pages/StaticWebTablePage.js';
import userData from '../../data/userDataPayload.json' with { type: 'json' };

test.describe('Static Web Table tests', () => {
  let tablePage: StaticWebTablePage;

  test.beforeEach(async ({ page }) => {
    tablePage = new StaticWebTablePage(page);
    await tablePage.goto();
  });
 
  test('should load static web table with expected row count and headers', async () => {
    const rowCount = await tablePage.getRowCount();
    expect(rowCount).toBe(userData.staticWebTable.expectedRowCount);

    const headers = await tablePage.getHeaderTexts();
    expect(headers).toEqual(userData.staticWebTable.expectedHeaders);
  });

  test('should find sample row and validate sample values', async () => {
    const rowIndex = await tablePage.findRowByBookName(userData.staticWebTable.sampleRow.bookName);
    expect(rowIndex).toBeGreaterThanOrEqual(0);

    const values = await tablePage.getRowData(rowIndex);
    console.log('Extracted Row Values:', values);
    expect(values[0]).toBe(userData.staticWebTable.sampleRow.bookName);
    expect(values[1]).toBe(userData.staticWebTable.sampleRow.author);
    expect(values[2]).toBe(userData.staticWebTable.sampleRow.subject);
    expect(values[3]).toBe(userData.staticWebTable.sampleRow.price);
  });

  test('should assert price is numeric and > 0 for all rows', async () => {
    const rowCount = await tablePage.getRowCount();
    for (let i = 0; i < rowCount; i++) {
      const price = await tablePage.getCellValue(i, 3);
      const amount = Number(price);
      expect(amount).toBeGreaterThan(0);
      expect(Number.isFinite(amount)).toBeTruthy();
    }
  });
});
