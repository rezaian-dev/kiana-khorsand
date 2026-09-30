import { useId } from "react";
import {
  wordmark,
  type LogoConcept,
  type ProofForm,
  type ProofTone,
} from "@/content/logo-concepts";

type Props = {
  concept: LogoConcept;
  form: ProofForm;
  tone: ProofTone;
  size: number;
  isLoading?: boolean;
};

export function Concept({
  concept,
  form,
  tone,
  size,
  isLoading = false,
}: Props) {
  const id = useId();
  const isLockup = form === "lockup";
  const isMono = tone === "mono" || tone === "inverse";
  const viewWidth = isLockup ? 336 : 96;
  const height = (size * 96) / viewWidth;
  const prefix = `proof-${concept.key}-${id}`;
  const paint = isMono ? "currentColor" : `url(#${prefix}-paint)`;

  if (isLoading) {
    return (
      <span
        className="proof-skeleton"
        aria-hidden="true"
        style={{ width: size, height }}
      />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="proof-mark"
      data-tone={tone}
      viewBox={`0 0 ${viewWidth} 96`}
      width={size}
      height={height}
      role="img"
      aria-labelledby={`${prefix}-title`}
      focusable="false"
    >
      <title id={`${prefix}-title`}>
        {`طرح ${concept.label}، ${isLockup ? "نماد و نام" : "نماد"} کیانا خرسند`}
      </title>
      {!isMono && (
        <defs>
          <linearGradient
            id={`${prefix}-paint`}
            x1="14"
            y1="14"
            x2="82"
            y2="82"
            gradientUnits="userSpaceOnUse"
            colorInterpolation="sRGB"
          >
            <stop offset="0%" stopColor="var(--proof-violet)" />
            <stop offset="36%" stopColor="var(--proof-indigo)" />
            <stop offset="70%" stopColor="var(--proof-sky)" />
            <stop offset="100%" stopColor="var(--proof-teal)" />
          </linearGradient>
        </defs>
      )}
      {isLockup && <path d={wordmark} fill="currentColor" />}
      <g
        transform={isLockup ? "translate(240 0)" : undefined}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {concept.shapes.map((shape) => (
          <path
            key={shape.path}
            d={shape.path}
            fill={shape.isStroke ? "none" : paint}
            stroke={shape.isStroke ? paint : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
