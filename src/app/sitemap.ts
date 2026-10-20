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

export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: Awaited<ReturnType<typeof listArticles>> = [];
  let areas: Awaited<ReturnType<typeof listAreas>> = [];
  let assessments: Awaited<ReturnType<typeof listAssessments>> = [];
  let workshops: Awaited<ReturnType<typeof listWorkshops>> = [];
  try {
    [articles, areas, assessments, workshops] = await Promise.all([
      listArticles(),
      listAreas(),
      listAssessments(),
      listWorkshops(),
    ]);
  } catch (error) {
    // Build on Vercel without DB — return static routes only
    console.warn("[sitemap] DB unavailable during build, using static routes only", error);
  }
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
