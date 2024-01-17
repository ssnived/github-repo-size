import { test, expect } from "./fixtures/fixtures";
import { repoSizeColumnPage } from "./page-object/repo-size-column";

//this test suite validates we do not have the additional column when we do not load the extension
test.describe("Extension Disabled: Repo size column tests", () => {
  test("Extension Disabled: Validate the column doesnt exist and is not visible in the DOM", async ({
    contextWithoutExtension,
  }) => {
    const page = await contextWithoutExtension.newPage();
    const repoSizeColumn = new repoSizeColumnPage(page);
    await page.goto(repoSizeColumn.pageURL, { waitUntil: "load" }); //provide necessary time for the extension to have loaded if it existed

    await expect(await repoSizeColumn.validateCellsAreVisible()).toBe(false);
  });
});
