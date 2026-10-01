import { z } from "zod";
import { appointmentStates, routes, serviceKeys } from "./constants";
import { idSchema } from "./records";
import { changeSchema, rescheduleSchema, revisionSchema } from "./mutations";
import { addDays, getInstant } from "./slots";
import type { SearchParams } from "./catalog";
import type { AdminVisit } from "./admin";

export const agendaViews = { table: "table", week: "week", month: "month" } as const;
export const agendaOrders = { ascending: "ascending", descending: "descending" } as const;
export const visitActions = { confirm: "confirm", cancel: "cancel", complete: "complete", move: "move" } as const;
export const agendaDateSchema = z.iso.date().refine((value) => value >= "2000-01-01" && value <= "2100-12-31");
export const agendaSchema = z.object({
  q: z.union([z.literal(""), idSchema]).default(""), client: z.union([z.literal(""), idSchema]).default("").transform((value) => value.toLowerCase()),
  date: agendaDateSchema, view: z.enum(agendaViews).default(agendaViews.table),
  status: z.enum(["all", ...Object.values(appointmentStates)]).default("all"),
  service: z.enum(["all", ...Object.values(serviceKeys)]).default("all"),
  sort: z.enum(agendaOrders).default(agendaOrders.ascending), page: z.coerce.number().int().min(1).max(1000).default(1),
});
export const operationSchema = changeSchema.extend({ action: z.enum(visitActions), date: z.string(), slot: z.string(), scheduleRevision: revisionSchema })
  .refine((value) => value.action !== visitActions.move || rescheduleSchema.safeParse(value).success, { path: ["slot"], error: "یک روز و ساعت معتبر از برنامهٔ تازه انتخاب کنید." });
export type AgendaQuery = z.infer<typeof agendaSchema>;
export type Operation = z.infer<typeof operationSchema>;
export type AgendaEntry = AdminVisit & { revision: number; date: string; slot: string; canConfirm: boolean; canCancel: boolean; canComplete: boolean; canMove: boolean };
export type Agenda = { query: AgendaQuery; entries: AgendaEntry[]; count: number; pageCount: number; today: string; checkedAt: string; hasError: boolean; isLimited: boolean; range: { from: string; to: string; previous: string; next: string } };

export function parseAgenda(params: SearchParams, today: string) {
  const result = agendaSchema.safeParse({ q: params.q, client: params.client, date: params.date ?? today, view: params.view, status: params.status, service: params.service, sort: params.sort, page: Array.isArray(params.page) ? "invalid" : params.page });
  return { query: result.success ? result.data : agendaSchema.parse({ date: today }), hasError: !result.success };
}

export function buildAgenda(query: AgendaQuery) {
  const value = agendaSchema.parse(query);
  const params = new URLSearchParams({ date: value.date, view: value.view, status: value.status, service: value.service, sort: value.sort });
  if (value.q) params.set("q", value.q);
  if (value.client) params.set("client", value.client);
  if (value.page > 1 && value.view === agendaViews.table) params.set("page", String(value.page));
  return `${routes.agenda}?${params}`;
}

const monthClock = new Intl.DateTimeFormat("fa-IR", { calendar: "persian", timeZone: "Asia/Tehran", numberingSystem: "latn", year: "numeric", month: "numeric" });
export function getRange(query: AgendaQuery) {
  let from = query.date;
  let to = addDays(from, 31);
  if (query.view === agendaViews.week) {
    const weekday = new Date(`${from}T12:00:00.000Z`).getUTCDay();
    from = addDays(from, -((weekday + 1) % 7));
    to = addDays(from, 6);
  } else if (query.view === agendaViews.month) {
    const month = monthClock.format(getInstant(query.date, "12:00"));
    for (let step = 0; step < 31; step += 1) {
      const previous = addDays(from, -1);
      if (monthClock.format(getInstant(previous, "12:00")) !== month) break;
      from = previous;
    }
    to = from;
    for (let step = 0; step < 30; step += 1) {
      const next = addDays(to, 1);
      if (monthClock.format(getInstant(next, "12:00")) !== month) break;
      to = next;
    }
  }
  return { from, to, previous: query.view === agendaViews.table ? addDays(from, -32) : addDays(from, -1), next: addDays(to, 1) };
}
