/** Hover motion uses Tailwind's transform utilities and respects reduced motion. */
export function HoverCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-[3px]`}
    >
      {children}
    </div>
  );
}
