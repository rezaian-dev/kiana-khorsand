import { expect, test as setup } from "@playwright/test";
import { ADMIN_STATE, adminPassword, adminPhone } from "./credentials";

/**
 * Sign in once and reuse the cookie jar for every panel test. The sign-in throttle is
 * per phone, so a shared session keeps the suite fast and well inside its budget.
 */
setup("admin session", async ({ page }) => {
  await page.goto("/admin/login");
  await page.locator("#admin-phone").fill(adminPhone);
  await page.locator("#admin-password").fill(adminPassword);
  await page.getByRole("button", { name: "ورود به پنل مدیریت" }).click();
  await page.waitForURL("**/admin");
  await expect(
    page.getByRole("link", { name: /مدیریت کاربران/ }),
  ).toBeVisible();
  await page.context().storageState({ path: ADMIN_STATE });
});
