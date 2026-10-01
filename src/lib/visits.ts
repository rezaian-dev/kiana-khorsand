import { z } from "zod";
import { appointmentStates, routes, visitScopes } from "./constants";
import type { SearchParams } from "./catalog";
import type { appointmentSchema } from "./records";

export const visitsSchema = z.object({
  scope: z.enum(visitScopes).default(visitScopes.upcoming),
  page: z.coerce.number().int().min(1).max(1000).default(1),
});
export type VisitQuery = z.infer<typeof visitsSchema>;
export type Visit = Pick<z.infer<typeof appointmentSchema>, "service" | "status"> & {
  id: string; revision: number; startsAt: string; endsAt: string; canCancel: boolean;
};
export type Visits = { entries: Visit[]; count: number; pageCount: number; query: VisitQuery };
export const appointmentLabels: Record<(typeof appointmentStates)[keyof typeof appointmentStates], string> = {
  pending: "در انتظار تأیید", confirmed: "تأییدشده", cancelled: "لغوشده", completed: "برگزارشده",
};

export function parseVisits(params: SearchParams) {
  const parsed = visitsSchema.safeParse({ scope: params.scope, page: Array.isArray(params.page) ? "invalid" : params.page });
  return { query: parsed.success ? parsed.data : visitsSchema.parse({}), hasError: !parsed.success };
}

export function buildVisits(query: VisitQuery) {
  const params = new URLSearchParams();
  if (query.scope !== visitScopes.upcoming) params.set("scope", query.scope);
  if (query.page > 1) params.set("page", String(query.page));
  return `${routes.appointments}${params.size ? `?${params}` : ""}`;
}
