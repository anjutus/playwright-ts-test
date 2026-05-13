import type { Locator, Page } from '@playwright/test';
import userData from '../data/userDataPayload.json' with { type: 'json' };

export class DynamicWebTablePage {
  readonly page: Page;
  readonly table: Locator;
  readonly url = userData.sitetestautomationblogURL;

  constructor(page: Page) {
    this.page = page;
    // Anchored by a <th> containing "CPU" — unique to this table regardless of column order
    this.table = page.locator('table').filter({ has: page.locator('th', { hasText: 'CPU' }) });
  }

  async goto() {
    await this.page.goto(`https://${this.url}`);
    await this.table.waitFor({ state: 'visible', timeout: 15000 });
  }

  async getHeaderTexts(): Promise<string[]> {
    return (await this.table.locator('th').allTextContents()).map(h => h.trim());
  }

  async getRowCount(): Promise<number> {
    return await this.table.locator('tr:has(td)').count();
  }

  async getRowData(rowIndex: number): Promise<string[]> {
    const row = this.table.locator('tr:has(td)').nth(rowIndex);
    await row.waitFor();
    return (await row.locator('td').allTextContents()).map(v => v.trim());
  }

  async getCellValue(rowIndex: number, colIndex: number): Promise<string> {
    const cell = this.table.locator('tr:has(td)').nth(rowIndex).locator('td').nth(colIndex);
    await cell.waitFor();
    return (await cell.textContent())?.trim() ?? '';
  }

  // Resolves the current column index by header name — handles shuffling header order
  async getColumnIndex(columnName: string): Promise<number> {
    const headers = await this.getHeaderTexts();
    const index = headers.findIndex(h => h === columnName);
    if (index === -1) {
      throw new Error(`Column "${columnName}" not found. Current headers: [${headers.join(', ')}]`);
    }
    return index;
  }

  // Reads a cell value by column name, resolving the current position dynamically
  async getCellValueByColumn(rowIndex: number, columnName: string): Promise<string> {
    const colIndex = await this.getColumnIndex(columnName);
    return await this.getCellValue(rowIndex, colIndex);
  }

  // Returns a {columnName: cellValue} map for a row — order-independent
  async getRowDataAsMap(rowIndex: number): Promise<Record<string, string>> {
    const [headers, cells] = await Promise.all([
      this.getHeaderTexts(),
      this.getRowData(rowIndex),
    ]);
    return Object.fromEntries(headers.map((header, i) => [header, cells[i] ?? '']));
  }
}
