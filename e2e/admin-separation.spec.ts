import { expect, test } from "@playwright/test";

const adminPhone = process.env.SEED_ADMIN_PHONE!;
const adminPassword = process.env.SEED_ADMIN_PASSWORD!;

test.describe("admin / user separation", () => {
  test("normal login sends the admin to a plain customer dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.locator("#auth-phone").fill(adminPhone);
    await page.locator("#auth-password").fill(adminPassword);
    await page.getByRole("button", { name: "ورود به حساب کاربری" }).click();
    await page.waitForURL("**/dashboard");

    await page.goto("/dashboard/settings");
    await expect(page.getByRole("heading", { name: "پروفایل من" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "اطلاعات حساب" })).toBeVisible();

    await page.getByRole("button", { name: /منوی حساب کاربری/ }).click();
    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("menuitem", { name: "پیشخوان" })).toBeVisible();
    await expect(
      menu.getByRole("menuitem", { name: "حساب کاربری من" }),
    ).toBeVisible();
    await expect(menu).not.toContainText("پنل مدیریت");
    await expect(menu).not.toContainText("مدیریت سایت");
  });

  test("admin panel opens from the typed URL and lists users", async ({ page }) => {
    await page.goto("/admin/login");
    await page.locator("#admin-phone").fill(adminPhone);
    await page.locator("#admin-password").fill(adminPassword);
    await page.getByRole("button", { name: "ورود به پنل مدیریت" }).click();
    await page.waitForURL("**/admin");

    await page.goto("/admin/users");
    await expect(page.getByRole("heading", { name: "مدیریت کاربران" })).toBeVisible();
    await expect(page.getByRole("button", { name: "ارتقا به مدیر" }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "حذف حساب" }).first()).toBeVisible();
  });

  test("admin login rejects a customer account", async ({ page }) => {
    await page.goto("/admin/login");
    await page.locator("#admin-phone").fill(process.env.SEED_CLIENT_PHONE!);
    await page.locator("#admin-password").fill(process.env.SEED_CLIENT_PASSWORD!);
    await page.getByRole("button", { name: "ورود به پنل مدیریت" }).click();
    await expect(page.getByRole("alert").first()).toContainText(
      "دسترسی مدیریت ندارد",
    );
  });
});
