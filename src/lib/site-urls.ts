/**
 * Host this deployment is served from. Vercel injects it at both build and run time and
 * prefers an assigned custom domain, so it is the one origin we can be sure answers.
 */
const VERCEL_ORIGIN = (() => {
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return host ? `https://${host}` : undefined;
})();

const CONFIGURED_ORIGIN =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Origin every published URL is built on: canonical links, Open Graph, the sitemap, the
 * robots host and the social card.
 *
 * On Vercel the deployment's own domain wins, because it is guaranteed to resolve —
 * whereas a `SITE_URL` naming a domain that is not connected to the project yet would
 * publish canonical links to nowhere and leave every shared link without its image
 * (messengers fetch the card from the URL we print, and give up silently). The moment
 * the custom domain is assigned in Vercel, this follows it without touching the config.
 * `SITE_URL` still decides everywhere Vercel is not running: local dev and self-hosting.
 */
export const SITE_ORIGIN =
  VERCEL_ORIGIN ?? CONFIGURED_ORIGIN ?? "http://localhost:3000";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).toString();
}
