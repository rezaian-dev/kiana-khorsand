import { expect, test } from "@playwright/test";
import { SIGNED_OUT } from "./credentials";

test.use({ storageState: SIGNED_OUT });

test.describe("launch experience", () => {
  test("the launch screen exists on every page but stays out of a browser tab", async ({
    page,
  }) => {
    await page.goto("/");
    // Server-rendered, so it is in the very first HTML byte — that is the whole
    // point of a launch screen.
    await expect(page.locator("#boot-splash")).toHaveCount(1);
    await expect(page.locator("#boot-splash")).toBeHidden();
    await expect(page.locator("#boot-splash")).toContainText("کیانا خرسند");
  });

  test("the launch screen releases itself once the app is ready", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForFunction(
      () => document.documentElement.dataset.splash === "done",
      undefined,
      { timeout: 5000 },
    );
  });
});

test.describe("field focus", () => {
  test("every field turns into glass when it takes focus", async ({ page }) => {
    await page.goto("/login");
    for (const id of ["#auth-phone", "#auth-password"]) {
      const field = page.locator(id);
      await field.focus();
      const read = () =>
        field.evaluate((el) => {
          const cs = getComputedStyle(el);
          return {
            shadow: cs.boxShadow,
            blur: cs.backdropFilter,
            transition: cs.transitionProperty,
          };
        });

      // The page may autofocus the first field; start from a clean, unfocused plate.
      await page.evaluate(() =>
        (document.activeElement as HTMLElement | null)?.blur?.(),
      );
      await page.waitForTimeout(120);
      const resting = await read();
      await field.focus();
      await page.waitForTimeout(450); // the glass settles
      const focused = await read();

      // Focus must visibly change the plate, not just tint the border.
      expect(focused.shadow).not.toBe(resting.shadow);
      expect(focused.shadow).toContain("px");
      // A blurred, translucent pane — the "glass" part of the request.
      expect(focused.blur).toContain("blur");
      expect(focused.blur).not.toBe("none");
      expect(focused.transition).toContain("box-shadow");
    }
  });

  test("the admin entrance uses the same glass, in its own accent", async ({
    page,
  }) => {
    await page.goto("/admin/login");
    const field = page.locator("#admin-phone");
    await field.focus();
    const blur = await field.evaluate(
      (el) => getComputedStyle(el).backdropFilter,
    );
    expect(blur).toContain("blur");
  });
});
