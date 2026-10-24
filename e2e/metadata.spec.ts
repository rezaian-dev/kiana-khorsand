import { test, expect } from "./test";

const CARD_PATH = "/og-image.jpg";

/**
 * A link preview is half inline (title, description) and half downloaded (the card), so
 * a broken image URL is invisible in the page itself and only shows up in the messenger.
 * These tests read what a crawler reads and then download the card the same way.
 */
test.describe("link preview card", () => {
  test("the card URL is absolute and the file behind it is a real JPEG", async ({
    page,
    request,
    baseURL,
  }) => {
    await page.goto("/");

    const tags = await page.evaluate(() => {
      const meta = (selector: string) =>
        document.querySelector(selector)?.getAttribute("content") ?? "";
      return {
        ogImage: meta('meta[property="og:image"]'),
        ogType: meta('meta[property="og:image:type"]'),
        ogWidth: meta('meta[property="og:image:width"]'),
        ogHeight: meta('meta[property="og:image:height"]'),
        twitterImage: meta('meta[name="twitter:image"]'),
        twitterCard: meta('meta[name="twitter:card"]'),
      };
    });

    // Absolute, http(s) — a relative URL is meaningless to a crawler on another host.
    const card = new URL(tags.ogImage);
    expect(["http:", "https:"]).toContain(card.protocol);
    expect(card.pathname).toBe(CARD_PATH);
    expect(tags.twitterImage).toBe(tags.ogImage);
    expect(tags.twitterCard).toBe("summary_large_image");

    // WhatsApp renders the card large only when it knows the size and type up front.
    expect(tags.ogWidth).toBe("1200");
    expect(tags.ogHeight).toBe("630");
    expect(tags.ogType).toBe("image/jpeg");

    // And the file itself must answer — this is the half that was silently missing.
    const response = await request.get(
      new URL(card.pathname, baseURL).toString(),
    );
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/jpeg");
    const bytes = (await response.body()).byteLength;
    expect(bytes).toBeGreaterThan(20_000);
    expect(bytes).toBeLessThan(600_000);
  });

  test("an article previews with its own title and a downloadable cover", async ({
    page,
    request,
    baseURL,
  }) => {
    await page.goto("/articles");
    const href = await page
      .locator('a[href^="/articles/"]')
      .first()
      .getAttribute("href");
    test.skip(!href, "no published article to preview");

    await page.goto(href!);
    const og = await page.evaluate(() => ({
      title:
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute("content") ?? "",
      image:
        document
          .querySelector('meta[property="og:image"]')
          ?.getAttribute("content") ?? "",
    }));

    expect(og.title.length).toBeGreaterThan(0);
    // Articles lead with their own cover, not the site card — but a cover that does not
    // answer is just as invisible, so download whatever the page advertises.
    const cover = new URL(og.image);
    const response = await request.get(
      new URL(cover.pathname, baseURL).toString(),
    );
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  });
});
