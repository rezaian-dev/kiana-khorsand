// Desktop-pointer spotlight is paint only: no overlay can intercept the link.
// A hover variable also leaves the decorative effect usable without JS; Motion
// interpolates the registered variable after hydration, including pointer leave.
// Full utility tokens must be literal for Tailwind's production scanner.
export const publicSpotClassName =
  "spot [--spot-opacity:0] hover:[--spot-opacity:1] [@media(hover:hover)]:after:pointer-events-none [@media(hover:hover)]:after:absolute [@media(hover:hover)]:after:inset-0 [@media(hover:hover)]:after:rounded-[inherit] [@media(hover:hover)]:after:[background:radial-gradient(240px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_srgb,var(--c-violet)_18%,transparent),transparent_68%)] [@media(hover:hover)]:after:opacity-[var(--spot-opacity)] [@media(hover:hover)]:after:content-['']";
