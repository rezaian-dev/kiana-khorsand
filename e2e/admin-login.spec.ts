import { expect, test, type Page } from "@playwright/test";
import { SIGNED_OUT } from "./credentials";

/**
 * The administrator entrance, and the way into it from an installed app.
 *
 * The page sits outside the public shell, so it carries its own accent tokens; when
 * those were missing the submit button rendered as an invisible box. These tests pin
 * what a person can actually see and press.
 */
/** These pages are the signed-out entrance: never inherit the panel's cookie jar. */
test.use({ storageState: SIGNED_OUT });

const PASSWORD = "wrong-password-9f2";

/** Pretends the page is running as an installed app (no browser chrome). */
async function asInstalledApp(page: Page) {
  await page.addInitScript(() => {
    const original = window.matchMedia.bind(window);
    window.matchMedia = (query: string) => {
      const media = original(query);
      if (query !== "(display-mode: standalone)") return media;
      return new Proxy(media, {
        get: (target, key) =>
          key === "matches"
            ? true
            : typeof target[key as keyof MediaQueryList] === "function"
              ? (target[key as keyof MediaQueryList] as () => unknown).bind(
                  target,
                )
              : target[key as keyof MediaQueryList],
      });
    };
  });
}

/** Simulates the browser's install offer and records whether `prompt()` ran. */
async function withInstallOffer(page: Page) {
  await page.addInitScript(() => {
    const fire = () => {
      const event = new Event("beforeinstallprompt", {
        cancelable: true,
      }) as Event & {
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: string }>;
      };
      event.prompt = async () => {
        (window as unknown as { prompted?: boolean }).prompted = true;
      };
      event.userChoice = Promise.resolve({ outcome: "dismissed" });
      window.dispatchEvent(event);
    };
    (window as unknown as { fireInstall?: () => void }).fireInstall = fire;
  });
}

test.describe("administrator entrance", () => {
  test("fields sit on a glass plate and answer focus with a soft halo", async ({
    page,
  }) => {
    await page.goto("/admin/login");
    const phone = page.locator("#admin-phone");
    const password = page.locator("#admin-password");
    await expect(phone).toBeVisible();
    await expect(password).toBeVisible();

    const rest = await phone.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        shadow: style.boxShadow,
        border: style.borderTopColor,
        blur: style.backdropFilter,
        radius: style.borderRadius,
      };
    });
    // Glass: a translucent fill over a blurred backdrop, with a hairline at rest.
    expect(rest.blur).toContain("blur");
    expect(rest.radius).not.toBe("0px");
    expect(rest.shadow).not.toBe("none");

    await phone.evaluate((el) => (el as HTMLElement).blur());
    await page.waitForTimeout(120);
    const resting = await phone.evaluate((el) => {
      const style = getComputedStyle(el);
      return { shadow: style.boxShadow, border: style.borderTopColor };
    });

    await phone.focus();
    await page.waitForTimeout(450);
    const focused = await phone.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        shadow: style.boxShadow,
        border: style.borderTopColor,
        blur: style.backdropFilter,
      };
    });

    // Focus must change more than the border: a hairline ring, a wide halo, a lift.
    expect(focused.shadow).not.toBe(resting.shadow);
    expect(focused.border).not.toBe(resting.border);
    expect(focused.shadow).toMatch(/0px 0px 0px 1px/);
    expect(focused.shadow).toMatch(/0px 0px 0px 7px/);
    expect(focused.shadow).toMatch(/inset/);
    // The pane gets more glassy, not less.
    expect(focused.blur).toContain("blur");
  });

  test("the submit button is visible, sized and named", async ({ page }) => {
    await page.goto("/admin/login");
    const submit = page.getByRole("button", { name: "ورود به پنل مدیریت" });
    await expect(submit).toBeVisible();

    const box = await submit.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

    const painted = await submit.evaluate((el) => {
      const style = getComputedStyle(el);
      return { background: style.backgroundImage, color: style.color };
    });
    // A background *and* a readable foreground — this is what silently broke before.
    expect(painted.background).toContain("gradient");
    expect(painted.background).not.toContain("rgba(0, 0, 0, 0)");
    expect(painted.color).toBe("rgb(255, 255, 255)");
  });

  test("a wrong password reports itself without leaving the page", async ({
    page,
  }) => {
    await page.goto("/admin/login");
    await page.locator("#admin-phone").fill("09120000000");
    await page.locator("#admin-password").fill(PASSWORD);
    await page.getByRole("button", { name: "ورود به پنل مدیریت" }).click();

    await expect(page.getByRole("alert")).toBeVisible();
    expect(new URL(page.url()).pathname).toBe("/admin/login");
  });
});

