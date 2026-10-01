import "server-only";
import { collections, siteKey } from "../../lib/constants.ts";
import { getDb } from "../db.ts";
import { requireAdmin } from "../session.ts";
import type { Settings } from "../models.ts";

export async function getSettings() {
  await requireAdmin();
  return getDb().collection<Settings>(collections.settings).findOne({ _id: siteKey });
}

export async function getSchedule() {
  return getDb().collection<Settings>(collections.settings).findOne<Pick<Settings, "isBookingEnabled" | "slotMinutes" | "hours">>(
    { _id: siteKey }, { projection: { _id: 0, isBookingEnabled: 1, slotMinutes: 1, hours: 1 } },
  );
}
