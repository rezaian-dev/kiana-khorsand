// Server component — CSS-only reveal, no client JS for entrance
export function PageReveal({ children }: { children: React.ReactNode }) {
  return <div className="site-route-entrance">{children}</div>;
}

export function ScrollReveal({
  children,
  className,
  id,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "section" | "article";
}) {
  const cls = `${className ?? ""}`;
  if (as === "article")
    return <article id={id} className={cls}>{children}</article>;
  if (as === "section")
    return <section id={id} className={cls}>{children}</section>;
  return <div id={id} className={cls}>{children}</div>;
}
