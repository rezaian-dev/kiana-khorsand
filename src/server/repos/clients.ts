import "server-only";
import { ObjectId } from "mongodb";
import { collections, roles } from "../../lib/constants.ts";
import { idSchema, querySchema } from "../../lib/records.ts";
import { getDb } from "../db.ts";
import { requireAdmin } from "../session.ts";
import { escapeSearch } from "../query.ts";
import type { Client } from "../models.ts";

const projection = { name: 1, email: 1, phone: 1, emailVerified: 1, role: 1, createdAt: 1, updatedAt: 1 };

export async function listClients(input: unknown = {}) {
  await requireAdmin();
  const query = querySchema.parse(input);
  const search = { $regex: escapeSearch(query.q), $options: "i" };
  return getDb().collection<Client>(collections.users).find({
    role: roles.client,
    ...(query.q ? { $or: [{ name: search }, { email: search }, { phone: search }] } : {}),
  }, { projection }).sort({ createdAt: -1, _id: -1 }).skip((query.page - 1) * query.size).limit(query.size).toArray();
}

export async function getClient(id: unknown) {
  await requireAdmin();
  return getDb().collection<Client>(collections.users).findOne({ _id: new ObjectId(idSchema.parse(id)), role: roles.client }, { projection });
}
