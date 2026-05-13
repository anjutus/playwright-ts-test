import { test, expect } from '@playwright/test';
import { PaginationWebTablePage } from '../../pages/PaginationWebTablePage.js';
import userData from '../../data/userDataPayload.json' with { type: 'json' };

test.describe('Pagination Web Table tests', () => {
  let tablePage: PaginationWebTablePage;

  test.beforeEach(async ({ page }) => {
    tablePage = new PaginationWebTablePage(page);
    await tablePage.goto();
  });

  test('should load pagination web table with expected headers', async () => {
    const headers = await tablePage.getHeaderTexts();
    // Headers on this site are: ['ID', 'Name', 'Price', 'Select']
    expect(headers).toEqual(userData.paginationWebTable.expectedHeaders);
  });

  test('should display expected number of rows on the first page', async () => {
    const rowCount = await tablePage.getRowCount();
    expect(rowCount).toBe(userData.paginationWebTable.rowsPerPage);
  });

  test('should show Smartphone as the first row with price $10.99', async () => {
    const { name, price, expectedRowIndex } = userData.paginationWebTable.smartphone;
    const rowIndex = await tablePage.findRowByName(name);
    
    expect(rowIndex).toBe(expectedRowIndex);
    // Passing rowIndex and colIndex (2 for Price)
    const actualPrice = await tablePage.getRowData(rowIndex);
    expect(actualPrice[2]).toBe(price);
  });

  test('should navigate to page 2 and show different row data', async () => {
    // Capture data from page 1
    const firstPageData = await tablePage.getRowData(0); 
    
    // Navigate to Page 2
    await tablePage.selectPageNumber('2');
    
    const secondPageData = await tablePage.getRowData(0);
    expect(secondPageData).not.toEqual(firstPageData);
  });

  test('should return to first page data after navigating page 2 then back to 1', async () => {
    const firstPageData = await tablePage.getRowData(0);
    
    await tablePage.selectPageNumber('2');
    await tablePage.selectPageNumber('1');
    
    const returnedData = await tablePage.getRowData(0);
    expect(returnedData).toEqual(firstPageData);
  });

  test('should confirm each row has the correct number of columns', async () => {
    const expectedCols = userData.paginationWebTable.expectedHeaders.length;
    const rowCount = await tablePage.getRowCount();
    
    for (let i = 0; i < rowCount; i++) {
      const cells = await tablePage.getRowData(i);
      expect(cells.length).toBe(expectedCols);
    }
  });

  test('should check the Select checkbox for the first row', async () => {
    // Checkboxes start unchecked
    expect(await tablePage.isRowChecked(0)).toBe(false);
    
    await tablePage.selectRow(0);
    expect(await tablePage.isRowChecked(0)).toBe(true);
  });

  test('should uncheck the Select checkbox after checking it', async () => {
    await tablePage.selectRow(0);
    expect(await tablePage.isRowChecked(0)).toBe(true);
    
    // Re-using the locator to uncheck (helper in POM)
    await tablePage.getRowCheckbox(0).uncheck();
    expect(await tablePage.isRowChecked(0)).toBe(false);
  });

  test('should allow independent checkbox selection per row', async () => {
    await tablePage.selectRow(0);
    await tablePage.selectRow(1);
    
    expect(await tablePage.isRowChecked(0)).toBe(true);
    expect(await tablePage.isRowChecked(1)).toBe(true);
    
    await tablePage.getRowCheckbox(0).uncheck();
    
    expect(await tablePage.isRowChecked(0)).toBe(false);
    expect(await tablePage.isRowChecked(1)).toBe(true);
  });
});