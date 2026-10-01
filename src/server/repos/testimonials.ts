import "server-only";
import { ObjectId } from "mongodb";
import { changeSchema, reviewEditSchema } from "../../lib/mutations";
import { liveTopics, resultCodes } from "../../lib/constants";
import type { Receipt } from "../../lib/result";
import { MutationError, requireWrite } from "../result";
import { notifyChange } from "../changes";
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

export async function deleteReview(input: unknown) {
  await requireAdmin();
  const change = changeSchema.parse(input);
  const collection = getDb().collection<Testimonial>(collections.testimonials);
  const previous = await collection.findOne({ _id: new ObjectId(change.id), revision: change.revision });
  if (!previous) throw new MutationError(resultCodes.conflict, "این رکورد تغییر کرده یا قبلاً حذف شده است؛ فهرست را تازه کنید.");
  const deleted = await collection.deleteOne({ _id: new ObjectId(change.id), revision: change.revision });
  requireWrite(deleted);
  if (!deleted.deletedCount) throw new MutationError(resultCodes.conflict, "این روایت تغییر کرده یا قبلاً حذف شده است؛ فهرست را تازه کنید.");
  notifyChange({ topic: liveTopics.admin, id: change.id, audience: "admin" });
  if (previous.status === reviewStates.approved) notifyChange({ topic: liveTopics.content, id: collections.testimonials, audience: "public" });
  return { id: change.id, revision: change.revision + 1 } satisfies Receipt;
}
