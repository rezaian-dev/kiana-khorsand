/** Canonical origin for metadata, robots and the public sitemap. */
export const SITE_ORIGIN = new URL(
  process.env.SITE_URL || "https://kianakhorsand.ir",
).origin;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).toString();
}
