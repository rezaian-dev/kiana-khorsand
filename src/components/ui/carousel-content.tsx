"use client";

import type { ComponentProps } from "react";
import { cn } from "cn";
import { useCarousel } from "./carousel-context";

type Props = ComponentProps<"div">;

export function CarouselContent({ className, ...props }: Props) {
  const { carouselRef } = useCarousel();
  return <div ref={carouselRef} className="carousel-viewport" data-slot="carousel-content"><div className={cn("carousel-track", className)} {...props} /></div>;
}
