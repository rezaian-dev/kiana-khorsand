import { test, expect, type Page } from "@playwright/test";

/**
 * Slider navigation contract (RTL):
 *   Previous (قبلی)  = inline-start (right) => Embla scrollPrev, arrow points right
 *   Next (بعدی)      = inline-end (left)    => Embla scrollNext, arrow points left
 * The counter «۲ از ۶» is the source of truth for the active slide.
 */

const DIGITS: Record<string, string> = {
  "۰": "0",
  "۱": "1",
  "۲": "2",
  "۳": "3",
  "۴": "4",
  "۵": "5",
  "۶": "6",
  "۷": "7",
  "۸": "8",
  "۹": "9",
};

const toEnDigits = (value: string) =>
  value.replace(/[۰-۹]/g, (digit) => DIGITS[digit] ?? digit);

async function activeIndex(page: Page, region: ReturnType<Page["locator"]>) {
  const counter = region.locator(".slider-controls .slider-counter").first();
  const text = toEnDigits((await counter.textContent()) ?? "");
  const match = text.match(/(\d+)/);
  return match ? Number(match[1]) : -1;
}

async function slideTotal(page: Page, region: ReturnType<Page["locator"]>) {
  const counter = region.locator(".slider-controls .slider-counter").first();
  const text = toEnDigits((await counter.textContent()) ?? "");
  const parts = [...text.matchAll(/\d+/g)];
  return parts.length > 1 ? Number(parts[1][0]) : 0;
}

const carousel = (page: Page, name: string) =>
  page.getByRole("region", { name, exact: true });

const regions = {
  testimonials: (page: Page) => carousel(page, "از زبان کسانی که مسیر را آمده‌اند"),
  articles: (page: Page) => carousel(page, "خواندنی‌های کوتاه برای روزهای سخت"),
  workshops: (page: Page) => carousel(page, "یادگیری گروهی، در فضایی امن"),
};

test.describe("Home sliders — RTL navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("testimonials: logical prev/next, disabled ends and APG roles", async ({ page }) => {
    const region = regions.testimonials(page);
    await expect(region).toBeVisible();
    await expect(region).toHaveAttribute("aria-roledescription", "carousel");

    const prev = region.getByRole("button", { name: "قبلی" });
    const next = region.getByRole("button", { name: "بعدی" });

    // Icons: Previous points inline-start (right), Next points inline-end (left),
    // both rendered from Lucide and mirrored by the `rtl:` variant.
    await expect(prev.locator("svg.lucide-arrow-left")).toBeVisible();
    await expect(next.locator("svg.lucide-arrow-right")).toBeVisible();

    // No loop for testimonials: previous is disabled on the first slide.
    await expect(prev).toBeDisabled();
    expect(await activeIndex(page, region)).toBe(1);

    await next.click();
    await expect.poll(() => activeIndex(page, region)).toBe(2);

    await prev.click();
    await expect.poll(() => activeIndex(page, region)).toBe(1);

    // Repeated clicks keep advancing.
    await next.click();
    await next.click();
    await expect.poll(() => activeIndex(page, region)).toBe(3);

    // Last slide disables next, not previous.
    const total = await slideTotal(page, region);
    for (let index = 3; index < total; index += 1) await next.click();
    await expect.poll(() => activeIndex(page, region)).toBe(total);
    await expect(next).toBeDisabled();
    await expect(prev).toBeEnabled();

    // APG: each slide is a labelled group.
    const slide = region.getByRole("group", { name: /^۱ از/ }).first();
    await expect(slide).toHaveAttribute("aria-roledescription", "slide");
  });

  test("articles: loop, autoplay pause control and mirrored arrows", async ({ page }) => {
    const region = regions.articles(page);
    await expect(region).toBeVisible();

    const prev = region.getByRole("button", { name: "قبلی" });
    const next = region.getByRole("button", { name: "بعدی" });
    await expect(prev).toBeEnabled();
    await expect(next).toBeEnabled();

    expect(await activeIndex(page, region)).toBe(1);
    await next.click();
    await expect.poll(() => activeIndex(page, region)).toBe(2);
    await prev.click();
    await expect.poll(() => activeIndex(page, region)).toBe(1);

    // WCAG 2.2.2: autoplay can be paused by the user.
    const pause = region.getByRole("button", { name: "توقف پخش خودکار" });
    await expect(pause).toBeVisible();
    await pause.click();
    await expect(region.getByRole("button", { name: "پخش خودکار" })).toBeVisible();
  });

  test("workshops: previous wraps backwards when looping", async ({ page }) => {
    const region = regions.workshops(page);
    await expect(region).toBeVisible();
    const total = await slideTotal(page, region);
    expect(total).toBeGreaterThan(1);

    await region.getByRole("button", { name: "قبلی" }).click();
    await expect.poll(() => activeIndex(page, region)).toBe(total);
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
    await expect.poll(() => activeIndex(page, region)).toBe(2);
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

    await expect.poll(() => activeIndex(page, region)).toBe(2);

    // The opposite drag goes back to the first slide.
    await page.mouse.move(box.x + box.width - 40, y);
    await page.mouse.down();
    for (let step = 1; step <= 24; step += 1) {
      await page.mouse.move(box.x + box.width - 40 - ((box.width - 80) * step) / 24, y);
      await page.waitForTimeout(16);
    }
    await page.mouse.up();

    await expect.poll(() => activeIndex(page, region)).toBe(1);
  });
});
