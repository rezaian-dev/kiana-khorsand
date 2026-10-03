import "server-only";
import { collections, indexes, resultCodes } from "../lib/constants";
import { getDb } from "./db";
import { MutationError } from "./result";

type Collection = typeof collections.articles | typeof collections.courses | typeof collections.appointments;

export async function requireIndexes(name: Collection) {
  // Inspection only. No automatic DDL/migration or cached assumption about an index.
  const entries = await getDb().collection(name).listIndexes().toArray();
  if (name !== collections.appointments) {
    const hasSlug = entries.some((entry) => entry.unique && entry.key?.slug === 1 && Object.keys(entry.key).length === 1 && !entry.partialFilterExpression && !entry.sparse);
    if (!hasSlug) throw new MutationError(resultCodes.unavailable, "نمایهٔ یکتای نشانی‌ها آماده نیست؛ راه‌اندازی باید روی میزبان کامل شود.");
    return;
  }
  const hasSlot = entries.some((entry) => entry.name === indexes.slot && entry.unique && entry.key?.date === 1 && entry.key.slot === 1 && Object.keys(entry.key).length === 2 && entry.partialFilterExpression?.isReserved === true && Object.keys(entry.partialFilterExpression).length === 1);
  const hasMinutes = entries.some((entry) => entry.name === indexes.minutes && entry.unique && entry.key?.minutes === 1 && Object.keys(entry.key).length === 1 && entry.partialFilterExpression?.isReserved === true && Object.keys(entry.partialFilterExpression).length === 1);
  if (!hasSlot || !hasMinutes) throw new MutationError(resultCodes.unavailable, "ثبت درخواست در حال حاضر در دسترس نیست.");
}
