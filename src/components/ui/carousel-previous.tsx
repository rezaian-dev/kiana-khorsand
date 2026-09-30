"use client";

import type { ComponentProps } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "./button";
import { useCarousel } from "./carousel-context";

type Props = ComponentProps<typeof Button>;

export function CarouselPrevious(props: Props) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return <Button type="button" size="icon" variant="outline" onClick={scrollPrev} disabled={!canScrollPrev} aria-label="اسلاید قبلی" {...props}><ChevronRight aria-hidden="true" /></Button>;
}
