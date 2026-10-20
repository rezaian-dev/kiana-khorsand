import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-urls";
import { listArticles } from "@/features/articles/queries";
import { listAreas } from "@/features/areas/queries";
import { listAssessments } from "@/features/assessments/queries";
import { listWorkshops } from "@/features/workshops/queries";

// Public routes only. Unpublished details never enter the sitemap.
const publicPaths = [
  "/",
  "/about",
  "/approach",
  "/areas",
  "/articles",
  "/assessments",
  "/workshops",
  "/testimonials",
  "/faq",
  "/fees",
  "/contact",
  "/book",
  "/cancellation",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, areas, assessments, workshops] = await Promise.all([
    listArticles(),
    listAreas(),
    listAssessments(),
    listWorkshops(),
  ]);
  const pages: MetadataRoute.Sitemap = publicPaths.map((path) => ({
    url: absoluteUrl(path),
  }));
  return [
    ...pages,
    ...articles.map(({ slug, cover }) => ({
      url: absoluteUrl(`/articles/${slug}`),
      images: cover ? [absoluteUrl(cover)] : undefined,
    })),
    ...areas.map(({ slug, image }) => ({
      url: absoluteUrl(`/areas/${slug}`),
      images: image ? [absoluteUrl(image)] : undefined,
    })),
    ...assessments.map(({ slug }) => ({
      url: absoluteUrl(`/assessments/${slug}`),
    })),
    ...workshops.map(({ slug, cover }) => ({
      url: absoluteUrl(`/workshops/${slug}`),
      images: cover ? [absoluteUrl(cover)] : undefined,
    })),
  ];
}
