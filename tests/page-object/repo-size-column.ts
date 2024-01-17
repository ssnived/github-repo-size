//page object model for the additional repo size column

import { expect, test } from "../fixtures/fixtures";
import * as dotenv from "dotenv";
import { MEASURE } from "../utils/options";
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
      console.log(numberOfCells);
      if (numberOfCells == 0) {
        throw new Error("No repo size column found");
      }

      for (let i = 0; i < numberOfCells; i++) {
        const cellLocator = await this.columnCellLocator.nth(i);
        await cellLocator.click();
        await expect(cellLocator).toBeVisible();
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  //   return cells;
  // }

  //   return locators;
  // }

  //validates the column in visible
  // async columnExists() {
  //   const elements = await this.getRepoSizeColumn();
  //   await Promise.all(
  //     elements.map(async (element) => {
  //       console.log(`Checking visibility of element: ${element}`);
  //       // await element.dblclick({ force: true }); //pre conditioning for the value to appear
  //       await expect(element).toBeVisible();
  //     })
  //   );
}

//validates the cells contains measures as given here const MEASURE = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
//   async validateCellMeasures() {
//     const elements = await this.getRepoSizeColumn();
//     // Check if inner text of each element contains any valid measure
//     await Promise.all(
//       elements.map(async (element) => {
//         await element.dblclick(); //pre conditioning for the value to appear

//         const innerText = await element.innerText();
//         const innerTextMeasure = innerText.split(" ")[1];
//         await expect(MEASURE).toContain(innerTextMeasure);
//       })
//     );
//   }
// }
