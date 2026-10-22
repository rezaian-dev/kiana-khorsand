/**
 * Carousel types — shared, minimal
 * Audit: centralizes Embla options for consistent RTL handling
 */

export type CarouselOptions = {
  loop?: boolean;
  align?: "start" | "center" | "end";
  autoplay?: boolean;
  autoplayDelay?: number;
};

export type CarouselNavProps = {
  onPrev: () => void;
  onNext: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  prevLabel: string;
  nextLabel: string;
  disabled?: boolean;
};
