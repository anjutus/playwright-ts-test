import type { Locator, Page } from '@playwright/test';
import userData from '../data/userDataPayload.json' with { type: 'json' };

export class PaginationWebTablePage {
  readonly page: Page;
  readonly table: Locator;
readonly paginationList: Locator;
  readonly url = userData.sitetestautomationblogURL;

  constructor(page: Page) {
    this.page = page;
// The specific table on this site has id="productTable"
    this.table = page.locator('#productTable');
    // The pagination links are inside a list with id="pagination"
    this.paginationList = page.locator('#pagination li a');
  }

  async goto() {
    await this.page.goto(`https://${this.url}`);
    await this.table.waitFor({ state: 'visible', timeout: 15000 });
  }

  async getHeaderTexts(): Promise<string[]> {
    return await this.table.locator('thead th').allTextContents();
  }

async getRowCount(): Promise<number> {
    // Filtering for visible rows within the tbody
    return await this.table.locator('tbody tr').count();
  }

async getRowData(rowIndex: number): Promise<string[]> {
    const row = this.table.locator('tbody tr').nth(rowIndex);
    return await row.locator('td').allTextContents();
  }

  /**
   * Clicks a specific page number in the pagination list
   * @param pageNum The page number string (e.g., "1", "2", "3", "4")
   */
  async selectPageNumber(pageNum: string): Promise<void> {
    const pageLink = this.paginationList.filter({ hasText: pageNum });
    await pageLink.click();
    // Brief wait for the table content to refresh/re-render
    await this.page.waitForTimeout(500); 
  }

  /**
   * Logic to simulate "Next" by finding the active page and clicking the next sibling
   */
  async goToNextPage(): Promise<void> {
    const activePage = this.page.locator('#pagination li.active'); // Adjust if class name differs
    const nextLink = this.page.locator('#pagination li.active + li a');
    if (await nextLink.isVisible()) {
      await nextLink.click();
    }
  }

  // Searches the Name column (Index 1) for a match on the CURRENT page
  async findRowByName(name: string): Promise<number> {
    const rows = this.table.locator('tbody tr');
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; i++) {
      const nameText = await rows.nth(i).locator('td').nth(1).textContent();
      if (nameText?.trim() === name) return i;
    }
    return -1;
  }

  getRowCheckbox(rowIndex: number): Locator {
    // Select column is index 3 (last column)
    return this.table.locator('tbody tr').nth(rowIndex).locator('input[type="checkbox"]');
  }

  async selectRow(rowIndex: number): Promise<void> {
    await this.getRowCheckbox(rowIndex).check();
  }

  async isRowChecked(rowIndex: number): Promise<boolean> {
    return await this.getRowCheckbox(rowIndex).isChecked();
  }
}
