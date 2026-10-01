import { z } from "zod";
import { routes } from "./constants";
import { idSchema } from "./records";
import type { SearchParams } from "./catalog";
import type { AgendaEntry } from "./agenda";

export const clientOrders = { newest: "newest", name: "name" } as const;
export const clientSchema = z.object({
  q: z.string().trim().max(80, "حداکثر ۸۰ نویسه بنویسید.").default(""), sort: z.enum(clientOrders).default(clientOrders.newest),
  page: z.coerce.number().int().min(1).max(1000).default(1), history: z.union([z.literal(""), idSchema]).default(""),
  historyPage: z.coerce.number().int().min(1).max(1000).default(1),
});
export const historySchema = z.object({ id: idSchema, page: z.coerce.number().int().min(1).max(1000).default(1) });
export const recordSearchSchema = z.object({ q: z.string().trim().min(2, "دست‌کم دو نویسه بنویسید.").max(80, "حداکثر ۸۰ نویسه بنویسید.") });
export type ClientQuery = z.infer<typeof clientSchema>;
export type ClientEntry = { id: string; name: string; email: string; phone: string; isEmailVerified: boolean; createdAt: string; history: { entries: AgendaEntry[]; page: number; count: number; pageCount: number } };
export type Clients = { entries: ClientEntry[]; query: ClientQuery; count: number; pageCount: number; checkedAt: string; hasError: boolean };
export type RecordHits = { clients: { id: string; name: string }[]; appointments: { id: string; label: string }[] };

export function parseClients(params: SearchParams) {
  const result = clientSchema.safeParse({ q: params.q, sort: params.sort, page: Array.isArray(params.page) ? "invalid" : params.page, history: params.history, historyPage: Array.isArray(params.historyPage) ? "invalid" : params.historyPage });
  return { query: result.success ? result.data : clientSchema.parse({}), hasError: !result.success };
}
export function buildClients(query: ClientQuery) {
  const value = clientSchema.parse(query);
  const params = new URLSearchParams({ sort: value.sort });
  if (value.q) params.set("q", value.q);
  if (value.page > 1) params.set("page", String(value.page));
  if (value.history) { params.set("history", value.history); params.set("historyPage", String(value.historyPage)); }
  return `${routes.clients}?${params}`;
}
