import "server-only";
import { settingsEditSchema } from "../../lib/mutations";
import { liveTopics, resultCodes } from "../../lib/constants";
import type { Receipt } from "../../lib/result";
import { MutationError, requireWrite } from "../result";
import { requireIndexes } from "../indexes";
import { notifyChange } from "../changes";
import { collections, siteKey } from "../../lib/constants.ts";
import { getDb } from "../db.ts";
import { requireAdmin } from "../session.ts";
import type { Settings } from "../models.ts";

export async function getSettings() {
  await requireAdmin();
  return getDb().collection<Settings>(collections.settings).findOne({ _id: siteKey });
}

export async function getSchedule() {
  return getDb().collection<Settings>(collections.settings).findOne<Pick<Settings, "isBookingEnabled" | "slotMinutes" | "hours" | "revision">>(
    { _id: siteKey }, { projection: { _id: 0, isBookingEnabled: 1, slotMinutes: 1, hours: 1, revision: 1 } },
  );
}


export async function saveSettings(input: unknown) {
  await requireAdmin();
  const change = settingsEditSchema.parse(input);
  if (change.record.isBookingEnabled) await requireIndexes(collections.appointments);
  // No upsert: the manual seed owns singleton creation; stale edits cannot reset it.
  const updated = await getDb().collection<Settings>(collections.settings).updateOne({ _id: siteKey, revision: change.revision }, { $set: { ...change.record, updatedAt: new Date() }, $inc: { revision: 1 } });
  requireWrite(updated);
  if (!updated.matchedCount) throw new MutationError(resultCodes.conflict, "تنظیمات تغییر کرده یا راه‌اندازی اولیه کامل نشده است؛ نسخهٔ تازه را بررسی کنید.");
  notifyChange({ topic: liveTopics.content, id: siteKey, audience: "public" }, { topic: liveTopics.slots, id: siteKey, audience: "public" }, { topic: liveTopics.admin, id: siteKey, audience: "admin" });
  return { id: siteKey, revision: change.revision + 1 } satisfies Receipt;
}
