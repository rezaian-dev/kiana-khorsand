import "server-only";
import { collection } from "@/db/collections";
import { requireAdmin } from "@/lib/session";
import type { AdminUserSummary } from "./types";

/**
 * Reads for the administrator's user directory.
 * Guarded here as well as in the route: a Server Component is not the only caller.
 */
export async function listUsers(): Promise<AdminUserSummary[]> {
  await requireAdmin();

  const docs = await collection("users")
    .find(
      {},
      {
        projection: {
          name: 1,
          username: 1,
          email: 1,
          role: 1,
          createdAt: 1,
        },
      },
    )
    .sort({ createdAt: -1 })
    .limit(500)
    .toArray();

  return docs.map((doc) => ({
    id: String(doc._id),
    name: typeof doc.name === "string" && doc.name.trim() ? doc.name : "بدون نام",
    phone: typeof doc.username === "string" ? doc.username : "",
    role: doc.role === "admin" ? "admin" : "user",
    createdAt: doc.createdAt ?? null,
  }));
}

/** Cheap counters for the page header — one round trip. */
export async function userTotals() {
  await requireAdmin();
  const users = collection("users");
  const [total, admins] = await Promise.all([
    users.countDocuments({}),
    users.countDocuments({ role: "admin" }),
  ]);
  return { total, admins, clients: Math.max(0, total - admins) };
}
