import { z } from "zod";
import { articleEditSchema, courseEditSchema, revisionSchema } from "./mutations";
import { articleSchema, idSchema } from "./records";
import { publicationStates, routes } from "./constants";
import type { SearchParams } from "./catalog";

export const contentKinds = { article: "article", course: "course" } as const;
export const contentOrders = { updated: "updated", title: "title" } as const;
export const contentPaths = { article: routes.adminArticles, course: routes.adminCourses } as const;
export const contentLabels = { article: "مقالات", course: "دوره‌ها" } as const;
export const contentSchema = z.object({
  q: z.string().trim().max(80, "حداکثر ۸۰ نویسه بنویسید.").default(""),
  category: z.union([z.literal("all"), articleSchema.shape.category]).default("all"),
  status: z.enum(["all", ...Object.values(publicationStates)]).default("all"),
  sort: z.enum(contentOrders).default(contentOrders.updated),
  page: z.coerce.number().int().min(1).max(1000).default(1),
});
export const editorSchema = z.discriminatedUnion("kind", [
  articleEditSchema.safeExtend({ kind: z.literal(contentKinds.article) }),
  courseEditSchema.safeExtend({ kind: z.literal(contentKinds.course) }),
]);
export const contentCardSchema = z.object({ id: idSchema, revision: revisionSchema, title: articleSchema.shape.title, slug: articleSchema.shape.slug, image: articleSchema.shape.image, category: articleSchema.shape.category, status: articleSchema.shape.status, updatedAt: z.iso.datetime() });
export type ContentKind = keyof typeof contentKinds;
export type ContentQuery = z.infer<typeof contentSchema>;
export type Editor = z.infer<typeof editorSchema>;
export type ContentCard = z.infer<typeof contentCardSchema>;
export type ContentList = { kind: ContentKind; query: ContentQuery; entries: ContentCard[]; count: number; pageCount: number; hasError: boolean };
export type Draft = { value: Editor; updatedAt: string | null };

export function parseContent(params: SearchParams) {
  const result = contentSchema.safeParse({ q: params.q, category: params.category, status: params.status, sort: params.sort, page: Array.isArray(params.page) ? "invalid" : params.page });
  return { query: result.success ? result.data : contentSchema.parse({}), hasError: !result.success };
}
export function buildContent(kind: ContentKind, query: ContentQuery) {
  const value = contentSchema.parse(query);
  const params = new URLSearchParams({ status: value.status, category: value.category, sort: value.sort });
  if (value.q) params.set("q", value.q);
  if (value.page > 1) params.set("page", String(value.page));
  return `${contentPaths[kind]}?${params}`;
}
export function createDraft(kind: ContentKind): Editor {
  const record = { title: "", slug: "", description: "", category: "start" as const, image: "journal" as const, status: publicationStates.draft, isReviewed: false, author: "" };
  return kind === contentKinds.article
    ? { kind, id: null, revision: 0, record: { ...record, social: "journal", introduction: "", sections: [{ key: "", title: "", paragraphs: [""], points: [] }], takeaway: "", sources: [] } }
    : { kind, id: null, revision: 0, record: { ...record, audience: "", outline: [""], boundary: "" } };
}
