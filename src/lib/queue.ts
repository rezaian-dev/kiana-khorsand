import { z } from "zod";
import { messageStates, reviewStates, routes } from "./constants";
import { changeSchema } from "./mutations";
import { idSchema, testimonialSchema } from "./records";
import type { SearchParams } from "./catalog";

export const queueKinds = { messages: "messages", reviews: "reviews" } as const;
export const queuePaths = { messages: routes.inbox, reviews: routes.reviews } as const;
export const queueTitles = { messages: "پیام‌ها", reviews: "دیدگاه‌ها" } as const;
export const queueLabels = { all: "همه", unread: "خوانده‌نشده", read: "خوانده‌شده", archived: "بایگانی‌شده", pending: "در انتظار بررسی", approved: "تأییدشده", rejected: "ردشده" } as const;
export const queueOrders = { newest: "newest", oldest: "oldest" } as const;
export const queueSchema = z.object({
  kind: z.enum(queueKinds), q: z.string().trim().max(80, "حداکثر ۸۰ نویسه بنویسید.").default(""),
  status: z.enum(["all", ...Object.values(messageStates), ...Object.values(reviewStates)]).default("all"),
  sort: z.enum(queueOrders).default(queueOrders.newest), page: z.coerce.number().int().min(1).max(1000).default(1),
  id: z.union([z.literal(""), idSchema]).default("").transform((value) => value.toLowerCase()),
}).refine((value) => value.status === "all" || (value.kind === queueKinds.messages ? Object.values(messageStates) : Object.values(reviewStates)).some((state) => state === value.status), { path: ["status"], error: "وضعیت با این بخش سازگار نیست." });
export const moderationSchema = changeSchema.extend({ status: z.enum(reviewStates), hasConsent: z.boolean(), isImageRemoved: z.boolean() }).refine((value) => value.status !== reviewStates.approved || value.hasConsent, { path: ["status"], error: "تأیید انتشار نیازمند رضایت معتبر برای همین روایت است." });
export type QueueKind = keyof typeof queueKinds;
export type QueueQuery = z.infer<typeof queueSchema>;
export type Moderation = z.infer<typeof moderationSchema>;
export type QueueEntry = { id: string; name: string; status: Exclude<QueueQuery["status"], "all">; createdAt: string };
export type InboxRecord = { id: string; revision: number; name: string; email: string; message: string; status: (typeof messageStates)[keyof typeof messageStates]; createdAt: string; updatedAt: string };
export type ReviewRecord = z.infer<typeof testimonialSchema> & { id: string; revision: number; createdAt: string; updatedAt: string };
type QueuePage = { query: QueueQuery; entries: QueueEntry[]; count: number; pageCount: number; hasError: boolean };
export type Queue = QueuePage & ({ kind: "messages"; selected: InboxRecord | null } | { kind: "reviews"; selected: ReviewRecord | null });

export function parseQueue(kind: QueueKind, params: SearchParams) {
  const result = queueSchema.safeParse({ kind, q: params.q, status: params.status, sort: params.sort, page: Array.isArray(params.page) ? "invalid" : params.page, id: params.id });
  return { query: result.success ? result.data : queueSchema.parse({ kind }), hasError: !result.success };
}
export function buildQueue(query: QueueQuery) {
  const value = queueSchema.parse(query);
  const params = new URLSearchParams({ status: value.status, sort: value.sort });
  if (value.q) params.set("q", value.q);
  if (value.page > 1) params.set("page", String(value.page));
  if (value.id) params.set("id", value.id);
  return `${queuePaths[value.kind]}?${params}`;
}
