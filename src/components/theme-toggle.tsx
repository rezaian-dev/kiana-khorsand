"use client";

import { MoonStar, Sun } from "lucide-react";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useLiveReducedMotion } from "@/components/layout/use-live-reduced-motion";

const MotionMoon = motion.create(MoonStar);
const MotionSun = motion.create(Sun);
const iconVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -2, scale: 1.06 },
};
const publicIconFallback =
  "[@media(scripting:none)]:transition-transform [@media(scripting:none)]:duration-[250ms] [@media(scripting:none)]:ease-[cubic-bezier(0.22,1,0.36,1)] [@media(scripting:none)]:group-hover/theme:-translate-y-0.5 [@media(scripting:none)]:group-hover/theme:scale-[1.06] motion-reduce:[transition:none]! motion-reduce:[transform:none]! [@media(scripting:enabled)]:motion-reduce:group-hover/theme:[transform:translateY(-2px)_scale(1.06)]!";

export function ThemeToggle({
  className = "",
  id = "themeToggle",
}: {
  className?: string;
  id?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useLiveReducedMotion();
  const publicIcon = id === "themeToggle";
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dark = mounted && resolvedTheme === "dark";
  return (
    <motion.button
      id={id}
      type="button"
      initial={false}
      animate="rest"
      whileHover={publicIcon ? "hover" : undefined}
      aria-label={
        mounted
          ? dark
            ? "روشن کردن پوسته"
            : "تاریک کردن پوسته"
          : "تغییر پوسته"
      }
      aria-pressed={mounted ? dark : undefined}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={`${
        className ||
        "border-line bg-surface text-fg grid h-11 w-11 place-items-center rounded-full border shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5"
      } ${publicIcon ? "group/theme" : ""}`}
    >
      {dark ? (
        <MotionMoon
          size={21}
          aria-hidden="true"
          className={publicIcon ? publicIconFallback : undefined}
          variants={publicIcon ? iconVariants : undefined}
          transition={{
            duration: reduceMotion ? 0 : 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ) : (
        <MotionSun
          size={21}
          aria-hidden="true"
          className={publicIcon ? publicIconFallback : undefined}
          variants={publicIcon ? iconVariants : undefined}
          transition={{
            duration: reduceMotion ? 0 : 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
    </motion.button>
  );
}
