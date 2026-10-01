import "server-only";
import { z } from "zod";
import { readAdmin } from "./admin";
import { browseAgenda } from "./repos/appointments";
import { listNames } from "./repos/clients";
import { parseAgenda, type Agenda, type AgendaEntry } from "@/lib/agenda";
import { appointmentStates, serviceKeys } from "@/lib/constants";
import { idSchema } from "@/lib/records";
import { bookingSchema, revisionSchema } from "@/lib/mutations";
import { getDay, getInstant } from "@/lib/slots";
import type { SearchParams } from "@/lib/catalog";

type StoredVisit = Awaited<ReturnType<typeof browseAgenda>>["entries"][number];
const recordSchema = z.object({ userId: idSchema, date: z.iso.date(), slot: bookingSchema.shape.slot, service: z.enum(serviceKeys), status: z.enum(appointmentStates), revision: revisionSchema, startsAt: z.date(), endsAt: z.date(), updatedAt: z.date() })
  .refine((value) => value.endsAt > value.startsAt && getDay(value.startsAt) === value.date && getInstant(value.date, value.slot).getTime() === value.startsAt.getTime());

export function mapAppointment(record: StoredVisit, name: string, now: Date): AgendaEntry {
  const value = recordSchema.parse(record);
  const isActive = value.status === appointmentStates.pending || value.status === appointmentStates.confirmed;
  return { id: idSchema.parse(record._id.toHexString()), name, service: value.service, status: value.status, revision: value.revision, date: value.date, slot: value.slot, startsAt: value.startsAt.toISOString(), endsAt: value.endsAt.toISOString(), updatedAt: value.updatedAt.toISOString(),
    canConfirm: value.status === appointmentStates.pending && value.startsAt > now, canCancel: isActive, canMove: isActive && value.startsAt > now, canComplete: value.status === appointmentStates.confirmed && value.endsAt <= now };
}

export async function readAgenda(params: SearchParams): Promise<Agenda> {
  await readAdmin();
  const now = new Date();
  const today = getDay(now);
  const parsed = parseAgenda(params, today);
  const result = await browseAgenda(parsed.query);
  const ids = [...new Set(result.entries.map((record) => idSchema.parse(record.userId)))];
  const names = new Map((await listNames(ids)).map((record) => [idSchema.parse(record._id.toHexString()), z.string().min(1).max(160).parse(record.name)]));
  return { ...result, entries: result.entries.map((record) => mapAppointment(record, names.get(record.userId) ?? "حساب در دسترس نیست", now)), today, checkedAt: now.toISOString(), hasError: parsed.hasError };
}
