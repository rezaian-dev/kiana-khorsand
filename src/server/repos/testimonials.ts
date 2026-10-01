import "server-only";
import { z } from "zod";
import { queueSchema, queueOrders, moderationSchema } from "../../lib/queue";
import { escapeSearch } from "../query";
import { ObjectId } from "mongodb";
import { reviewEditSchema } from "../../lib/mutations";
import { liveTopics, resultCodes } from "../../lib/constants";
import type { Receipt } from "../../lib/result";
import { MutationError, requireWrite } from "../result";
import { notifyChange } from "../changes";
import { collections, reviewStates } from "../../lib/constants.ts";
import { idSchema, querySchema } from "../../lib/records.ts";
import { getDb } from "../db.ts";
import { requireAdmin } from "../session.ts";
import type { Testimonial } from "../models.ts";

export async function listTestimonials(input: unknown = {}) {
  const query = querySchema.parse(input);
  const filter = { status: reviewStates.approved, hasConsent: true, isSample: false, publishedAt: { $lte: new Date(), $type: "date" as const } };
  const collection = getDb().collection<Testimonial>(collections.testimonials);
  const count = await collection.countDocuments(filter);
  const pageCount = Math.max(1, Math.min(1000, Math.ceil(count / query.size)));
  const page = Math.min(query.page, pageCount);
  const entries = await collection.find(filter).sort({ publishedAt: -1, _id: -1 }).skip((page - 1) * query.size).limit(query.size)
    .project<Pick<Testimonial, "_id" | "name" | "quote" | "image" | "publishedAt">>({ name: 1, quote: 1, image: 1, publishedAt: 1 }).toArray();
  return { entries, count, pageCount, page };
}

export async function saveReview(input: unknown) {
  await requireAdmin();
  const change = reviewEditSchema.parse(input);
  const collection = getDb().collection<Testimonial>(collections.testimonials);
  const id = change.id ? new ObjectId(change.id) : new ObjectId();
  const previous = change.id ? await collection.findOne({ _id: id, revision: change.revision }) : null;
  if (change.id && !previous) throw new MutationError(resultCodes.conflict, "این روایت تغییر کرده یا حذف شده است؛ نسخهٔ تازه را باز کنید.");
  const now = new Date();
  const publishedAt = change.record.status === reviewStates.approved ? (previous?.publishedAt && previous.publishedAt <= now ? previous.publishedAt : now) : previous?.publishedAt ?? null;
  const values = { ...change.record, updatedAt: now, publishedAt };
  if (change.id) {
    const updated = await collection.updateOne({ _id: id, revision: change.revision }, { $set: values, $inc: { revision: 1 } });
    requireWrite(updated);
    if (!updated.matchedCount) throw new MutationError(resultCodes.conflict, "نسخهٔ تازه‌تری ثبت شده است؛ آن را بررسی کنید.");
  } else {
    const inserted = await collection.insertOne({ ...values, _id: id, revision: 0, createdAt: now });
    requireWrite(inserted);
  }
  notifyChange({ topic: liveTopics.admin, id: id.toHexString(), audience: "admin" });
  if (previous?.status === reviewStates.approved || change.record.status === reviewStates.approved) notifyChange({ topic: liveTopics.content, id: collections.testimonials, audience: "public" });
  return { id: id.toHexString(), revision: change.id ? change.revision + 1 : 0 } satisfies Receipt;
}

export async function browseQueue(input: unknown) {
  await requireAdmin();
  const query = queueSchema.parse(input);
  if (query.kind !== "reviews") throw new MutationError(resultCodes.invalid, "بخش انتخابی معتبر نیست.");
  const status = query.status === "all" ? null : z.enum(reviewStates).parse(query.status);
  const search = { $regex: escapeSearch(query.q), $options: "i" };
  const filter = { ...(status ? { status } : {}), ...(query.q ? { name: search } : {}) };
  const collection = getDb().collection<Testimonial>(collections.testimonials);
  const count = await collection.countDocuments(filter);
  const pageCount = Math.max(1, Math.min(1000, Math.ceil(count / 8)));
  const page = Math.min(query.page, pageCount);
  const direction = query.sort === queueOrders.oldest ? 1 : -1;
  const entries = await collection.find(filter).project<Pick<Testimonial, "_id" | "name" | "status" | "createdAt">>({ name: 1, status: 1, createdAt: 1 })
    .sort({ createdAt: direction, _id: direction }).skip((page - 1) * 8).limit(8).toArray();
  return { entries, count, pageCount, query: { ...query, page } };
}

export async function getReview(input: unknown) {
  await requireAdmin();
  return getDb().collection<Testimonial>(collections.testimonials).findOne({ _id: new ObjectId(idSchema.parse(input)) });
}

export async function moderateReview(input: unknown) {
  await requireAdmin();
  const change = moderationSchema.parse(input);
  const current = await getReview(change.id);
  if (!current || current.revision !== change.revision) throw new MutationError(resultCodes.conflict, "این دیدگاه تغییر کرده یا حذف شده است؛ نسخهٔ تازه را بررسی کنید.");
  // Moderation cannot rewrite testimony or relabel a sample as genuine.
  return saveReview({ id: change.id, revision: change.revision, record: { ...current, status: change.status, hasConsent: change.hasConsent, image: change.isImageRemoved ? null : current.image } });
}
