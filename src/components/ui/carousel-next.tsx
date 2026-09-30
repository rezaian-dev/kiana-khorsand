"use client";

import type { ComponentProps } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "./button";
import { useCarousel } from "./carousel-context";

type Props = ComponentProps<typeof Button>;

export function CarouselNext(props: Props) {
  const { scrollNext, canScrollNext } = useCarousel();
  return <Button type="button" size="icon" variant="outline" onClick={scrollNext} disabled={!canScrollNext} aria-label="اسلاید بعدی" {...props}><ChevronLeft aria-hidden="true" /></Button>;
}
