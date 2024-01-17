//page object model for the additional repo size column

import { expect, test } from "../fixtures/fixtures";
import * as dotenv from "dotenv";
import { measureValues } from "../utils/options";
import { Locator, Page } from "@playwright/test";

dotenv.config();

export class repoSizeColumnPage {
  readonly page: Page;
  readonly pageURL: string;
  readonly columnCellLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageURL = process.env.BASE_URL || "";
    this.columnCellLocator = this.page.locator(
      '[data-testid*="github-repo-size-cell"]'
    );
  }

  async getRepoSizeColumnCellCount(): Promise<number> {
    const numberOfCells = await this.columnCellLocator.count();
    return numberOfCells;
  }

  async validateCellsAreVisible(): Promise<boolean> {
    try {
      const numberOfCells = await this.getRepoSizeColumnCellCount();
      if (numberOfCells == 0) {
        throw new Error("No repo size column found");
      }

      for (let i = 0; i < numberOfCells; i++) {
        const cellLocator = await this.columnCellLocator.nth(i);
        await cellLocator.click(); //precondition to make it visible in the DOM (if run in isolation)
        await expect(cellLocator).toBeVisible();
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  // validates the cells contains measures as given here const MEASURE = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  async validateCellMeasuresUnits() {
    const numberOfCells = await this.getRepoSizeColumnCellCount();
    // Check if inner text of each element contains any valid measure
    for (let i = 0; i < numberOfCells; i++) {
      const cellLocator = await this.columnCellLocator.nth(i);
      const innerText = await cellLocator.innerText();
      const innerTextMeasure = innerText.split(" ")[1];
      await expect(measureValues).toContain(innerTextMeasure);
    }
  }

  // takes in a set of test data and validates the correct size for the specified file
  async validateFileSize(
    testData: {
      file: string;
      size: string;
    }[]
  ) {
    for (const record of testData) {
      const locator = await this.page.locator(
        `[data-testid="${record.file}-github-repo-size-cell"]`
      );
      await locator.dblclick(); //precondition to make it visible in the dom (if in isolation)
      const innerText = await locator.innerText();
      await expect(innerText).toEqual(record.size);
    }
  }
}
