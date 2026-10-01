import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { z } from "zod";
import { images } from "@/content/images";
import { articleSchema, courseSchema, settingsSchema, slugSchema, testimonialSchema } from "@/lib/records";
import type { Article, Course, Profile, Review } from "@/lib/published";
import { topics } from "@/lib/constants";
import type { CatalogQuery } from "@/lib/catalog";
import { getArticle, listArticles, listLinks, listRelated } from "./repos/articles";
import { listCourses } from "./repos/courses";
import { getProfile } from "./repos/settings";
import { listTestimonials } from "./repos/testimonials";

const topicKeys = Object.keys(topics);
const datesSchema = z.object({ publishedAt: z.date(), updatedAt: z.date() }).refine((value) => value.updatedAt >= value.publishedAt);
const profileSchema = z.object({
  name: settingsSchema.shape.name, role: settingsSchema.shape.role, introduction: settingsSchema.shape.introduction,
  license: settingsSchema.shape.license, phone: settingsSchema.shape.phone, whatsapp: settingsSchema.shape.whatsapp,
  instagram: settingsSchema.shape.instagram, telegram: settingsSchema.shape.telegram, address: settingsSchema.shape.address,
});
const reviewSchema = z.object({
  name: testimonialSchema.shape.name, quote: testimonialSchema.shape.quote, image: testimonialSchema.shape.image, publishedAt: z.date(),
});

function mapArticle(input: unknown): Article {
  const value = articleSchema.parse(input);
  const dates = datesSchema.parse(input);
  return {
    slug: value.slug, title: value.title, description: value.description, category: value.category, author: value.author,
    image: images[value.image], introduction: value.introduction, sections: value.sections, takeaway: value.takeaway, sources: value.sources,
    publishedAt: dates.publishedAt.toISOString(), updatedAt: dates.updatedAt.toISOString(),
  };
}

function mapCourse(input: unknown): Course {
  const value = courseSchema.parse(input);
  const dates = datesSchema.parse(input);
  return {
    slug: value.slug, title: value.title, description: value.description, category: value.category, author: value.author,
    image: images[value.image], audience: value.audience, outline: value.outline, boundary: value.boundary,
    publishedAt: dates.publishedAt.toISOString(), updatedAt: dates.updatedAt.toISOString(),
  };
}

// Shared RSC memoization only: no cross-request content/session cache. Every DB path awaits the request barrier.
export const readProfile = cache(async (): Promise<Profile> => {
  await connection();
  const record = await getProfile();
  if (!record) throw new Error("Site settings have not been initialized.");
  const profile = profileSchema.parse(record);
  return {
    ...profile, phone: profile.phone || null,
    whatsapp: profile.whatsapp ? `https://wa.me/${profile.whatsapp.replace(/^0/, "98").replace(/^\+/, "")}` : null,
  };
});

export const readArticles = cache(async (q: string, category: CatalogQuery["category"], sort: CatalogQuery["sort"], page: number) => {
  await connection();
  const result = await listArticles({ q, category, sort, page });
  return { ...result, entries: result.entries.map(mapArticle), categories: z.array(articleSchema.shape.category).parse(result.categories).sort((a, b) => topicKeys.indexOf(a) - topicKeys.indexOf(b)) };
});

export const readCourses = cache(async (q: string, category: CatalogQuery["category"], sort: CatalogQuery["sort"], page: number) => {
  await connection();
  const result = await listCourses({ q, category, sort, page });
  return { ...result, entries: result.entries.map(mapCourse), categories: z.array(courseSchema.shape.category).parse(result.categories).sort((a, b) => topicKeys.indexOf(a) - topicKeys.indexOf(b)) };
});

export const readArticle = cache(async (slug: string) => {
  await connection();
  const parsed = slugSchema.safeParse(slug);
  if (!parsed.success) return null;
  const record = await getArticle(parsed.data);
  return record ? mapArticle(record) : null;
});

export const readRelated = cache(async (slug: string, category: Article["category"]) => {
  await connection();
  return (await listRelated(slug, category)).map(mapArticle);
});

export const readReviews = cache(async (page: number) => {
  await connection();
  const result = await listTestimonials({ page, size: 6 });
  const entries: Review[] = result.entries.map((record) => {
    const value = reviewSchema.parse(record);
    const image = value.image ? images[value.image] : null;
    if (image?.isSample) throw new Error("A sample image cannot represent an approved review.");
    return { id: record._id.toHexString(), name: value.name, quote: value.quote, image, publishedAt: value.publishedAt.toISOString() };
  });
  return { ...result, entries };
});

// Sitemap is a route handler: do not rely on React's RSC cache here.
export async function readLinks() {
  await connection();
  return (await listLinks()).map((record) => {
    const dates = datesSchema.parse(record);
    return { slug: slugSchema.parse(record.slug), updatedAt: dates.updatedAt };
  });
}
