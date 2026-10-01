import "server-only";
import { messageSchema } from "../../lib/message";
import { messageEditSchema } from "../../lib/mutations";
import { liveTopics, messageStates, resultCodes } from "../../lib/constants";
import type { Receipt } from "../../lib/result";
import { MutationError, requireWrite } from "../result";
import { notifyChange } from "../changes";
import { consumeRate } from "../rate";
import { ObjectId } from "mongodb";
import { collections } from "../../lib/constants.ts";
import { idSchema, inboxSchema, querySchema } from "../../lib/records.ts";
import { getDb } from "../db.ts";
import { requireAdmin } from "../session.ts";
import type { Message } from "../models.ts";

export async function listMessages(input: unknown = {}) {
  await requireAdmin();
  const query = querySchema.extend(inboxSchema.shape).parse(input);
  return getDb().collection<Message>(collections.messages).find(query.status ? { status: query.status } : {})
    .sort({ createdAt: -1, _id: -1 }).skip((query.page - 1) * query.size).limit(query.size).toArray();
}

export async function getMessage(id: unknown) {
  await requireAdmin();
  return getDb().collection<Message>(collections.messages).findOne({ _id: new ObjectId(idSchema.parse(id)) });
}


export async function createMessage(input: unknown) {
  const value = messageSchema.parse(input);
  // Shared single-node budget; never trust an arbitrary forwarded IP header.
  consumeRate("messages:public", 10);
  const now = new Date();
  const id = new ObjectId();
  const inserted = await getDb().collection<Message>(collections.messages).insertOne({ ...value, _id: id, createdAt: now, updatedAt: now, status: messageStates.unread, revision: 0 });
  requireWrite(inserted);
  notifyChange({ topic: liveTopics.admin, id: id.toHexString(), audience: "admin" });
  return { id: id.toHexString(), revision: 0 } satisfies Receipt;
}

export async function updateMessage(input: unknown) {
  await requireAdmin();
  const change = messageEditSchema.parse(input);
  const updated = await getDb().collection<Message>(collections.messages).updateOne({ _id: new ObjectId(change.id), revision: change.revision }, { $set: { status: change.status, updatedAt: new Date() }, $inc: { revision: 1 } });
  requireWrite(updated);
  if (!updated.matchedCount) throw new MutationError(resultCodes.conflict, "این پیام تغییر کرده است؛ نسخهٔ تازه را بررسی کنید.");
  notifyChange({ topic: liveTopics.admin, id: change.id, audience: "admin" });
  return { id: change.id, revision: change.revision + 1 } satisfies Receipt;
}

export async function summarizeMessages() {
  await requireAdmin();
  const collection = getDb().collection<Message>(collections.messages);
  type Preview = Pick<Message, "_id" | "name" | "status" | "createdAt" | "updatedAt">;
  const projection = { name: 1, status: 1, createdAt: 1, updatedAt: 1 };
  const [unread, entries, activity] = await Promise.all([
    collection.countDocuments({ status: messageStates.unread }),
    collection.find({ status: messageStates.unread }).project<Preview>(projection).sort({ createdAt: -1, _id: -1 }).limit(4).toArray(),
    collection.find({}).project<Preview>(projection).sort({ updatedAt: -1, _id: -1 }).limit(6).toArray(),
  ]);
  return { unread, entries, activity };
}