test.describe("installed app", () => {
  test("the address command opens /admin when no address bar exists", async ({
    page,
  }) => {
    await asInstalledApp(page);
    await page.goto("/");

    // In a browser tab this button is absent on purpose.
    await expect(
      page.getByRole("button", { name: "رفتن به آدرس" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "رفتن به آدرس" }).click();

    const field = page.getByRole("textbox", { name: "مسیر داخلی" });
    await expect(field).toBeVisible();
    await field.fill("/admin");
    await field.press("Enter");

    await page.waitForURL("**/admin/login");
    await expect(page.locator("#admin-phone")).toBeVisible();
  });

  test("a pasted full URL of this site also lands on the panel", async ({
    page,
  }) => {
    await asInstalledApp(page);
    await page.goto("/");
    await page.getByRole("button", { name: "رفتن به آدرس" }).click();

    const field = page.getByRole("textbox", { name: "مسیر داخلی" });
    await field.fill(new URL("/admin", page.url()).toString());
    await field.press("Enter");

    await page.waitForURL("**/admin/login");
  });

  test("the command refuses anything outside this site", async ({ page }) => {
    await asInstalledApp(page);
    await page.goto("/");
    await page.getByRole("button", { name: "رفتن به آدرس" }).click();

    const field = page.getByRole("textbox", { name: "مسیر داخلی" });
    await field.fill("https://example.com/phish");
    await field.press("Enter");

    await expect(page.getByRole("alert")).toBeVisible();
    await expect(field).toBeVisible(); // still here: nothing was navigated
    expect(new URL(page.url()).hostname).not.toContain("example.com");
  });

  test("offline, the panel shows the offline page instead of a browser error", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    // A fresh worker installs on this visit; the reload puts the page under its control.
    await page.evaluate(async () => {
      await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
    });
    await page.reload({ waitUntil: "networkidle" });
    await expect
      .poll(
        () => page.evaluate(() => Boolean(navigator.serviceWorker.controller)),
        {
          timeout: 15_000,
        },
      )
      .toBe(true);

    await context.setOffline(true);
    await page.goto("/admin/login").catch(() => {});

    // Private routes are never cached, but they must fail into our page, not the browser's.
    await expect(
      page.getByRole("heading", { name: "شما آفلاین هستید" }),
    ).toBeVisible({
      timeout: 10_000,
    });
    await context.setOffline(false);
  });

  test("a browser tab never grows an address command", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "رفتن به آدرس" }),
    ).toHaveCount(0);
  });

  test("closing the address sheet returns focus to the button that opened it", async ({
    page,
  }) => {
    await asInstalledApp(page);
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "رفتن به آدرس" });
    await trigger.click();
    await expect(
      page.getByRole("textbox", { name: "مسیر داخلی" }),
    ).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(page.locator('[data-slot="sheet-content"]')).toHaveCount(0);
    // Without this the keyboard user is dropped on <body> and must tab from the top.
    await expect(trigger).toBeFocused();
  });

  test("the installed header still fits 320px and keeps 44px targets", async ({
    page,
  }) => {
    await asInstalledApp(page);
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/");

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);

    const targets = page.locator('header button[aria-label="رفتن به آدرس"]');
    await expect(targets).toBeVisible();
    const box = await targets.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });

  test("install is offered only while the browser offers it, and stays dismissed", async ({
    page,
  }) => {
    await withInstallOffer(page);
    await page.goto("/");
    const install = page.getByRole("button", { name: "نصب اپ" });

    // Nothing is promised before the browser actually offers an install.
    await expect(install).toHaveCount(0);
    // Hydration may still be settling; keep offering until the listener is live.
    await expect
      .poll(
        async () => {
          await page.evaluate(() =>
            (window as unknown as { fireInstall: () => void }).fireInstall(),
          );
          return install.count();
        },
        { timeout: 10_000 },
      )
      .toBe(1);

    await install.click();
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as unknown as { prompted?: boolean }).prompted === true,
        ),
      )
      .toBe(true);

    // Dismissing hides it, and the choice survives another offer and a reload.
    await page.evaluate(() =>
      (window as unknown as { fireInstall: () => void }).fireInstall(),
    );
    await page.getByRole("button", { name: "بستن پیشنهاد نصب" }).click();
    await page.reload();
    await page.evaluate(() =>
      (window as unknown as { fireInstall: () => void }).fireInstall(),
    );
    await expect(install).toHaveCount(0);
  });

  test("an installed app offers the address command instead of install", async ({
    page,
  }) => {
    await asInstalledApp(page);
    await withInstallOffer(page);
    await page.goto("/");
    await page.evaluate(() =>
      (window as unknown as { fireInstall: () => void }).fireInstall(),
    );

    await expect(page.getByRole("button", { name: "نصب اپ" })).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "رفتن به آدرس" }),
    ).toBeVisible();
  });
});
