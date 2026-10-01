import "server-only";
import { periodSchema } from "../../lib/admin";
import { z } from "zod";
import { bookingSchema, changeSchema, rescheduleSchema, statusSchema } from "../../lib/mutations";
import { appointmentSchema, settingsSchema } from "../../lib/records";
import { liveTopics, resultCodes } from "../../lib/constants";
import { addDays, buildMinutes, getDay, getInstant } from "../../lib/slots";
import type { Receipt, Slot } from "../../lib/result";
import { requireIndexes } from "../indexes";
import { getSchedule } from "./settings";
import { MutationError, requireWrite } from "../result";
import { notifyChange } from "../changes";
import { consumeRate } from "../rate";
import { visitsSchema } from "../../lib/visits";
import { visitScopes } from "../../lib/constants";
import { MongoServerError, ObjectId } from "mongodb";
import { appointmentStates, collections, roles } from "../../lib/constants.ts";
import { idSchema, rangeSchema } from "../../lib/records.ts";
import { getDb } from "../db.ts";
import { requireAdmin, requireSession } from "../session.ts";
import type { Appointment } from "../models.ts";

export async function listAppointments(input: unknown = {}) {
  const session = await requireSession();
  const query = visitsSchema.parse(input);
  const now = new Date();
  const filter = {
    userId: session.user.id,
    ...(query.scope === visitScopes.upcoming ? { status: { $in: [appointmentStates.pending, appointmentStates.confirmed] }, startsAt: { $gt: now } } : {}),
    ...(query.scope === visitScopes.past ? { $or: [{ startsAt: { $lte: now } }, { status: { $in: [appointmentStates.cancelled, appointmentStates.completed] } }] } : {}),
  };
  const collection = getDb().collection<Appointment>(collections.appointments);
  const count = await collection.countDocuments(filter);
  const pageCount = Math.max(1, Math.min(1000, Math.ceil(count / 6)));
  const page = Math.min(query.page, pageCount);
  const direction = query.scope === visitScopes.upcoming ? 1 : -1;
  const entries = await collection.find(filter)
    .project<Pick<Appointment, "_id" | "service" | "status" | "startsAt" | "endsAt" | "revision">>({ service: 1, status: 1, startsAt: 1, endsAt: 1, revision: 1 })
    .sort({ startsAt: direction, _id: direction }).skip((page - 1) * 6).limit(6).toArray();
  return { entries, count, pageCount, query: { ...query, page }, checkedAt: now };
}

export async function getAppointment(id: unknown) {
  const session = await requireSession();
  return getDb().collection<Appointment>(collections.appointments).findOne({
    _id: new ObjectId(idSchema.parse(id)),
    ...(session.user.role === roles.admin ? {} : { userId: session.user.id }),
  });
}

export async function listSchedule(input: unknown) {
  await requireAdmin();
  const range = rangeSchema.parse(input);
  const entries = await getDb().collection<Appointment>(collections.appointments).find({ date: { $gte: range.from, $lte: range.to } })
    .sort({ startsAt: 1, _id: 1 }).limit(4001).toArray();
  if (entries.length > 4000) throw new Error("بازهٔ انتخابی بیش از حد بزرگ است؛ بازه را کوتاه‌تر کنید.");
  return entries;
}

async function readOccupied(range: z.infer<typeof rangeSchema>, excludedId?: ObjectId) {
  const entries = await getDb().collection<Appointment>(collections.appointments).find({
    date: { $gte: range.from, $lte: range.to }, isReserved: true, ...(excludedId ? { _id: { $ne: excludedId } } : {}),
  }).project<Pick<Appointment, "date" | "slot" | "startsAt" | "endsAt">>({ _id: 0, date: 1, slot: 1, startsAt: 1, endsAt: 1 }).sort({ date: 1, slot: 1 }).limit(4001).toArray();
  if (entries.length > 4000) throw new MutationError(resultCodes.unavailable, "بازهٔ نمایش زمان‌ها را کوتاه‌تر کنید.");
  for (const entry of entries) {
    buildMinutes(entry.startsAt, entry.endsAt);
    if (getInstant(entry.date, entry.slot).getTime() !== entry.startsAt.getTime()) throw new Error("Stored appointment time is inconsistent.");
  }
  return entries;
}

export async function listOccupied(input: unknown) {
  // Public projection: only occupied time intervals, never identity/status/IDs.
  return readOccupied(rangeSchema.parse(input));
}

