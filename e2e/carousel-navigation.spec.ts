import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * Slider navigation contract (RTL):
 *   Previous (قبلی)  = inline-start (right) => Embla scrollPrev, arrow points right
 *   Next (بعدی)      = inline-end (left)    => Embla scrollNext, arrow points left
 *
 * Those two buttons are the whole visible navigation — no dots, counter or play
 * button. The track never loops, so the first and last slide are real edges, and on
 * phones the active slide is centred to within a pixel on every snap.
 */

const carousel = (page: Page, name: string) => page.getByRole("region", { name, exact: true });

const regions = {
  testimonials: (page: Page) => carousel(page, "از زبان کسانی که مسیر را آمده‌اند"),
  articles: (page: Page) => carousel(page, "خواندنی‌های کوتاه برای روزهای سخت"),
  workshops: (page: Page) => carousel(page, "یادگیری گروهی، در فضایی امن"),
};

/**
 * Embla's own selected snap (mirrored on the root as `data-active-slide`), plus how
 * far that slide's centre sits from the viewport centre. On phones the offset must be
 * zero; on wider screens several cards share the row and the offset is the half-width
 * of the visible run, which is expected.
 */
async function activeSlide(region: Locator): Promise<{ index: number; offset: number; total: number }> {
  return region.evaluate((root) => {
    const viewport = root.querySelector(".slider-viewport")!.getBoundingClientRect();
    const centre = viewport.x + viewport.width / 2;
    const index = Number(root.getAttribute("data-active-slide") ?? 0);
    const slides = [...root.querySelectorAll(".slider-slide")];
    const box = slides[index]?.getBoundingClientRect();
    return {
      index,
      offset: box ? box.x + box.width / 2 - centre : Number.NaN,
      total: Number(root.getAttribute("data-slide-count") ?? slides.length),
    };
  });
}

const controls = (region: Locator) => region.locator(".slider-controls button");

test.describe("Home sliders — RTL navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("only previous and next controls exist", async ({ page }) => {
    const region = regions.testimonials(page);
    await expect(region).toBeVisible();

    await expect(controls(region)).toHaveCount(2);
    await expect(region.getByRole("button", { name: "قبلی" })).toBeVisible();
    await expect(region.getByRole("button", { name: "بعدی" })).toBeVisible();

    // No dots, no counter and no rotation button.
    await expect(region.getByRole("group", { name: "انتخاب اسلاید" })).toHaveCount(0);
    await expect(region.locator(".slider-counter")).toHaveCount(0);
    await expect(region.getByRole("button", { name: /پخش خودکار|توقف پخش/ })).toHaveCount(0);
  });

  test("testimonials: real edges, disabled states and APG roles", async ({ page }) => {
    const region = regions.testimonials(page);
    await expect(region).toHaveAttribute("aria-roledescription", "carousel");

    const prev = region.getByRole("button", { name: "قبلی" });
    const next = region.getByRole("button", { name: "بعدی" });

    // Icons: Previous points inline-start (right), Next points inline-end (left).
    await expect(prev.locator("svg.lucide-arrow-left")).toBeVisible();
    await expect(next.locator("svg.lucide-arrow-right")).toBeVisible();

    // No loop: the row opens on slide 1 with Previous disabled.
    expect((await activeSlide(region)).index).toBe(0);
    await expect(prev).toBeDisabled();

    await next.click();
    await expect.poll(async () => (await activeSlide(region)).index).toBe(1);
    await expect(prev).toBeEnabled();

    await prev.click();
    await expect.poll(async () => (await activeSlide(region)).index).toBe(0);

    // Walk to the last slide: Next disables, Previous stays live.
    const total = (await activeSlide(region)).total;
    for (let index = 0; index < total - 1; index += 1) {
      if (await next.isDisabled()) break;
      await next.click();
      await page.waitForTimeout(250);
    }
    await expect.poll(async () => (await activeSlide(region)).index).toBe(total - 1);
    await expect(next).toBeDisabled();
    await expect(prev).toBeEnabled();

    // APG: each slide is a labelled group.
    const slide = region.getByRole("group", { name: /^۱ از/ }).first();
    await expect(slide).toHaveAttribute("aria-roledescription", "slide");
  });

  test("autoplay advances the row and focus pauses it", async ({ page }) => {
    const region = regions.articles(page);
    await region.scrollIntoViewIfNeeded();
    await page.mouse.move(4, 4);

    const start = (await activeSlide(region)).index;
    // Autoplay delay is 5s; give it one full cycle plus the snap animation.
    await expect
      .poll(async () => (await activeSlide(region)).index, { timeout: 9_000 })
      .toBeGreaterThan(start);

    // Focusing inside the carousel stops the rotation (WCAG 2.2.2 without a button).
    await region.getByRole("button", { name: "بعدی" }).focus();
    const paused = (await activeSlide(region)).index;
    await page.waitForTimeout(6_000);
    expect((await activeSlide(region)).index).toBe(paused);
  });

  test("mobile: every snap is horizontally centred", async ({ page }) => {
    // Reduced motion stops autoplay, so the snaps only move when we ask them to.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    const region = regions.testimonials(page);
    await region.scrollIntoViewIfNeeded();
    await region.hover();

    const { total } = await activeSlide(region);
    const next = region.getByRole("button", { name: "بعدی" });

    for (let index = 0; index < total; index += 1) {
      // Wait for this snap to settle, then assert both facts at once: the row is on
      // the expected slide *and* that slide is on the viewport's centre line.
      await expect
        .poll(async () => {
          const state = await activeSlide(region);
          return state.index === index && Math.abs(state.offset) <= 1.5;
        })
        .toBe(true);
      if (index < total - 1) await next.click();
    }
  });

  test("keyboard, touch targets and 320px layout", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    const region = regions.testimonials(page);
    await expect(region).toBeVisible();

    // No horizontal page overflow at 320px.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    // 44×44 touch targets.
    const next = region.getByRole("button", { name: "بعدی" });
    const box = await next.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);

    // ArrowLeft moves forward in RTL while focus is inside the slider.
    await next.focus();
    await page.keyboard.press("ArrowLeft");
    await expect.poll(async () => (await activeSlide(region)).index).toBe(1);
  });

  test("mobile swipe advances one slide", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const region = regions.testimonials(page);
    await expect(region).toBeVisible();
    await region.scrollIntoViewIfNeeded();
    const viewport = region.locator(".slider-viewport").first();
    const box = await viewport.boundingBox();
    if (!box) throw new Error("viewport not measured");

    const y = box.y + box.height / 2;
    // RTL: pulling the track from the inline-start side to the right reveals
    // the next slide (later slides live on the left in an RTL track).
    await page.mouse.move(box.x + 40, y);
    await page.mouse.down();
    for (let step = 1; step <= 24; step += 1) {
      await page.mouse.move(box.x + 40 + ((box.width - 80) * step) / 24, y);
      await page.waitForTimeout(16);
    }
    await page.mouse.up();

    await expect.poll(async () => (await activeSlide(region)).index).toBe(1);
    await expect
      .poll(async () => Math.abs((await activeSlide(region)).offset))
      .toBeLessThanOrEqual(1.5);

    // The opposite drag goes back to the first slide.
    await page.mouse.move(box.x + box.width - 40, y);
    await page.mouse.down();
    for (let step = 1; step <= 24; step += 1) {
      await page.mouse.move(box.x + box.width - 40 - ((box.width - 80) * step) / 24, y);
      await page.waitForTimeout(16);
    }
    await page.mouse.up();

    await expect.poll(async () => (await activeSlide(region)).index).toBe(0);
  });
});
