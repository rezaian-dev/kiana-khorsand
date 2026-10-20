import Link from "next/link";
import type { ReactNode } from "react";

export function PublicHoverLink({
  href,
  className,
  children,
  ...props
}: {
  href: string;
  className: string;
  children: ReactNode;
  "aria-label"?: string;
  title?: string;
}) {
  return (
    <Link
      href={href}
      {...props}
      className={`${className} transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:scale-[1.015] focus-visible:-translate-y-[2px] focus-visible:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:transform-none`}
    >
      {children}
    </Link>
  );
}
