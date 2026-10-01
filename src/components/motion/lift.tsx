import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export function Lift({ children, className }: Props) {
  return <div data-interact="card" className={className}>{children}</div>;
}
