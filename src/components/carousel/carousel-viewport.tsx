"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useCarouselContext } from "./carousel";

export function CarouselViewport({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { emblaRef } = useCarouselContext();
  return (
    <div
      ref={emblaRef}
      className={cn("carousel-viewport overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CarouselContainer({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("carousel-container flex touch-pan-y", className)} {...props}>
      {children}
    </div>
  );
}
