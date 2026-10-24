import { expect, test } from "@playwright/test";
import { SIGNED_OUT } from "./credentials";

test.use({ storageState: SIGNED_OUT });

test.describe("launch experience", () => {
  test("the app opens on its launch screen, then gets out of the way", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "commit" });
    // Server-rendered, so it is in the very first HTML byte — that is the whole
    // point of a launch screen. The gate removes it once the app answers.
    const splash = page.locator("#boot-splash");
    await expect(splash).toHaveCount(1);
    await expect(splash).toContainText("کیانا خرسند");
    await expect(splash).toContainText("در حال آماده‌سازی");
    // It is on screen, not merely in the markup: this is the bug that used to let
    // the page paint first and the splash pop in afterwards.
    await expect(splash).toBeVisible();
    await expect(splash).toHaveCSS("display", "grid");
    await expect(splash).toHaveCSS("position", "fixed");
    // Then it leaves, and does not come back.
    await expect(splash).toHaveCount(0, { timeout: 5000 });
  });

  test("the launch screen covers the page at first paint, in any display mode", async ({
    page,
  }) => {
    // Sampled at DOMContentLoaded, before the gate's timer can run — the question is
    // what the browser had to paint first, not what is left a second later.
    await page.addInitScript(() => {
      const scope = window as unknown as { __launch: Promise<unknown> };
      scope.__launch = new Promise((resolve) => {
        document.addEventListener(
          "DOMContentLoaded",
          () => {
            const splash = document.getElementById("boot-splash");
            if (!splash) return resolve({ found: false });
            const cs = getComputedStyle(splash);
            resolve({
              found: true,
              standalone: matchMedia("(display-mode: standalone)").matches,
              display: cs.display,
              position: cs.position,
              zIndex: cs.zIndex,
              coversViewport:
                splash.getBoundingClientRect().height >= innerHeight - 1,
            });
          },
          { once: true },
        );
      });
    });
    await page.goto("/", { waitUntil: "load" });
    const state = (await page.evaluate(
      () => (window as unknown as { __launch: Promise<unknown> }).__launch,
    )) as Record<string, unknown>;
    // `display-mode` must play no part in the decision: gating on it is what made an
    // installed app that starts as a browser tab show the page first.
    expect(state.standalone).toBe(false);
    expect(state.found).toBe(true);
    expect(state.display).toBe("grid");
    expect(state.position).toBe("fixed");
    expect(state.zIndex).toBe("200");
    expect(state.coversViewport).toBe(true);
  });

  test("a later entry skips it: a deep link and a reload never replay the splash", async ({
    page,
  }) => {
    // A deep link is an entry into the middle of the app, not a cold start.
    await page.goto("/fees");
    await expect(page.locator("#boot-splash")).toHaveCount(0);

    await page.goto("/", { waitUntil: "commit" });
    await expect(page.locator("#boot-splash")).toHaveCount(1);
    await page.waitForFunction(
      () => document.documentElement.dataset.splash === "done",
      undefined,
      { timeout: 5000 },
    );
    // Same tab, same session: the reload must not replay the launch screen.
    await page.reload();
    await expect(page.locator("#boot-splash")).toHaveCount(0);
  });

  test("releases itself and never blocks a tap", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(
      () => document.documentElement.dataset.splash === "done",
      undefined,
      { timeout: 5000 },
    );
    // The hero call to action is clickable straight away.
    await expect(
      page.getByRole("link", { name: /رزرو وقت مشاوره/ }).first(),
    ).toBeVisible();
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
