import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { page } from "@/validations/models";

export const getPage = unstable_cache(
  async (slug: string) => {
    const parsed = page.shape.slug.safeParse(slug);
    if (!parsed.success) return null;
    const document = await collection("pages").findOne({ slug: parsed.data });
    return document ? page.parse(document) : null;
  },
  ["site-pages"],
  { tags: ["pages"], revalidate: 3600 },
);
