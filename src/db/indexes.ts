import "server-only";
import { db } from "./client";
import type { CollectionName } from "@/types/models";

// All indexes are idempotent; the _id index is provided by MongoDB.
export async function ensureIndexes() {
  const ensure = async (
    name: CollectionName,
    keys: Record<string, 1 | -1>,
    options: Parameters<
      ReturnType<typeof db.collection>["createIndex"]
    >[1] = {},
  ) => {
    await db.collection(name).createIndex(keys, options);
  };
  await ensure("users", { email: 1 }, { unique: true });
  await ensure("users", { username: 1 }, { unique: true, sparse: true });
  await ensure("sessions", { token: 1 }, { unique: true });
  await ensure("sessions", { expiresAt: 1 }, { expireAfterSeconds: 0 });
  await ensure("sessions", { userId: 1 });
  await ensure("accounts", { providerId: 1, accountId: 1 }, { unique: true });
  await ensure("accounts", { userId: 1 });
  await ensure("verifications", { identifier: 1 });
  await ensure("verifications", { expiresAt: 1 }, { expireAfterSeconds: 0 });
  for (const name of [
    "pages",
    "areas",
    "articles",
    "workshops",
    "testimonials",
    "faqs",
    "services",
    "assessments",
  ] as const) {
    await ensure(name, { slug: 1 }, { unique: true });
  }
  for (const name of [
    "areas",
    "articles",
    "workshops",
    "testimonials",
    "faqs",
    "services",
    "assessments",
  ] as const) {
    await ensure(name, { status: 1 });
  }
  await ensure("articles", { status: 1, publishedAt: -1 });
  await ensure("availability", { key: 1 }, { unique: true });
  await ensure(
    "appointments",
    { startsAt: 1 },
    {
      unique: true,
      partialFilterExpression: { status: { $in: ["pending", "confirmed"] } },
    },
  );
  await ensure("appointments", { userId: 1, startsAt: -1 });
  await ensure("appointments", { status: 1, startsAt: 1 });
  await ensure("payments", { invoice: 1 }, { unique: true });
  await ensure("payments", { userId: 1, paidAt: -1 });
  await ensure("payments", { userId: 1, _id: -1 });
  await ensure("payments", { appointmentId: 1 });
  await ensure("notes", { userId: 1, updatedAt: -1 });
  await ensure(
    "meetingNotes",
    { userId: 1, kind: 1, referenceId: 1 },
    { unique: true },
  );
  await ensure("threads", { userId: 1 }, { unique: true });
  await ensure("messages", { threadId: 1, createdAt: 1 });
  await ensure("messages", { userId: 1, readAt: 1 });
  await ensure("results", { userId: 1, createdAt: -1 });
  await ensure("enrollments", { userId: 1, workshopId: 1 }, { unique: true });
  await ensure(
    "workshopReviews",
    { userId: 1, workshopId: 1 },
    { unique: true },
  );
  await ensure("workshopReviews", { workshopId: 1, status: 1, createdAt: -1 });
  await ensure("enrollments", { workshopId: 1, createdAt: -1 });
  await ensure("avatars", { userId: 1 }, { unique: true });
  await ensure("articleCovers", { slug: 1 }, { unique: true });
  await ensure("contacts", { status: 1, createdAt: -1 });
  await ensure("limits", { key: 1 }, { unique: true });
  await ensure("limits", { expiresAt: 1 }, { expireAfterSeconds: 0 });
  return db.databaseName;
}
