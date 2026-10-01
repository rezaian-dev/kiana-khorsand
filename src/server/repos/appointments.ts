import "server-only";
import { ObjectId } from "mongodb";
import { appointmentStates, collections, roles } from "../../lib/constants.ts";
import { idSchema, querySchema, rangeSchema } from "../../lib/records.ts";
import { getDb } from "../db.ts";
import { requireAdmin, requireSession } from "../session.ts";
import type { Appointment } from "../models.ts";

export async function listAppointments(input: unknown = {}) {
  const session = await requireSession();
  const query = querySchema.parse(input);
  return getDb().collection<Appointment>(collections.appointments).find({ userId: session.user.id })
    .sort({ startsAt: -1, _id: -1 }).skip((query.page - 1) * query.size).limit(query.size).toArray();
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

export async function listOccupied(input: unknown) {
  const range = rangeSchema.parse(input);
  // Public availability never exposes a client, appointment ID, note or status.
  const entries = await getDb().collection<Appointment>(collections.appointments).find({
    date: { $gte: range.from, $lte: range.to }, isReserved: true,
  }).project<Pick<Appointment, "date" | "slot">>({ _id: 0, date: 1, slot: 1 }).sort({ date: 1, slot: 1 }).limit(4001).toArray();
  if (entries.length > 4000) throw new Error("نمایش زمان‌های آزاد فعلاً ممکن نیست؛ بازه را کوتاه‌تر کنید.");
  return entries;
}

export async function countAppointments() {
  const session = await requireSession();
  return getDb().collection<Appointment>(collections.appointments).countDocuments({
    userId: session.user.id, status: { $in: [appointmentStates.pending, appointmentStates.confirmed] }, startsAt: { $gte: new Date() },
  });
}
