import "server-only";
import { collections, publicationStates } from "../../lib/constants.ts";
import { catalogSchema } from "../../lib/catalog.ts";
import { slugSchema } from "../../lib/records.ts";
import { getDb } from "../db.ts";
import { requireAdmin } from "../session.ts";
import { buildFilter } from "../query.ts";
import type { Course } from "../models.ts";

export async function listCourses(input: unknown) {
  const query = catalogSchema.parse(input);
  const filter = { ...buildFilter(query), status: publicationStates.published, isReviewed: true, publishedAt: { $lte: new Date(), $type: "date" as const } };
  const collection = getDb().collection<Course>(collections.courses);
  const count = await collection.countDocuments(filter, { collation: { locale: "fa" } });
  const pageCount = Math.max(1, Math.ceil(count / 6));
  const page = Math.min(query.page, pageCount);
  const entries = await collection.find(filter, { collation: { locale: "fa" } })
    .sort(query.sort === "title" ? { title: 1, slug: 1 } : { publishedAt: -1, slug: 1 }).skip((page - 1) * 6).limit(6).toArray();
  return { entries, count, pageCount, query: { ...query, page } };
}

export async function getCourse(slug: unknown) {
  return getDb().collection<Course>(collections.courses).findOne({ slug: slugSchema.parse(slug), status: publicationStates.published, isReviewed: true, publishedAt: { $lte: new Date(), $type: "date" } });
}

export async function listContent(input: unknown) {
  await requireAdmin();
  const query = catalogSchema.parse(input);
  return getDb().collection<Course>(collections.courses).find(buildFilter(query)).sort({ updatedAt: -1, _id: -1 }).skip((query.page - 1) * 12).limit(12).toArray();
}
