import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { area } from "@/validations/models";

export const listAreas = unstable_cache(
  async () => {
    try {
      const docs = await collection("areas")
        .find({ status: "published" })
        .sort({ slug: 1 })
        .toArray();
      return docs.map((doc) => {
        const item = area.parse(doc);
        return {
          slug: item.slug,
          title: item.title,
          description: item.description,
          image: item.image,
        };
      });
    } catch {
      return [];
    }
  },
  ["areas-list"],
  { tags: ["areas"], revalidate: 3600 },
);

export const getArea = unstable_cache(
  async (slug: string) => {
    try {
      const doc = await collection("areas").findOne({
        slug,
        status: "published",
      });
      if (!doc) return null;
      const item = area.parse(doc);
      return {
        slug: item.slug,
        title: item.title,
        description: item.description,
        body: item.body,
        image: item.image,
      };
    } catch {
      return null;
    }
  },
  ["areas-detail"],
  { tags: ["areas"], revalidate: 3600 },
);
