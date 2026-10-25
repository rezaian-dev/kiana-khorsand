import * as m from "motion/react-client";
import { motionTiming, pageEntrance } from "@/lib/motion-tokens";

/** Keep the authentication page on the server; hydrate only the motion element. */
export function AuthCardReveal({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      className="relative z-1 w-[min(100%,430px)] rounded-[28px] border border-white/70 p-[clamp(1.1rem,2.6vw,1.85rem)] shadow-[0_44px_90px_-54px_rgb(37_20_70/0.6),inset_0_2px_0_rgb(255_255_255/0.6),inset_0_-30px_60px_-50px_rgb(81_48_173/0.35)] backdrop-blur-[26px] backdrop-saturate-[1.7] [background:linear-gradient(180deg,rgb(255_255_255/0.55),rgb(255_255_255/0.26)),rgb(255_255_255/0.34)] motion-reduce:transform-none! motion-reduce:opacity-100! dark:border-white/10 dark:shadow-[0_50px_100px_-60px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.08)] dark:[background:linear-gradient(180deg,rgb(255_255_255/0.06),rgb(255_255_255/0.02)),rgb(24_19_36/0.62)]"
      initial="initial"
      animate="visible"
      variants={pageEntrance}
      transition={motionTiming.standard}
    >
      {children}
    </m.div>
  );
}
