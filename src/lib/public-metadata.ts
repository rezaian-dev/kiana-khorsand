import type { Metadata } from "next";
import { absoluteUrl } from "./site-urls";

/** Keep SEO and social URLs tied to the same server-side canonical origin. */
export function publicMetadata({
  title,
  description,
  path,
  image = "/assets/images/hero-therapist.jpg",
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
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: canonical ? { canonical: url } : undefined,
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type: publishedTime ? "article" : "website",
      locale: "fa_IR",
      siteName: "کیانا خرسند",
      title,
      description,
      url,
      images: image ? [{ url: absoluteUrl(image), alt: title }] : undefined,
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
