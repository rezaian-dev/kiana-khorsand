import "server-only";
import { z } from "zod";
import { notFound } from "next/navigation";
import { readAdmin } from "./admin";
import { browseContent as browseArticles, readDraft as readArticle } from "./repos/articles";
import { browseContent as browseCourses, readDraft as readCourse } from "./repos/courses";
import { contentKinds, contentCardSchema, createDraft, editorSchema, parseContent, type ContentKind, type ContentList, type Draft } from "@/lib/publishing";
import { idSchema } from "@/lib/records";
import type { SearchParams } from "@/lib/catalog";

export async function readContent(kind: ContentKind, params: SearchParams): Promise<ContentList> {
  await readAdmin();
  const parsed = parseContent(params);
  const result = kind === contentKinds.article ? await browseArticles(parsed.query) : await browseCourses(parsed.query);
  return { ...result, kind, hasError: parsed.hasError, entries: result.entries.map((record) => contentCardSchema.parse({ ...record, id: record._id.toHexString(), updatedAt: z.date().parse(record.updatedAt).toISOString() })) };
}

export async function readEditor(kind: ContentKind, id: string): Promise<Draft> {
  await readAdmin();
  if (id === "new") return { value: createDraft(kind), updatedAt: null };
  if (!idSchema.safeParse(id).success) notFound();
  const record = kind === contentKinds.article ? await readArticle(id) : await readCourse(id);
  if (!record) notFound();
  return { value: editorSchema.parse({ kind, id: record._id.toHexString(), revision: record.revision, record }), updatedAt: z.date().parse(record.updatedAt).toISOString() };
}
