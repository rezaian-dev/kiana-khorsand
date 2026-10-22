/**
 * Host this deployment is served from. Vercel injects it at build time and prefers an
 * assigned custom domain, so metadata never has to hard-code a name it cannot verify.
 */
const DEPLOYMENT_ORIGIN = (() => {
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return host ? `https://${host}` : undefined;
})();

/** Canonical origin for pages, robots and the public sitemap. */
export const SITE_ORIGIN = new URL(
  process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    DEPLOYMENT_ORIGIN ||
    "http://localhost:3000",
).origin;

/**
 * Absolute URL for a file someone else downloads on their own — the social card above
 * all. A preview crawler reads the page from one host and then goes looking for the
 * card at the URL we printed: if that URL names a domain which is not pointing here
 * yet, the page still previews (its title and description are inline) but the image
 * silently never appears. So files follow the host that is actually serving this
 * deployment, and fall back to the canonical origin off Vercel.
 */
export function assetUrl(path: string): string {
  return new URL(path, DEPLOYMENT_ORIGIN ?? SITE_ORIGIN).toString();
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).toString();
}
