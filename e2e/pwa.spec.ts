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
