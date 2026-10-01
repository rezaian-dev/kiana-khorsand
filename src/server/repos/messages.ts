import "server-only";
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
