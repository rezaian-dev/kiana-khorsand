import {
  siteBadgeClassName,
  siteCardClassName,
} from "@/components/shared/public-layout-classes";
import { ScrollReveal } from "@/components/layout/page-reveal";
import {
  artMediaMaskClassName,
  artSealClassName,
  artSurfaceClassName,
} from "@/components/shared/art-card-styles";
import Link from "next/link";
import Image from "next/image";
import { labels } from "@/lib/labels";
import { ArticleEmblem } from "@/features/articles/ui/article-emblem";
import {
  articleActionClassName,
  articleActionIconClassName,
} from "@/features/articles/article-action-styles";
import type { ArticleVisual } from "@/features/articles/article-visual";

export function ContentCard({
  title,
  description,
  href,
  image,
  tag,
  articleVisual,
  articleSlug,
  action = labels.details,
}: {
  title: string;
  description: string;
  href: string;
  image?: string | null;
  tag?: string;
  articleVisual?: ArticleVisual;
  articleSlug?: string;
  action?: string;
}) {
  return (
    <ScrollReveal
      as="article"
      className={`${siteCardClassName} art-content-card group gap-0! px-3! pt-3! pb-5! ${artSurfaceClassName}`}
      hoverImageSelector={image ? ".site-card-image" : undefined}
    >
      <div className="art-card-media relative isolate min-w-0 flex-none">
        <div
          className={`art-card-photo h-[clamp(170px,19vw,232px)] bg-[linear-gradient(135deg,#afcec0,#b3a4be)] ${artMediaMaskClassName}`}
        >
          {image ? (
            <Image
              className="site-card-image size-full! rounded-none! object-cover!"
              src={image}
              unoptimized={image?.startsWith("/api/article-covers/")}
              alt={title}
              width={420}
              height={250}
            />
          ) : (
            <div
              className="site-card-fallback size-full! rounded-none! bg-[linear-gradient(135deg,#c7ded3,#7ca3a6_55%,#c29baf)]! object-cover!"
              aria-hidden="true"
            />
          )}
        </div>
        {articleVisual && articleSlug ? (
          <ArticleEmblem visual={articleVisual} slug={articleSlug} />
        ) : (
          <span className={artSealClassName} aria-hidden="true">
            <i className="ph-duotone ph-sparkle" />
          </span>
        )}
      </div>
      {tag && (
        <span
          className={`${siteBadgeClassName} mx-[0.65rem] mt-4 [align-self:start]!`}
        >
          {tag}
        </span>
      )}
      <h2 className="mx-[0.65rem] mt-[0.95rem] mb-0">
        {title.split(" | ")[0]}
      </h2>
      <p className="mx-[0.65rem] mt-2">{description}</p>
      <Link
        className={`art-card-action group/action mx-[.65rem]! mt-auto! [align-self:start]! motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none! ${articleActionClassName}`}
        href={href}
      >
        {action}{" "}
        <span
          className={`${articleActionIconClassName} group-hover/action:motion-safe:-translate-x-[3px]`}
          aria-hidden="true"
        >
          ←
        </span>
      </Link>
    </ScrollReveal>
  );
}
