/* eslint-disable @typescript-eslint/no-unused-vars */
// Server — CSS reveal, no JS bundle
export { PortraitFloat, FloatingTicket } from "./decorative-motion";

export function HeroReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  mode?: "image" | "text";
}) {
  return (
    <div className={`${className} animate-[page-enter_0.5s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none`}>
      {children}
      <style>{`@keyframes page-enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

export function SectionReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
