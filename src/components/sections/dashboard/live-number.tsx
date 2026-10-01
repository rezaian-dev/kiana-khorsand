"use client";

import { useEffect } from "react";
import { useReducedMotion, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { formatNumber } from "@/lib/format";
import { motionTokens } from "@/lib/motion";

type Props = { value: number };

export function LiveNumber({ value }: Props) {
  const isReduced = useReducedMotion();
  const count = useSpring(value, motionTokens.spring);
  const display = useTransform(count, (current) => formatNumber(Math.max(0, Math.round(current))));
  useEffect(() => { if (isReduced) count.jump(value); else count.set(value); }, [count, isReduced, value]);
  return <strong className="stat-value"><m.span aria-hidden="true">{display}</m.span><span className="sr-only">{formatNumber(value)}</span></strong>;
}
