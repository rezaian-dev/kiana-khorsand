import type { Metadata } from "next";
import { absoluteUrl } from "./site-urls";

export const SITE_NAME = "کیانا خرسند";

/** Size and type of the generated brand card in public/og-image.jpg. */
const SOCIAL_CARD = {
  path: "/og-image.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
} as const;

function socialImage(image: string) {
  const isCard = image === SOCIAL_CARD.path;
  return {
    url: absoluteUrl(image),
    ...(isCard
      ? {
          width: SOCIAL_CARD.width,
          height: SOCIAL_CARD.height,
          type: SOCIAL_CARD.type,
        }
      : {}),
  };
}

/** The Open Graph and Twitter tags a shared link is previewed from. */
export function socialMetadata({
  title,
  description,
  path,
  image = SOCIAL_CARD.path,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedTime?: string | null;
}): Required<Pick<Metadata, "openGraph" | "twitter">> {
  const images = image ? [{ ...socialImage(image), alt: title }] : undefined;

  return {
    openGraph: {
      type: publishedTime ? "article" : "website",
      locale: "fa_IR",
      siteName: SITE_NAME,
      title,
      description,
      url: absoluteUrl(path),
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}

/** Keep SEO and social URLs tied to the same server-side canonical origin. */
export function publicMetadata({
  title,
  description,
  path,
  image = SOCIAL_CARD.path,
  canonical = true,
  index = true,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  canonical?: boolean;
  index?: boolean;
  publishedTime?: string | null;
}): Metadata {
  return {
    title,
    description,
    alternates: canonical ? { canonical: absoluteUrl(path) } : undefined,
    robots: index ? undefined : { index: false, follow: true },
    ...socialMetadata({ title, description, path, image, publishedTime }),
  };
}
