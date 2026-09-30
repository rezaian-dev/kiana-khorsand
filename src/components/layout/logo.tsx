import Link from "next/link";
import { useId } from "react";
import { brand } from "@/content/brand";
import { routes } from "@/lib/constants";

type Props = {
  form?: "emblem" | "lockup";
};

export function Logo({ form = brand.form }: Props) {
  const id = useId();
  const isLockup = form === "lockup";
  const paint = `url(#${id}-paint)`;

  return (
    <Link
      href={routes.home}
      className="brand-link"
      aria-label="دکتر کیانا خرسند، صفحه اصلی"
    >
      <svg
        viewBox={`0 0 ${isLockup ? 336 : 96} 96`}
        width={isLockup ? 336 : 96}
        height={96}
        role="img"
        aria-labelledby={`${id}-title`}
        focusable="false"
      >
        <title id={`${id}-title`}>کیانا خرسند</title>
        <defs>
          <linearGradient
            id={`${id}-paint`}
            x1="14"
            y1="14"
            x2="82"
            y2="82"
            gradientUnits="userSpaceOnUse"
            colorInterpolation="sRGB"
          >
            <stop offset="0%" stopColor="var(--logo-violet)" />
            <stop offset="36%" stopColor="var(--logo-indigo)" />
            <stop offset="70%" stopColor="var(--logo-sky)" />
            <stop offset="100%" stopColor="var(--logo-teal)" />
          </linearGradient>
        </defs>
        {isLockup && <path d={brand.wordmark} fill="currentColor" />}
        <g
          transform={isLockup ? "translate(240 0)" : undefined}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {brand.shapes.map((shape) => (
            <path
              key={shape.path}
              d={shape.path}
              fill={shape.isStroke ? "none" : paint}
              stroke={shape.isStroke ? paint : undefined}
            />
          ))}
        </g>
      </svg>
    </Link>
  );
}
