// Public reference cards only. Keep semantic hooks for diagnostics and existing
// art overrides; error/admin routes are outside the scoped reference styles.
const publicCardGeometryClassName =
  "relative rounded-[24px] border p-6 sm:p-7 [box-shadow:var(--shadow-soft)]";

export const publicCardClassName = `card ${publicCardGeometryClassName} border-[var(--line)] bg-[var(--surface)] hover:border-[color:color-mix(in_srgb,var(--c-violet)_30%,var(--line))] hover:[box-shadow:var(--shadow-lift)] [transition:transform_0.38s_cubic-bezier(0.2,0.8,0.2,1),box-shadow_0.38s,border-color_0.38s]`;

// The two background layers make the transparent border into a rainbow rim.
// The art-card surface uses ! overrides intentionally; it keeps its own paint.
export const publicRainbowCardClassName = `card-rainbow ${publicCardGeometryClassName} border-transparent [background-image:linear-gradient(var(--surface),var(--surface)),conic-gradient(from_var(--angle),var(--c-violet),var(--c-plum),var(--c-rose),var(--c-amber),var(--c-violet))] [background-origin:border-box] [background-clip:padding-box,border-box] hover:[box-shadow:var(--shadow-lift)] [transition:box-shadow_0.24s,border-color_0.24s,background-color_0.24s] motion-reduce:[transition:none]! motion-reduce:transform-none!`;
