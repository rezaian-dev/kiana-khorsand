import "server-only";
import { z } from "zod";
import { readAdmin } from "./admin";
import { requireAdmin } from "./session";
import { browseClients, listClients, listNames } from "./repos/clients";
import { getAppointment, listHistory } from "./repos/appointments";
import { mapAppointment } from "./agenda";
import { parseClients, recordSearchSchema, type Clients, type RecordHits } from "@/lib/clients";
import type { SearchParams } from "@/lib/catalog";
import { idSchema, phoneSchema } from "@/lib/records";
import { formatDate } from "@/lib/format";
import { services } from "@/content/services";

const profileSchema = z.object({ name: z.string().min(1).max(160), email: z.email(), phone: phoneSchema.optional(), emailVerified: z.boolean(), createdAt: z.date() });

export async function readClients(params: SearchParams): Promise<Clients> {
  await readAdmin();
  const now = new Date();
  const parsed = parseClients(params);
  const result = await browseClients(parsed.query);
  const entries = await Promise.all(result.entries.map(async (record) => {
    const value = profileSchema.parse(record);
    const id = idSchema.parse(record._id.toHexString());
    const history = await listHistory({ id, page: result.query.history === id ? result.query.historyPage : 1 });
    return { id, name: value.name, email: value.email, phone: value.phone ?? "", isEmailVerified: value.emailVerified, createdAt: value.createdAt.toISOString(), history: { ...history, entries: history.entries.map((entry) => mapAppointment(entry, value.name, now)) } };
  }));
  return { ...result, entries, checkedAt: now.toISOString(), hasError: parsed.hasError };
}

export async function searchRecords(input: unknown): Promise<RecordHits> {
  await requireAdmin();
  const query = recordSearchSchema.parse(input);
  const clients = await listClients({ q: query.q, size: 6 });
  const record = idSchema.safeParse(query.q).success ? await getAppointment(query.q) : null;
  const names = record ? await listNames([idSchema.parse(record.userId)]) : [];
  const entry = record ? mapAppointment(record, names[0] ? z.string().min(1).max(160).parse(names[0].name) : "حساب در دسترس نیست", new Date()) : null;
  return { clients: clients.map((client) => ({ id: idSchema.parse(client._id.toHexString()), name: z.string().min(1).max(160).parse(client.name) })), appointments: entry ? [{ id: entry.id, label: `${entry.name} · ${services.find((service) => service.key === entry.service)?.title ?? "جلسهٔ مشاوره"} · ${formatDate(new Date(entry.startsAt))}` }] : [] };
}
