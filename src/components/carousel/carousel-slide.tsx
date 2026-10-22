"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function CarouselSlide({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("carousel-slide min-w-0 flex-[0_0_auto]", className)} {...props}>
      {children}
    </div>
  );
}