export async function countAppointments() {
  const session = await requireSession();
  return getDb().collection<Appointment>(collections.appointments).countDocuments({
    userId: session.user.id, status: { $in: [appointmentStates.pending, appointmentStates.confirmed] }, startsAt: { $gte: new Date() },
  });
}


const scheduleSchema = z.object({ isBookingEnabled: z.boolean(), slotMinutes: settingsSchema.shape.slotMinutes, hours: settingsSchema.shape.hours, revision: z.number().int().nonnegative() });

async function readSlots(input: unknown, excludedId?: ObjectId): Promise<Slot[]> {
  const range = rangeSchema.parse(input);
  const stored = await getSchedule();
  if (!stored) return [];
  const schedule = scheduleSchema.parse(stored);
  if (!schedule.isBookingEnabled) return [];
  if (!schedule.slotMinutes || !schedule.hours.length) throw new MutationError(resultCodes.unavailable, "برنامهٔ زمانی هنوز کامل نیست.");
  const now = new Date();
  const today = getDay(now);
  const slots: Slot[] = [];
  // A bounded rolling window, not invented working hours or a fee/cancellation policy.
  const first = range.from > today ? range.from : today;
  const horizon = addDays(today, 31);
  const last = range.to < horizon ? range.to : horizon;
  if (first > last) return [];
  const occupied = await readOccupied({ from: first, to: last }, excludedId);
  for (let date = first; date <= last; date = addDays(date, 1)) {
    const day = new Date(`${date}T00:00:00.000Z`).getUTCDay();
    for (const hours of schedule.hours.filter((hours) => hours.day === day)) {
      const start = Number(hours.start.slice(0, 2)) * 60 + Number(hours.start.slice(3));
      const end = Number(hours.end.slice(0, 2)) * 60 + Number(hours.end.slice(3));
      for (let minute = start; minute + schedule.slotMinutes <= end; minute += schedule.slotMinutes) {
        const slot = `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
        const startsAt = getInstant(date, slot);
        const endMinute = minute + schedule.slotMinutes;
        const endSlot = `${String(Math.floor(endMinute / 60)).padStart(2, "0")}:${String(endMinute % 60).padStart(2, "0")}`;
        const endsAt = getInstant(date, endSlot);
        if (endsAt.getTime() - startsAt.getTime() !== schedule.slotMinutes * 60_000) continue;
        if (startsAt <= now || occupied.some((entry) => entry.startsAt < endsAt && entry.endsAt > startsAt)) continue;
        slots.push({ date, slot, startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString(), scheduleRevision: schedule.revision });
      }
    }
  }
  return slots.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export async function listSlots(input: unknown) { return readSlots(input); }

async function findAlternatives(date: string, slot: string, excludedId?: ObjectId) {
  const today = getDay(new Date());
  const requested = getInstant(date, slot).getTime();
  const slots = await readSlots({ from: today, to: addDays(today, 31) }, excludedId);
  return slots.sort((a, b) => Math.abs(Date.parse(a.startsAt) - requested) - Math.abs(Date.parse(b.startsAt) - requested) || a.startsAt.localeCompare(b.startsAt)).slice(0, 3);
}

async function getSelection(change: Pick<z.infer<typeof bookingSchema>, "date" | "slot" | "scheduleRevision">, excludedId?: ObjectId) {
  const today = getDay(new Date());
  if (change.date < today || change.date > addDays(today, 31)) throw new MutationError(resultCodes.invalid, "یکی از روزهای بازهٔ فعلی را انتخاب کنید.", { date: ["روز انتخابی خارج از بازهٔ فعلی رزرو است."] });
  const slots = await readSlots({ from: change.date, to: change.date }, excludedId);
  const selected = slots.find((slot) => slot.slot === change.slot);
  if (!selected || selected.scheduleRevision !== change.scheduleRevision) {
    throw new MutationError(resultCodes.conflict, "زمان یا برنامه تغییر کرده است؛ زمان‌های تازه را بررسی کنید.", { slot: ["این انتخاب باید دوباره بررسی شود."] }, await findAlternatives(change.date, change.slot, excludedId));
  }
  await requireIndexes(collections.appointments);
  return selected;
}

function announceAppointment(id: string, userId: string, ...dates: string[]) {
  notifyChange({ topic: liveTopics.appointments, id, audience: `user:${userId}` }, { topic: liveTopics.admin, id, audience: "admin" }, ...Array.from(new Set(dates.filter((date) => z.iso.date().safeParse(date).success)), (date) => ({ topic: liveTopics.slots, id: date, audience: "public" as const })));
}

async function reportConflict(error: unknown, date: string, slot: string, excludedId?: ObjectId): Promise<never> {
  if (!(error instanceof MongoServerError) || error.code !== 11000) throw error;
  let alternatives: Slot[] = [];
  try { alternatives = await findAlternatives(date, slot, excludedId); } catch { /* Keep the known slot conflict if the suggestion read fails. */ }
  throw new MutationError(resultCodes.occupied, "این زمان هم‌زمان رزرو شد؛ یکی از زمان‌های نزدیک را انتخاب کنید. اگر درخواست قبلی بی‌پاسخ ماند، نوبت‌های خود را هم بررسی کنید.", { slot: ["زمان انتخابی دیگر آزاد نیست."] }, alternatives);
}

export async function createAppointment(input: unknown): Promise<Receipt> {
  const session = await requireSession();
  consumeRate(`booking:${session.user.id}`, 10);
  const change = bookingSchema.parse(input);
  const selected = await getSelection(change);
  const startsAt = new Date(selected.startsAt);
  const endsAt = new Date(selected.endsAt);
  const value = appointmentSchema.parse({ userId: session.user.id, service: change.service, date: selected.date, slot: selected.slot, startsAt, endsAt, status: appointmentStates.pending, isReserved: true });
  const id = new ObjectId();
  const now = new Date();
  if (startsAt <= now) throw new MutationError(resultCodes.conflict, "زمان انتخابی گذشته است؛ زمان تازه‌ای انتخاب کنید.");
  try {
    const inserted = await getDb().collection<Appointment>(collections.appointments).insertOne({ ...value, _id: id, minutes: buildMinutes(startsAt, endsAt), scheduleRevision: selected.scheduleRevision, revision: 0, createdAt: now, updatedAt: now });
    requireWrite(inserted);
  } catch (error) { return reportConflict(error, change.date, change.slot); }
  announceAppointment(id.toHexString(), session.user.id, selected.date);
  return { id: id.toHexString(), revision: 0 };
}

export async function cancelAppointment(input: unknown): Promise<Receipt> {
  const session = await requireSession();
  consumeRate(`appointment:${session.user.id}`, 20);
  const change = changeSchema.parse(input);
  const collection = getDb().collection<Appointment>(collections.appointments);
  const current = await collection.findOne({ _id: new ObjectId(change.id), userId: session.user.id, revision: change.revision });
  if (!current) throw new MutationError(resultCodes.conflict, "نوبت متعلق به حساب شما پیدا نشد یا تغییر کرده است؛ فهرست را تازه کنید.");
  const now = new Date();
  const updated = await collection.updateOne({ _id: current._id, userId: session.user.id, revision: change.revision, status: { $in: [appointmentStates.pending, appointmentStates.confirmed] }, startsAt: { $gt: now } }, { $set: { status: appointmentStates.cancelled, isReserved: false, updatedAt: now }, $inc: { revision: 1 } });
  requireWrite(updated);
  if (!updated.matchedCount) throw new MutationError(resultCodes.conflict, "این نوبت تغییر کرده یا دیگر قابل لغو نیست؛ وضعیت تازه را بررسی کنید.");
  announceAppointment(change.id, current.userId, current.date);
  return { id: change.id, revision: change.revision + 1 };
}

export async function updateStatus(input: unknown): Promise<Receipt> {
  await requireAdmin();
  const change = statusSchema.parse(input);
  const collection = getDb().collection<Appointment>(collections.appointments);
  const current = await collection.findOne({ _id: new ObjectId(change.id), revision: change.revision });
  if (!current) throw new MutationError(resultCodes.conflict, "این نوبت تغییر کرده است؛ نسخهٔ تازه را بررسی کنید.");
  if (current.status === change.status) return { id: change.id, revision: change.revision };
  const canChange = (current.status === appointmentStates.pending && (change.status === appointmentStates.confirmed || change.status === appointmentStates.cancelled)) || (current.status === appointmentStates.confirmed && (change.status === appointmentStates.cancelled || change.status === appointmentStates.completed));
  const now = new Date();
  if (!canChange || (change.status === appointmentStates.completed && current.endsAt > now) || (change.status === appointmentStates.confirmed && current.startsAt <= now)) throw new MutationError(resultCodes.invalid, "این تغییر وضعیت در حال حاضر مجاز نیست.", { status: ["وضعیت و زمان جلسه را بررسی کنید."] });
  const minutes = change.status === appointmentStates.cancelled ? current.minutes : buildMinutes(current.startsAt, current.endsAt);
  if (change.status !== appointmentStates.cancelled) {
    if (getInstant(current.date, current.slot).getTime() !== current.startsAt.getTime()) throw new Error("Stored appointment time is inconsistent.");
    await requireIndexes(collections.appointments);
  }
  const updated = await collection.updateOne({ _id: current._id, revision: change.revision, status: current.status }, { $set: { ...(minutes ? { minutes } : {}), status: change.status, isReserved: change.status !== appointmentStates.cancelled, updatedAt: now }, $inc: { revision: 1 } });
  requireWrite(updated);
  if (!updated.matchedCount) throw new MutationError(resultCodes.conflict, "نوبت هم‌زمان تغییر کرده است؛ نسخهٔ تازه را بررسی کنید.");
  announceAppointment(change.id, current.userId, current.date);
  return { id: change.id, revision: change.revision + 1 };
}

export async function rescheduleAppointment(input: unknown): Promise<Receipt> {
  await requireAdmin();
  const change = rescheduleSchema.parse(input);
  const collection = getDb().collection<Appointment>(collections.appointments);
  const current = await collection.findOne({ _id: new ObjectId(change.id), revision: change.revision });
  if (!current || ![appointmentStates.pending, appointmentStates.confirmed].some((status) => status === current.status) || current.startsAt <= new Date()) throw new MutationError(resultCodes.conflict, "این نوبت تغییر کرده یا دیگر قابل جابه‌جایی نیست.");
  const selected = await getSelection(change, current._id);
  const startsAt = new Date(selected.startsAt);
  const endsAt = new Date(selected.endsAt);
  const now = new Date();
  if (startsAt <= now) throw new MutationError(resultCodes.conflict, "زمان انتخابی گذشته است؛ زمان تازه‌ای انتخاب کنید.");
  try {
    const updated = await collection.updateOne({ _id: current._id, revision: change.revision, status: current.status, startsAt: { $gt: now } }, { $set: { isReserved: true, date: selected.date, slot: selected.slot, startsAt, endsAt, minutes: buildMinutes(startsAt, endsAt), scheduleRevision: selected.scheduleRevision, updatedAt: new Date() }, $inc: { revision: 1 } });
    requireWrite(updated);
    if (!updated.matchedCount) throw new MutationError(resultCodes.conflict, "نوبت هم‌زمان تغییر کرده است؛ نسخهٔ تازه را بررسی کنید.");
  } catch (error) { return reportConflict(error, change.date, change.slot, current._id); }
  announceAppointment(change.id, current.userId, current.date, selected.date);
  return { id: change.id, revision: change.revision + 1 };
}

export async function summarizeAppointments(input: unknown) {
  await requireAdmin();
  const period = periodSchema.parse(input);
  const collection = getDb().collection<Appointment>(collections.appointments);
  const active = { status: { $in: [appointmentStates.pending, appointmentStates.confirmed] } };
  const projection = { userId: 1, service: 1, status: 1, startsAt: 1, endsAt: 1, updatedAt: 1 };
  type Summary = Pick<Appointment, "_id" | "userId" | "service" | "status" | "startsAt" | "endsAt" | "updatedAt">;
  const [todayCount, pendingCount, requests, previousRequests, today, upcoming, activity, daily] = await Promise.all([
    collection.countDocuments({ ...active, date: period.today }),
    collection.countDocuments({ status: appointmentStates.pending, startsAt: { $gt: period.now } }),
    collection.countDocuments({ createdAt: { $gte: period.start, $lte: period.now } }),
    collection.countDocuments({ createdAt: { $gte: period.previous, $lt: period.start } }),
    collection.find({ ...active, date: period.today }).project<Summary>(projection).sort({ startsAt: 1, _id: 1 }).limit(6).toArray(),
    collection.find({ ...active, date: { $gt: period.today }, startsAt: { $gt: period.now } }).project<Summary>(projection).sort({ startsAt: 1, _id: 1 }).limit(5).toArray(),
    collection.find({}).project<Summary>(projection).sort({ updatedAt: -1, _id: -1 }).limit(6).toArray(),
    collection.aggregate<{ _id: string; count: number }>([
      { $match: { date: { $gte: getDay(period.start), $lte: period.today } } },
      { $group: { _id: "$date", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]).toArray(),
  ]);
  return { todayCount, pendingCount, requests, previousRequests, today, upcoming, activity, daily };
}
