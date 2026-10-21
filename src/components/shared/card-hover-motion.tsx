/* eslint-disable @typescript-eslint/no-unused-vars */
// CSS-only hover — no JS, server component
export function installCardHoverMotion(_card: HTMLElement) {
  // kept for backwards compat, no-op — CSS handles hover now
  return () => {};
}

export function PublicCardMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`${className} transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-lift)] motion-safe:hover:border-[var(--c-violet)] motion-reduce:transition-none`}
    >
      {children}
    </div>
  );
}
