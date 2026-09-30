import type { ComponentProps, CSSProperties } from "react";
import { cn } from "cn";
import { gradients } from "@/content/gradients";

type Props = ComponentProps<"section"> & {
  tone: (typeof gradients)[number]["key"];
};

export function SectionSurface({ tone, className, children, style, ...props }: Props) {
  return (
    <section className={cn("section-surface", className)} style={{ ...style, "--section-paint": `var(--surface-${tone})` } as CSSProperties} {...props}>
      <div className="section-orb" aria-hidden="true" />
      <div className="section-content site-width">{children}</div>
    </section>
  );
}
