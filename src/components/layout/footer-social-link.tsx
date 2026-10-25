"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import {
  footerSocialClassName,
  footerSocialTones,
} from "@/components/layout/footer-social-styles";

type SocialName = keyof typeof footerSocialTones;

/** Hover gesture ignores touch emulation; keyboard focus gets the same visible state. */
export function FooterSocialLink({
  name,
  href,
}: {
  name: SocialName;
  href: string;
}) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;
  const icon =
    name === "instagram"
      ? "instagram-logo"
      : name === "telegram"
        ? "telegram-logo"
        : "whatsapp-logo";
  return (
    <m.a
      className={`${footerSocialClassName} ${footerSocialTones[name]} social-${name}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={(event) =>
        setFocused(event.currentTarget.matches(":focus-visible"))
      }
      onBlur={() => setFocused(false)}
      initial={false}
      animate={
        active
          ? {
              y: reduce ? 0 : -3,
              rotate: reduce ? 0 : -5,
              borderColor: "transparent",
              color: "var(--social-hover-ink)",
              boxShadow:
                "0 14px 32px -12px var(--sc,rgba(109,74,255,.5)), 0 0 0 4px color-mix(in srgb,var(--sa,var(--c-violet)) 18%,transparent)",
            }
          : {
              y: 0,
              rotate: 0,
              borderColor: "var(--line)",
              color: "var(--icon-c,var(--fg))",
              boxShadow: "none",
            }
      }
      transition={{ duration: reduce ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <m.span
        className="pointer-events-none absolute inset-0 z-[-1] rounded-[inherit] bg-[linear-gradient(135deg,var(--sa,var(--c-violet)),var(--sb,var(--c-plum)))]"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.4 }}
      />
      <m.i
        className={`ph-duotone ph-${icon} relative`}
        aria-hidden="true"
        initial={false}
        animate={
          active && !reduce
            ? { scale: 1.18, rotate: 5 }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </m.a>
  );
}
