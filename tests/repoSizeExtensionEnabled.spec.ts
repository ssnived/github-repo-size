import { test, expect } from "./fixtures/fixtures";
import { repoSizeColumnPage } from "./page-object/repo-size-column";

test.describe("Extension Enabled: Repo size column tests", () => {
  test("Extension Enabled: Validate the column exists and is visible with appropriate MEASURE's in the DOM", async ({
    page,
  }) => {
    const repoSizeColumn = new repoSizeColumnPage(page);
    await page.goto(repoSizeColumn.pageURL);

    await page.waitForSelector('[data-testid*="github-repo-size-cell"]'); //allows the extension to be fully loaded

    await expect(await repoSizeColumn.validateCellsAreVisible()).toBe(true);
    await repoSizeColumn.validateCellMeasures();
  });
});
