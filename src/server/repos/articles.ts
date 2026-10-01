import "server-only";
import { MongoServerError, ObjectId } from "mongodb";
import { articleEditSchema, changeSchema } from "../../lib/mutations";
import { liveTopics, resultCodes, topics } from "../../lib/constants";
import { normalizeSearch } from "../../lib/catalog";
import type { Receipt } from "../../lib/result";
import { MutationError, requireWrite } from "../result";
import { requireIndexes } from "../indexes";
import { notifyChange } from "../changes";
import { collections, publicationStates } from "../../lib/constants.ts";
import { catalogSchema } from "../../lib/catalog.ts";
import { slugSchema } from "../../lib/records.ts";
import { getDb } from "../db.ts";
import { requireAdmin } from "../session.ts";
import { buildFilter } from "../query.ts";
import type { Article } from "../models.ts";

export async function listArticles(input: unknown) {
  const query = catalogSchema.parse(input);
  const filter = { ...buildFilter(query), status: publicationStates.published, isReviewed: true, publishedAt: { $lte: new Date(), $type: "date" as const } };
  const collection = getDb().collection<Article>(collections.articles);
  const count = await collection.countDocuments(filter, { collation: { locale: "fa" } });
  const pageCount = Math.max(1, Math.ceil(count / 6));
  const page = Math.min(query.page, pageCount);
  const entries = await collection.find(filter, { collation: { locale: "fa" } })
    .sort(query.sort === "title" ? { title: 1, slug: 1 } : { publishedAt: -1, slug: 1 }).skip((page - 1) * 6).limit(6).toArray();
  return { entries, count, pageCount, query: { ...query, page } };
}

export async function getArticle(slug: unknown) {
  return getDb().collection<Article>(collections.articles).findOne({ slug: slugSchema.parse(slug), status: publicationStates.published, isReviewed: true, publishedAt: { $lte: new Date(), $type: "date" } });
}

export async function listContent(input: unknown) {
  await requireAdmin();
  const query = catalogSchema.parse(input);
  return getDb().collection<Article>(collections.articles).find(buildFilter(query)).sort({ updatedAt: -1, _id: -1 }).skip((query.page - 1) * 12).limit(12).toArray();
}


export async function saveArticle(input: unknown) {
  await requireAdmin();
  const change = articleEditSchema.parse(input);
  await requireIndexes(collections.articles);
  const collection = getDb().collection<Article>(collections.articles);
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
  if (previous?.status === publicationStates.published || change.record.status === publicationStates.published) notifyChange({ topic: liveTopics.content, id: collections.articles, audience: "public" });
  return { id: id.toHexString(), revision: change.id ? change.revision + 1 : 0 } satisfies Receipt;
}

export async function deleteArticle(input: unknown) {
  await requireAdmin();
  const change = changeSchema.parse(input);
  const collection = getDb().collection<Article>(collections.articles);
  const previous = await collection.findOne({ _id: new ObjectId(change.id), revision: change.revision });
  if (!previous) throw new MutationError(resultCodes.conflict, "این رکورد تغییر کرده یا قبلاً حذف شده است؛ فهرست را تازه کنید.");
  const deleted = await collection.deleteOne({ _id: new ObjectId(change.id), revision: change.revision });
  requireWrite(deleted);
  if (!deleted.deletedCount) throw new MutationError(resultCodes.conflict, "این نوشته تغییر کرده یا قبلاً حذف شده است؛ فهرست را تازه کنید.");
  notifyChange({ topic: liveTopics.admin, id: change.id, audience: "admin" });
  if (previous.status === publicationStates.published) notifyChange({ topic: liveTopics.content, id: collections.articles, audience: "public" });
  return { id: change.id, revision: change.revision + 1 } satisfies Receipt;
}
