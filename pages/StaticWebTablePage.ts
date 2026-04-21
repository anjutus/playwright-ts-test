import type { Locator, Page } from '@playwright/test';
import userData from '../data/userDataPayload.json' with { type: 'json' };

export class StaticWebTablePage {
  readonly page: Page;
  readonly table: Locator;
  readonly url = userData.sitetestautomationblogURL;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('table:has-text("BookName")');
  }

  async goto() {
    await this.page.goto(`https://${this.url}`);
    await this.table.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  async getRowCount() {
       // This ignores the header row because it contains <th>
      return await this.table.locator('tr:not(:has(th))').count();
  }

  async getHeaderTexts() {
    return await this.table.locator('tbody th').allTextContents();
  }

  async getRowData(rowIndex: number) {
    //Filter to rows with <td> to skip the header (<th>) row
    const row = this.table.locator('tr:has(td)').nth(rowIndex);
    //Wait for the row to ensure it exists before extracting
    await row.waitFor();
    //Extract all text content from <td> cells in one go
    return await row.locator('td').allTextContents();
  }

  async getCellValue(rowIndex: number, colIndex: number) {
    //Use ':has(td)' to ensure we only count data rows, not the header
   const cell =await this.table.locator('tr:has(td)').nth(rowIndex).locator('td').nth(colIndex);
    // 3. Wait briefly for the cell to appear to prevent flakiness
    await cell.waitFor();
    return (await cell.textContent())?.trim() ?? '';
  }

  async findRowByBookName(bookName: string) {
    const rows = this.table.locator('tr:has(td)');
    await rows.first().waitFor();
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; i++) {
      const text = await rows.nth(i).locator('td').first().textContent();
      if (text?.trim() === bookName) {
        return i;
      }
    }
    return -1;
  }
}
