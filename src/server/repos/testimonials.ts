import "server-only";
import { collections, reviewStates } from "../../lib/constants.ts";
import { querySchema } from "../../lib/records.ts";
import { getDb } from "../db.ts";
import { requireAdmin } from "../session.ts";
import type { Testimonial } from "../models.ts";

export async function listTestimonials(input: unknown = {}) {
  const query = querySchema.parse(input);
  return getDb().collection<Testimonial>(collections.testimonials).find({
    status: reviewStates.approved, hasConsent: true, isSample: false, publishedAt: { $lte: new Date(), $type: "date" },
  })
    .sort({ publishedAt: -1, _id: -1 }).skip((query.page - 1) * query.size).limit(query.size)
    .project<Pick<Testimonial, "_id" | "name" | "quote" | "image" | "publishedAt">>({ name: 1, quote: 1, image: 1, publishedAt: 1 }).toArray();
}

export async function listReviews(input: unknown = {}) {
  await requireAdmin();
  const query = querySchema.parse(input);
  return getDb().collection<Testimonial>(collections.testimonials).find({}).sort({ updatedAt: -1, _id: -1 })
    .skip((query.page - 1) * query.size).limit(query.size).toArray();
}
