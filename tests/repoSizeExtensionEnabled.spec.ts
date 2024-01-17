import { test, expect } from "./fixtures/fixtures";
import { repoSizeColumnPage } from "./page-object/repo-size-column";
import { fileSizeTestDataSample } from "./utils/options";
//this test suite checks that he extension is enabled and we have values (for generic use)
test.describe("Extension Enabled: Repo Size Extension Validation", () => {
  test("Validate the column exists and is visible with appropriate MEASURE's in the DOM", async ({
    page,
  }) => {
    const repoSizeColumn = new repoSizeColumnPage(page);
    await page.goto(repoSizeColumn.pageURL);

    await page.waitForSelector('[data-testid*="github-repo-size-cell"]'); //allows the extension to be fully loaded

    await expect(await repoSizeColumn.validateCellsAreVisible()).toBe(true);
    await repoSizeColumn.validateCellMeasuresUnits();
  });
});

//this test suite can be used to accurately check whether the size value correcly corresponds with the correct file/folder (allows for more specific validations)
//NOTE: this will not work unless you know the exact files and sizes you wish to test and pass those through
test.describe("Extension Enabled: File Size Validation", () => {
  test(" File sizes appear correctly and accurately for each file", async ({
    page,
  }) => {
    const repoSizeColumn = new repoSizeColumnPage(page);
    await page.goto(repoSizeColumn.pageURL);

    await page.waitForSelector('[data-testid*="github-repo-size-cell"]'); //allows the extension to be fully loaded

    await expect(await repoSizeColumn.validateCellsAreVisible()).toBe(true);

    await repoSizeColumn.validateFileSize(fileSizeTestDataSample);
  });
});
