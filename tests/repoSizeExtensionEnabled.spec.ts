import { test, expect } from "./fixtures/fixtures";
import { repoSizeColumnPage } from "./page-object/repo-size-column";

test.describe("Extension Enabled: Repo size column tests", () => {
  test.only("Extension Enabled: Validate the column exists and is visible with appropriate MEASURE's in the DOM", async ({
    page,
  }) => {
    const repoSizeColumn = new repoSizeColumnPage(page);
    await page.goto(repoSizeColumn.pageURL);
    await page.waitForSelector('[data-testid*="github-repo-size-cell"]');

    await expect(await repoSizeColumn.validateCellsAreVisible()).toBe(true);

    // const numberOfCells = await page
    //   .locator('[data-testid*="github-repo-size-cell"]')
    //   .count();

    // const cellLocator = await page.locator(
    //   '[data-testid*="github-repo-size-cell"]'
    // );
    // for (let i = 0; i < numberOfCells; i++) {
    //   await expect(cellLocator.nth(i)).toBeVisible();
    // }

    // console.log(elementHandles);

    // elementHandles(async (elementHandle) => {
    //   await expect(elementHandle).toBeVisible();
    // });

    // await expect(testCell).toBeVisible();

    // for (const row of await page
    //   .locator('[data-testid*="github-repo-size-cell"]')
    //   .locator("span")
    //   .all()) {
    //   console.log(await row.textContent());
    // }

    // const elements = await repoSizeColumn.getRepoSizeColumn();
    // console.log(elements);

    // Expect the element to be visible
    // await expect(elements);

    // // await expect(elements).toBeVisible();
    // await elements.map(async (element) => {
    //   await console.log(`Checking visibility of element: ${element}`);
    //   await element.dblclick(); //pre conditioning for the value to appear
    //   await expect(element).toBeVisible();
    // });

    // //validate
    // await expect(repoSizeColumn.columnExists()).not.toBeNull();
    // await expect(repoSizeColumn.validateCellMeasures()).not.toBeNull();
  });

  // test("Extension Enabled: Validate the column doesnt exist and is not visible in the DOM", async ({
  //   contextWithoutExtension,
  // }) => {
  //   const repoSizeColumn = new repoSizeColumnPage(page);
  //   await page.goto(repoSizeColumn.pageURL);

  //   await expect(await repoSizeColumn.columnExists(true)).toBe(true);
  // });
  // test("get started link", async ({ page }) => {
  //   await page.goto("https://playwright.dev/");

  //   // Click the get started link.
  //   await page.getByRole("link", { name: "Get started" }).click();

  //   // Expects page to have a heading with the name of Installation.
  //   await expect(
  //     page.getByRole("heading", { name: "Installation" })
  //   ).toBeVisible();
  // });
});
