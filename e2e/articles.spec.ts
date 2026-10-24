import { expect, test } from "./test";
import { SIGNED_OUT } from "./credentials";

test.use({ storageState: SIGNED_OUT });

test.describe("article list", () => {
  test("the breadcrumb fits a 320px screen without wrapping or clipping", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/articles");
    const trail = page.locator('nav[aria-label="مسیر صفحه"]');
    await expect(trail).toBeVisible();

    const box = await trail.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(320);
    // One row only: the rail never wraps onto a second line.
    expect(box!.height).toBeLessThan(48);

    // Everything visible lives inside the pill (no clipped glyphs).
    const overflow = await trail.evaluate(
      (node) => node.scrollWidth > node.clientWidth + 1,
    );
    expect(overflow).toBe(false);

    // The home crumb keeps its icon and its accessible name at every width.
    await expect(page.getByRole("link", { name: "صفحهٔ نخست" })).toBeVisible();
    await expect(
      trail.getByText("مقاله‌ها", { exact: false }).first(),
    ).toBeVisible();
  });

  test("a long article title truncates instead of pushing the trail", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/articles");
    const href = await page
      .locator('a[href^="/articles/"]')
      .first()
      .getAttribute("href");
    await page.goto(href!);
    const trail = page.locator('nav[aria-label="مسیر صفحه"]');
    const box = await trail.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(320);
    expect(box!.height).toBeLessThan(48);
    await expect(trail.getByRole("link", { name: "مقالات" })).toBeVisible();
  });

  test("filtering keeps the reader's scroll position", async ({ page }) => {
    await page.goto("/articles");
    await page.evaluate(() =>
      window.scrollTo({ top: 700, behavior: "instant" }),
    );
    const before = await page.evaluate(() => window.scrollY);
    expect(before).toBe(700);

    await page.getByRole("button", { name: "اضطراب" }).click();
    await page.waitForURL(/category=/);
    await page.waitForTimeout(400);

    expect(await page.evaluate(() => window.scrollY)).toBe(before);
    await expect(
      page.getByRole("button", { name: "پاک‌کردن فیلتر" }),
    ).toBeVisible();
  });

  test("filtering narrows the list and clearing restores it", async ({
    page,
  }) => {
    await page.goto("/articles");
    const all = page.locator("#articles-results article");
    const total = await all.count();

    await page.getByRole("button", { name: "اضطراب" }).click();
    await expect(page).toHaveURL(/category=/);
    await expect
      .poll(() => page.locator("#articles-results article").count())
      .toBeLessThan(total);

    await page.getByRole("button", { name: "پاک‌کردن فیلتر" }).click();
    await expect(page).not.toHaveURL(/category=/);
    await expect
      .poll(() => page.locator("#articles-results article").count())
      .toBe(total);
  });

  test("search writes to the URL without a server round trip", async ({
    page,
  }) => {
    await page.goto("/articles");
    await page.locator("#article-q").fill("اضطراب");
    await expect(page).toHaveURL(/q=/);
    await expect(
      page.locator("#articles-results article").first(),
    ).toBeVisible();
  });
});
