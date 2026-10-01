import { MongoClient } from "mongodb";
import { getEnv } from "../lib/env.ts";

// No instance, socket, ping or index operation occurs on import. The official
// driver connects automatically on the first CRUD operation, not client.db().
const scope = globalThis as typeof globalThis & { kianaMongo?: MongoClient };

export function getClient() {
  if (!scope.kianaMongo) {
    const env = getEnv();
    scope.kianaMongo = new MongoClient(env.MONGODB_URI, {
      maxPoolSize: 10, serverSelectionTimeoutMS: 5000, connectTimeoutMS: 5000,
    });
  }
  return scope.kianaMongo;
}

export function getDb() {
  return getClient().db(getEnv().MONGODB_DB);
}

// Only the two manual scripts close the process-owned pool.
export async function closeDb() {
  const client = scope.kianaMongo;
  delete scope.kianaMongo;
  await client?.close();
}
