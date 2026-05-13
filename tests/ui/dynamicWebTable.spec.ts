import { test, expect } from '@playwright/test';
import { DynamicWebTablePage } from '../../pages/DynamicWebTablePage.js';
import userData from '../../data/userDataPayload.json' with { type: 'json' };

test.describe('Dynamic Web Table tests', () => {
  let tablePage: DynamicWebTablePage;

  test.beforeEach(async ({ page }) => {
    tablePage = new DynamicWebTablePage(page);
    await tablePage.goto();
  });

  test('should contain all expected column headers regardless of display order', async () => {
    const headers = await tablePage.getHeaderTexts();
    const headerSet = new Set(headers);
    for (const expected of userData.dynamicWebTable.expectedHeaders) {
      expect(headerSet, `Expected header "${expected}" to be present`).toContain(expected);
    }
  });

  test('should display expected number of data rows', async () => {
    const rowCount = await tablePage.getRowCount();
    expect(rowCount).toBe(userData.dynamicWebTable.expectedRowCount);
  });

  test('should have the correct number of columns matching header count', async () => {
    const headers = await tablePage.getHeaderTexts();
    expect(headers.length).toBe(userData.dynamicWebTable.expectedColumnCount);
    const rowCount = await tablePage.getRowCount();
    for (let i = 0; i < rowCount; i++) {
      const cells = await tablePage.getRowData(i);
      expect(cells.length).toBe(headers.length);
    }
  });

  test('should have non-empty values in every cell of every row', async () => {
    const rowCount = await tablePage.getRowCount();
    for (let i = 0; i < rowCount; i++) {
      const rowMap = await tablePage.getRowDataAsMap(i);
      for (const [column, value] of Object.entries(rowMap)) {
        expect(value, `Row ${i}, column "${column}" should not be empty`).not.toBe('');
      }
    }
  });

  test('should resolve CPU column by name and return a non-empty value for each row', async () => {
    const rowCount = await tablePage.getRowCount();
    for (let i = 0; i < rowCount; i++) {
      const cpuValue = await tablePage.getCellValueByColumn(i, 'CPU (%)');
      expect(cpuValue, `CPU value at row ${i} should not be empty`).not.toBe('');
    }
  });

  test('should resolve Memory column by name and return a non-empty value for each row', async () => {
    const rowCount = await tablePage.getRowCount();
    for (let i = 0; i < rowCount; i++) {
      const memoryValue = await tablePage.getCellValueByColumn(i, 'Memory (MB)');
      expect(memoryValue, `Memory value at row ${i} should not be empty`).not.toBe('');
    }
  });

  test('should build a correct row data map with all expected keys', async () => {
    const rowMap = await tablePage.getRowDataAsMap(0);
    const mapKeys = Object.keys(rowMap);
    for (const expected of userData.dynamicWebTable.expectedHeaders) {
      expect(mapKeys, `Row map should contain key "${expected}"`).toContain(expected);
    }
  });
});
