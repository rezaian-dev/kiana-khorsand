import { buildMinutes, getInstant } from "../src/lib/slots.ts";
import type { Appointment } from "../src/server/models.ts";
import { collections, indexes } from "../src/lib/constants.ts";
import { getDb, closeDb } from "../src/server/db.ts";

// MANUAL ONLY. Do not import from the app, build hooks or seed script.
try {
  const db = getDb();
  // Refuse legacy/inconsistent reservations; never silently migrate or delete them.
  const reservations = db.collection<Appointment>(collections.appointments).find({ isReserved: true });
  for await (const entry of reservations) {
    const minutes = buildMinutes(entry.startsAt, entry.endsAt);
    if (getInstant(entry.date, entry.slot).getTime() !== entry.startsAt.getTime() || !Array.isArray(entry.minutes) || minutes.length !== entry.minutes.length || minutes.some((minute, index) => minute !== entry.minutes[index])) throw new Error("Reserved appointments require consistent minute keys before index setup.");
  }
  await db.collection(collections.users).createIndex({ email: 1 }, { name: "users_email_uidx", unique: true });
  await db.collection(collections.users).createIndex({ role: 1, createdAt: -1, _id: -1 }, { name: "clients_created" });
  await db.collection(collections.sessions).createIndex({ token: 1 }, { name: "sessions_token_uidx", unique: true });
  await db.collection(collections.sessions).createIndex({ userId: 1 }, { name: "sessions_userId_idx" });
  await db.collection(collections.sessions).createIndex({ expiresAt: 1 }, { name: "sessions_expiry", expireAfterSeconds: 0 });
  await db.collection(collections.accounts).createIndex({ providerId: 1, accountId: 1 }, { name: "accounts_provider", unique: true });
  await db.collection(collections.accounts).createIndex({ userId: 1 }, { name: "accounts_userId_idx" });
  await db.collection(collections.verification).createIndex({ identifier: 1 }, { name: "verification_identifier_idx" });
  await db.collection(collections.verification).createIndex({ expiresAt: 1 }, { name: "verification_expiry", expireAfterSeconds: 0 });
  // Better Auth lastRequest is a number, not a BSON Date: do not attach TTL.
  await db.collection(collections.rateLimit).createIndex({ key: 1 }, { name: "rateLimit_key_uidx", unique: true });
  await db.collection(collections.appointments).createIndex({ date: 1, slot: 1 }, { name: indexes.slot, unique: true, partialFilterExpression: { isReserved: true } });
  await db.collection(collections.appointments).createIndex({ minutes: 1 }, { name: indexes.minutes, unique: true, partialFilterExpression: { isReserved: true } });
  await db.collection(collections.appointments).createIndex({ userId: 1, startsAt: -1, _id: -1 }, { name: "appointment_user" });
  await db.collection(collections.appointments).createIndex({ date: 1, startsAt: 1, _id: 1 }, { name: "appointment_calendar" });
  for (const name of [collections.articles, collections.courses]) {
    await db.collection(name).createIndex({ slug: 1 }, { name: `${name}_slug`, unique: true });
    await db.collection(name).createIndex({ status: 1, isReviewed: 1, publishedAt: -1, slug: 1 }, { name: `${name}_published`, collation: { locale: "fa" } });
  }
  await db.collection(collections.testimonials).createIndex({ status: 1, hasConsent: 1, isSample: 1, publishedAt: -1, _id: -1 }, { name: "testimonials_public" });
  await db.collection(collections.messages).createIndex({ status: 1, createdAt: -1, _id: -1 }, { name: "messages_inbox" });
  console.log("نمایه‌ها ایجاد یا تأیید شدند؛ پاک‌سازی خودکار نشست‌ها و توکن‌های منقضی‌شده با TTL فعال است.");
} catch {
  console.error("ساخت نمایه‌ها کامل نشد. اتصال، دسترسی و تعارض نمایه/داده را روی دستگاه خود بررسی کنید؛ برای رفع تعارض، سند یا نمایه‌ای خودکار حذف نمی‌شود.");
  process.exitCode = 1;
} finally {
  try { await closeDb(); } catch { process.exitCode = 1; }
}
