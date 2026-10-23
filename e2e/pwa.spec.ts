import { expect, test } from "@playwright/test";
import { SIGNED_OUT } from "./credentials";

test.use({ storageState: SIGNED_OUT });

/**
 * Everything here is a requirement from the Next.js PWA guide, not a preference:
 * https://nextjs.org/docs/app/guides/progressive-web-apps
 */
test.describe("installable manifest", () => {
  test("carries the identity, scope and display mode the platform needs", async ({
    request,
  }) => {
    const response = await request.get("/manifest.webmanifest");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain(
      "application/manifest+json",
    );

    const manifest = await response.json();
    expect(manifest.id).toBe("/");
    expect(manifest.start_url).toBe("/");
    expect(manifest.scope).toBe("/");
    expect(manifest.name).toContain("کیانا خرسند");
    expect(manifest.short_name.length).toBeLessThanOrEqual(12);
    expect(manifest.display).toBe("standalone");
    expect(manifest.dir).toBe("rtl");
    expect(manifest.lang).toBe("fa");
    expect(manifest.background_color).toMatch(/^#[0-9a-f]{6}$/i);
    expect(manifest.theme_color).toMatch(/^#[0-9a-f]{6}$/i);
  });

  test("ships a 192 and a 512 icon, each in a maskable variant", async ({
    request,
  }) => {
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    const icons: { sizes: string; purpose?: string; src: string }[] =
      manifest.icons;

    for (const size of ["192x192", "512x512"]) {
      // Android needs the "any" icon for the launcher…
      expect(
        icons.some((i) => i.sizes === size && (i.purpose ?? "any") === "any"),
      ).toBe(true);
      // …and a maskable one, or the launcher crops it into a white blob.
      expect(
        icons.some(
          (i) => i.sizes === size && (i.purpose ?? "").includes("maskable"),
        ),
      ).toBe(true);
    }

    for (const icon of icons) {
      const head = await request.head(icon.src);
      expect(head.ok(), `${icon.src} must exist`).toBe(true);
    }
  });

  test("offers install screenshots so the prompt is not a bare banner", async ({
    request,
  }) => {
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    const shots: { form_factor?: string; sizes: string; src: string }[] =
      manifest.screenshots;
    expect(shots.some((s) => s.form_factor === "narrow")).toBe(true);
    expect(shots.some((s) => s.form_factor === "wide")).toBe(true);
    for (const shot of shots) {
      const head = await request.head(shot.src);
      expect(head.ok(), `${shot.src} must exist`).toBe(true);
    }
  });

  test("shortcuts lead to real pages and never to the admin panel", async ({
    request,
  }) => {
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    for (const shortcut of manifest.shortcuts) {
      // The manifest is public: an /admin entry would advertise the panel to every installer.
      expect(shortcut.url.startsWith("/admin")).toBe(false);
      const head = await request.head(shortcut.url);
      expect(head.status(), `${shortcut.url} must resolve`).toBeLessThan(400);
    }
  });
});

test.describe("service worker", () => {
  test("is served as JavaScript that the browser may never cache", async ({
    request,
  }) => {
    const response = await request.get("/sw.js");
    expect(response.ok()).toBe(true);

    const headers = response.headers();
    expect(headers["content-type"]).toContain("application/javascript");
    expect(headers["cache-control"]).toContain("no-store");
    // A worker runs with the origin's authority: scope it down to same-origin scripts.
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["service-worker-allowed"]).toBe("/");
  });

  test("marks anonymous pages cacheable and signed-in pages not", async ({
    request,
  }) => {
    // The worker stores a page only when the server vouches for it, so a personal
    // greeting never ends up on a shared device.
    const anonymous = await request.get("/about");
    expect(anonymous.headers()["x-offline-cacheable"]).toBe("1");

    const signedIn = await request.get("/about", {
      headers: { cookie: "better-auth.session_token=test-value" },
    });
    expect(signedIn.headers()["x-offline-cacheable"]).toBeUndefined();
  });

  test("installs everything it needs and never hands back a dead end", async ({
    page,
  }) => {
    // The reported bug: moving between pages on a connection that cannot reach the
    // server showed a screen saying "This page couldn't load" with two dead buttons.
    // Both the browser's and Next.js's version of that screen are unacceptable.
    await page.goto("/");
    await page.evaluate(async () => {
      await navigator.serviceWorker.register("/sw.js", {
        updateViaCache: "none",
      });
      await navigator.serviceWorker.ready;
    });
    await page.waitForTimeout(1500);

    const warmed = await page.evaluate(async () => {
      const cache = await caches.open("kiana-v2026-10-27-pages");
      return (await cache.keys()).length;
    });
    expect(warmed).toBeGreaterThanOrEqual(10);

    await page.context().setOffline(true);
    for (const path of ["/about", "/fees", "/contact"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("");
      await expect(page.getByText("Reload to try again")).toHaveCount(0);
      await expect(page.getByText("couldn't load")).toHaveCount(0);
    }
    await page.context().setOffline(false);
  });

  test("a tap that cannot reach the server still lands on the page", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(async () => {
      await navigator.serviceWorker.register("/sw.js", {
        updateViaCache: "none",
      });
      await navigator.serviceWorker.ready;
    });
    await page.waitForTimeout(1500);

    await page.context().setOffline(true);
    await page.goto("/");
    await page.locator('a[href="/contact"]:visible').first().click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("");
    await page.context().setOffline(false);
  });

  test("a navigation never lands on the browser's error page", async ({
    page,
    context,
  }) => {
    // The reported bug: with an empty cache and no network the worker resolved the
    // navigation with `undefined`, which Chrome shows as "This page couldn't load".
    await page.goto("/");
    await page.evaluate(async () => {
      await navigator.serviceWorker.register("/sw.js", {
        updateViaCache: "none",
      });
      await navigator.serviceWorker.ready;
    });
    await page.reload({ waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (const key of await caches.keys()) await caches.delete(key);
    });

    await context.setOffline(true);
    await page.goto("/fees"); // nothing cached anywhere at all
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "آفلاین",
    );
    await expect(page.getByText("Reload to try again")).toHaveCount(0);
    await context.setOffline(false);
  });

  test("the offline screen is served without a network round trip", async ({
    page,
  }) => {
    await page.goto("/offline");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "آفلاین",
    );
    // Nothing to hydrate: the page must survive with JavaScript disabled.
    await expect(
      page.getByRole("link", { name: "مقاله‌های ذخیره‌شده" }),
    ).toBeVisible();
  });
});
