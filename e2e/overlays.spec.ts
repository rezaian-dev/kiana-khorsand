import { devices, expect, test } from "./test";
import { SIGNED_OUT } from "./credentials";

test.use({ storageState: SIGNED_OUT });

/**
 * Regression suite for dismissible overlays. Every Radix overlay (select, sheet,
 * dropdown, alert dialog) must be closable by a second press on its trigger, by a
 * press outside and by Escape — this is the class of bug that made a shadcn Select
 * look impossible to close on touch devices.
 */

const content = '[data-slot="select-content"]';

test.describe("shadcn Select", () => {
  test("a second press on the open trigger closes the list", async ({
    page,
  }) => {
    await page.goto("/contact");
    const trigger = page.locator('[data-slot="select-trigger"]').first();
    await trigger.scrollIntoViewIfNeeded();
    const box = (await trigger.boundingBox())!;

    await trigger.click();
    await expect(page.locator(content)).toHaveCount(1);
    await expect(trigger).toHaveAttribute("data-state", "open");

    // Pressing the trigger again must dismiss, not re-open (the ghost-click path).
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(page.locator(content)).toHaveCount(0);
    await expect(trigger).toHaveAttribute("data-state", "closed");
  });

  test("touch: tap trigger twice, press outside, and Escape all close it", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      ...devices["Pixel 7"],
      locale: "fa-IR",
      storageState: SIGNED_OUT,
    });
    const page = await context.newPage();
    await page.goto("/contact");
    const trigger = page.locator('[data-slot="select-trigger"]').first();
    await trigger.scrollIntoViewIfNeeded();
    const box = (await trigger.boundingBox())!;
    const centre = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    await trigger.tap();
    await expect(page.locator(content)).toHaveCount(1);
    await page.touchscreen.tap(centre.x, centre.y);
    await expect(page.locator(content)).toHaveCount(0);

    await trigger.tap();
    await expect(page.locator(content)).toHaveCount(1);
    await page.touchscreen.tap(6, 120);
    await expect(page.locator(content)).toHaveCount(0);

    await trigger.tap();
    await expect(page.locator(content)).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(page.locator(content)).toHaveCount(0);

    await context.close();
  });

  test("picking an option writes the value and closes", async ({ page }) => {
    await page.goto("/contact");
    const trigger = page.locator("#contact-subject");
    await trigger.click();
    await page.locator('[data-slot="select-item"]').nth(1).click();
    await expect(page.locator(content)).toHaveCount(0);
    // The value reaches the form through the hidden input, not Radix's own select.
    await expect(page.locator('form input[name="subject"]')).toHaveValue(
      "booking",
    );
  });

  test("a required Select reports itself instead of failing silently", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.locator("#contact-name").fill("کاربر آزمایشی");
    await page.locator("#contact-phone").fill("09121234567");
    await page
      .locator("#contact-message")
      .fill("سلام، این یک پیام آزمایشی برای بررسی اعتبارسنجی فرم است.");
    await page.locator("#contact-consent").check();

    await page.getByRole("button", { name: /ارسال پیام/ }).click();

    const trigger = page.locator("#contact-subject");
    await expect(trigger).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#contact-subject-error")).toBeVisible();
    await expect(trigger).toBeFocused();
    // Nothing was sent while the select was empty.
    await expect(page).toHaveURL(/\/contact$/);

    // Choosing a value clears the error state.
    await trigger.click();
    await page.locator('[data-slot="select-item"]').first().click();
    await expect(trigger).not.toHaveAttribute("aria-invalid", "true");
  });
});
