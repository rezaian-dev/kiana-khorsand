import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getViewer } from "./viewer";
import { requireAdmin } from "./session";
import { summarizeAppointments } from "./repos/appointments";
import { summarizeClients, listNames } from "./repos/clients";
import { summarizeMessages } from "./repos/messages";
import { addDays, getDay, getInstant } from "@/lib/slots";
import { formatDate } from "@/lib/format";
import { appointmentStates, messageStates, roles, routes, serviceKeys } from "@/lib/constants";
import { idSchema } from "@/lib/records";
import type { AdminMessage, AdminVisit, Dashboard } from "@/lib/admin";

const countSchema = z.number().int().nonnegative();
const visitSchema = z.object({ userId: idSchema, service: z.enum(serviceKeys), status: z.enum(appointmentStates), startsAt: z.date(), endsAt: z.date(), updatedAt: z.date() }).refine((value) => value.endsAt > value.startsAt);
const messageSchema = z.object({ name: z.string().max(80), status: z.enum(messageStates), createdAt: z.date(), updatedAt: z.date() });

export const readAdmin = cache(async () => {
  await connection();
  const viewer = await getViewer();
  if (!viewer) redirect(routes.login);
  if (viewer.role !== roles.admin) redirect(routes.account);
  await requireAdmin();
  return viewer;
});

export const readDashboard = cache(async (): Promise<Dashboard> => {
  await readAdmin();
  const now = new Date();
  const day = getDay(now);
  const startDay = addDays(day, -6);
  const period = { today: day, now, start: getInstant(startDay, "00:00"), previous: getInstant(addDays(day, -13), "00:00") };
  const [appointments, clients, messages] = await Promise.all([summarizeAppointments(period), summarizeClients(period), summarizeMessages()]);
  const ids = [...new Set([...appointments.today, ...appointments.upcoming, ...appointments.activity].map((record) => idSchema.parse(record.userId)))];
  const names = new Map((await listNames(ids)).map((record) => [idSchema.parse(record._id.toHexString()), z.string().min(1).max(160).parse(record.name)]));
  function mapVisit(record: (typeof appointments.today)[number]): AdminVisit {
    const value = visitSchema.parse(record);
    return { id: idSchema.parse(record._id.toHexString()), name: names.get(value.userId) ?? "حساب در دسترس نیست", service: value.service, status: value.status, startsAt: value.startsAt.toISOString(), endsAt: value.endsAt.toISOString(), updatedAt: value.updatedAt.toISOString() };
  }
  function mapMessage(record: (typeof messages.entries)[number]): AdminMessage {
    const value = messageSchema.parse(record);
    return { id: idSchema.parse(record._id.toHexString()), name: value.name || "بدون نام", status: value.status, createdAt: value.createdAt.toISOString(), updatedAt: value.updatedAt.toISOString() };
  }
  const daily = new Map(appointments.daily.map((entry) => [z.iso.date().parse(entry._id), countSchema.parse(entry.count)]));
  const activity = [
    ...appointments.activity.map(mapVisit).map((record) => ({ key: `appointment-${record.id}`, label: `آخرین نسخهٔ نوبتِ ${record.name}`, at: record.updatedAt })),
    ...messages.activity.map(mapMessage).map((record) => ({ key: `message-${record.id}`, label: `آخرین نسخهٔ پیامِ ${record.name}`, at: record.updatedAt })),
  ].sort((a, b) => b.at.localeCompare(a.at) || a.key.localeCompare(b.key)).slice(0, 6);
  return {
    day, checkedAt: now.toISOString(), todayCount: countSchema.parse(appointments.todayCount), pendingCount: countSchema.parse(appointments.pendingCount),
    requests: countSchema.parse(appointments.requests), previousRequests: countSchema.parse(appointments.previousRequests), clients: countSchema.parse(clients.count),
    newClients: countSchema.parse(clients.recent), previousClients: countSchema.parse(clients.previous), unread: countSchema.parse(messages.unread),
    today: appointments.today.map(mapVisit), upcoming: appointments.upcoming.map(mapVisit), messages: messages.entries.map(mapMessage), activity,
    daily: Array.from({ length: 7 }, (_, index) => { const date = addDays(startDay, index); return { day: date, label: formatDate(getInstant(date, "12:00"), { month: "short", day: "numeric" }), count: daily.get(date) ?? 0 }; }),
  };
});
