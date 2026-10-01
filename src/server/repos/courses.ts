import "server-only";
import { contentSchema, contentOrders } from "../../lib/publishing";
import { idSchema } from "../../lib/records";
import { MongoServerError, ObjectId } from "mongodb";
import { courseEditSchema } from "../../lib/mutations";
import { liveTopics, resultCodes, topics } from "../../lib/constants";
import { normalizeSearch } from "../../lib/catalog";
import type { Receipt } from "../../lib/result";
import { MutationError, requireWrite } from "../result";
import { requireIndexes } from "../indexes";
import { notifyChange } from "../changes";
import { collections, publicationStates } from "../../lib/constants.ts";
import { catalogSchema } from "../../lib/catalog.ts";
import { getDb } from "../db.ts";
import { requireAdmin } from "../session.ts";
import { buildFilter } from "../query.ts";
import type { Course } from "../models.ts";

function getPublished() {
  return { status: publicationStates.published, isReviewed: true, publishedAt: { $lte: new Date(), $type: "date" as const } };
}

export async function listCourses(input: unknown) {
  const query = catalogSchema.parse(input);
  const filter = { ...buildFilter(query), ...getPublished() };
  const collection = getDb().collection<Course>(collections.courses);
  const count = await collection.countDocuments(filter, { collation: { locale: "fa" } });
  const pageCount = Math.max(1, Math.min(1000, Math.ceil(count / 6)));
  const page = Math.min(query.page, pageCount);
  const entries = await collection.find(filter, { collation: { locale: "fa" } })
    .sort(query.sort === "title" ? { title: 1, slug: 1 } : { publishedAt: -1, slug: 1 }).skip((page - 1) * 6).limit(6).toArray();
  const categories = await collection.distinct("category", getPublished());
  return { entries, count, pageCount, query: { ...query, page }, categories };
}

export async function saveCourse(input: unknown) {
  await requireAdmin();
  const change = courseEditSchema.parse(input);
  await requireIndexes(collections.courses);
  const collection = getDb().collection<Course>(collections.courses);
  const id = change.id ? new ObjectId(change.id) : new ObjectId();
  const previous = change.id ? await collection.findOne({ _id: id, revision: change.revision }) : null;
  if (change.id && !previous) throw new MutationError(resultCodes.conflict, "این نوشته تغییر کرده یا حذف شده است؛ نسخهٔ تازه را باز کنید.");
  const now = new Date();
  const publishedAt = change.record.status === publicationStates.published ? (previous?.publishedAt && previous.publishedAt <= now ? previous.publishedAt : now) : previous?.publishedAt ?? null;
  const values = { ...change.record, search: normalizeSearch(`${change.record.title} ${change.record.description} ${topics[change.record.category]}`), updatedAt: now, publishedAt };
  try {
    if (change.id) {
      const updated = await collection.updateOne({ _id: id, revision: change.revision }, { $set: values, $inc: { revision: 1 } });
      requireWrite(updated);
      if (!updated.matchedCount) throw new MutationError(resultCodes.conflict, "ویرایش تازه‌تری ثبت شده است؛ آن را پیش از ذخیره بررسی کنید.");
    } else {
      const inserted = await collection.insertOne({ ...values, _id: id, createdAt: now, revision: 0 });
      requireWrite(inserted);
    }
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) throw new MutationError(resultCodes.conflict, "این نشانی قبلاً استفاده شده است.", { record: ["نشانی لاتینِ دیگری انتخاب کنید."] });
    throw error;
  }
  notifyChange({ topic: liveTopics.admin, id: id.toHexString(), audience: "admin" });
  if (previous?.status === publicationStates.published || change.record.status === publicationStates.published) notifyChange({ topic: liveTopics.content, id: collections.courses, audience: "public" });
  return { id: id.toHexString(), revision: change.id ? change.revision + 1 : 0 } satisfies Receipt;
}

export async function browseContent(input: unknown) {
  await requireAdmin();
  const query = contentSchema.parse(input);
  const filter = { ...buildFilter({ ...query, sort: "featured" }), ...(query.status !== "all" ? { status: query.status } : {}) };
  const collection = getDb().collection<Course>(collections.courses);
  const count = await collection.countDocuments(filter, { collation: { locale: "fa" } });
  const pageCount = Math.max(1, Math.min(1000, Math.ceil(count / 8)));
  const page = Math.min(query.page, pageCount);
  const entries = await collection.find(filter, { collation: { locale: "fa" } })
    .project<Pick<Course, "_id" | "title" | "slug" | "image" | "category" | "status" | "updatedAt" | "revision">>({ title: 1, slug: 1, image: 1, category: 1, status: 1, updatedAt: 1, revision: 1 })
    .sort(query.sort === contentOrders.title ? { title: 1, _id: 1 } : { updatedAt: -1, _id: -1 }).skip((page - 1) * 8).limit(8).toArray();
  return { entries, count, pageCount, query: { ...query, page } };
}

export async function readDraft(input: unknown) {
  await requireAdmin();
  return getDb().collection<Course>(collections.courses).findOne({ _id: new ObjectId(idSchema.parse(input)) });
}
