import type { ComponentProps } from "react";
import { cn } from "cn";

type Props = ComponentProps<"div">;

export function CarouselItem({ className, ...props }: Props) {
  return <div role="group" aria-roledescription="اسلاید" data-slot="carousel-item" className={cn("carousel-slide", className)} {...props} />;
}
