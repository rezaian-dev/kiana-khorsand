"use client";

import { getImageProps } from "next/image";
import { useState, type CSSProperties, type SyntheticEvent } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { cn } from "cn";
import type { ImageAsset } from "@/content/images";
import { motionTokens } from "@/lib/motion";

type Props = { image: ImageAsset; sizes: string; className?: string; isHero?: boolean };

export function Photo({ image, sizes, className, isHero = false }: Props) {
  const [hasError, setHasError] = useState(false);
  const [scope, animate] = useAnimate();
  const isReduced = useReducedMotion();
  const { props } = getImageProps({ src: image.path, alt: image.alt, width: image.width, height: image.height, sizes, loading: isHero ? "eager" : "lazy", fetchPriority: isHero ? "high" : "auto" });
  const mobile = image.mobile ? getImageProps({ src: image.mobile, alt: image.alt, width: 1080, height: 1440, sizes }).props : null;
  function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
    if (!isReduced && !isHero) void animate(event.currentTarget, { opacity: [0.85, 1] }, { duration: motionTokens.ui });
  }
  return (
    <div ref={scope} className={cn("photo", className)} style={{ "--photo-ratio": image.aspectRatio, "--photo-mobile": mobile ? "3/4" : image.aspectRatio } as CSSProperties}>
      {hasError ? <div className="photo-error" role="img" aria-label={image.alt}>تصویر فعلاً در دسترس نیست.</div> : <picture>{mobile && <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes={sizes} width={1080} height={1440} />}{/* Next getImageProps supplies optimized src/srcSet for native picture art direction. */}<img {...props} alt={image.alt} onLoad={handleLoad} onError={() => setHasError(true)} /></picture>}
    </div>
  );
}
