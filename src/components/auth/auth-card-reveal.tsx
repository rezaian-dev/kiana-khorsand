import * as m from "motion/react-client";
import { motionTiming, pageEntrance } from "@/lib/motion-tokens";

/** Keep the authentication page on the server; hydrate only the motion element. */
export function AuthCardReveal({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      className="auth-new-card w-[min(100%,430px)] motion-reduce:transform-none! motion-reduce:opacity-100!"
      initial="initial"
      animate="visible"
      variants={pageEntrance}
      transition={motionTiming.standard}
    >
      {children}
    </m.div>
  );
}
