import { test as base } from "@playwright/test";

export * from "@playwright/test";

/**
 * The suite's starting point.
 *
 * A launch screen is a cold-start experience, and every test is a brand-new browser
 * profile — so without this, every test would sit behind it for a second. Seeding the
 * session flag before the first paint makes each test start as a returning visitor,
 * which is the state the behaviour under test actually cares about.
 *
 * `experience.spec.ts` imports Playwright directly on purpose: the launch screen is
 * what it is there to test.
 */
export const test = base.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() => {
      try {
        sessionStorage.setItem("kk:boot", "1");
      } catch {
        // A context without storage simply sees the launch screen; nothing breaks.
      }
    });
    await use(context);
  },
});
