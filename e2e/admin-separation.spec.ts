import { expect, test } from "./test";
import { SIGNED_OUT, clientPassword, clientPhone } from "./credentials";

test.describe("signed-in administrator", () => {
  test("typed URL opens the panel and lists users", async ({ page }) => {
    await page.goto("/admin/users");
    await expect(
      page.getByRole("heading", { name: "مدیریت کاربران" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "حذف حساب" }).first(),
    ).toBeVisible();
  });

  test("the account menu offers no admin destination", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await expect(
      page.getByRole("heading", { name: "پروفایل من" }),
    ).toBeVisible();
    await page.getByRole("button", { name: /منوی حساب کاربری/ }).click();
    const menu = page.getByRole("menu");
    await expect(menu.getByRole("menuitem", { name: "پیشخوان" })).toBeVisible();
    await expect(menu).not.toContainText("پنل مدیریت");
  });
});

test.describe("signed out", () => {
  test.use({ storageState: SIGNED_OUT });

  test("the public form signs an administrator in as a customer", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.locator("#auth-phone").fill(process.env.SEED_ADMIN_PHONE ?? "");
    await page
      .locator("#auth-password")
      .fill(process.env.SEED_ADMIN_PASSWORD ?? "");
    await page.getByRole("button", { name: "ورود به حساب کاربری" }).click();
    await page.waitForURL("**/dashboard");
    // The customer dashboard greets the same person — no admin badge, no panel link.
    await expect(page.getByRole("heading", { name: /^سلام/ })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /مدیریت کاربران/ }),
    ).toHaveCount(0);
  });

  test("the panel rejects a customer account", async ({ page }) => {
    await page.goto("/admin/login");
    await page.locator("#admin-phone").fill(clientPhone);
    await page.locator("#admin-password").fill(clientPassword);
    await page.getByRole("button", { name: "ورود به پنل مدیریت" }).click();
    await expect(page.getByRole("alert").first()).toContainText(
      "دسترسی مدیریت ندارد",
    );
  });

  test("signing out of the panel returns to the admin entrance", async ({
    page,
  }) => {
    await page.goto("/admin/login");
    await page.locator("#admin-phone").fill(process.env.SEED_ADMIN_PHONE ?? "");
    await page
      .locator("#admin-password")
      .fill(process.env.SEED_ADMIN_PASSWORD ?? "");
    await page.getByRole("button", { name: "ورود به پنل مدیریت" }).click();
    await page.waitForURL("**/admin");
    await page.getByRole("button", { name: "خروج از حساب" }).first().click();
    await page.waitForURL("**/admin/login");
  });

  test("an anonymous visitor is sent to the admin entrance", async ({
    page,
  }) => {
    await page.goto("/admin/users");
    await page.waitForURL("**/admin/login");
  });
});
