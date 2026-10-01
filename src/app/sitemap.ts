import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { routes } from "@/lib/constants";
import { getEnv } from "@/lib/env";
import { readAvailability } from "@/server/booking";
import { readLinks, readProfile, readReviews } from "@/server/published";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  await readProfile();
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  const [articles, reviews] = await Promise.all([readLinks(), readReviews(1)]);
  const paths: string[] = [routes.home, routes.about, routes.services, routes.articles, routes.courses, routes.faq, routes.contact];
  if ((await readAvailability()).isEnabled) paths.push(routes.booking);
  if (reviews.count > 0) paths.push(routes.testimonials);
  return [
    ...paths.map((path) => ({ url: `${origin}${path}` })),
    ...articles.map((article) => ({ url: `${origin}${routes.articles}/${article.slug}`, lastModified: article.updatedAt })),
  ];
}
