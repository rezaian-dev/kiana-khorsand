/**
 * Page entrance, on the server.
 *
 * Every route mounts fresh inside the persistent shell, so a CSS animation here replays
 * on each navigation without shipping a line of JavaScript. Reduced-motion users get the
 * page already in place.
 */
export function PageReveal({ children }: { children: React.ReactNode }) {
  return <div className="site-route-entrance">{children}</div>;
}
