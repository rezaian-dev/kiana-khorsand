import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { workshop } from "@/validations/models";
import { editorialWorkshopCover } from "@/lib/editorial-covers";

export const listWorkshops = unstable_cache(
  async () => {
    const docs = await collection("workshops")
      .find({ status: "published" })
      .sort({ startsAt: 1 })
      .toArray();
    return docs.map((doc) => {
      const item = workshop.parse(doc);
      return {
        slug: item.slug,
        title: item.title,
        description: item.description,
        mode: item.mode,
        price: item.price,
        discount: item.discount ?? null,
        cover: editorialWorkshopCover(item.slug, item.cover),
        startsAt: item.startsAt?.toISOString() ?? null,
        endsAt: item.endsAt?.toISOString() ?? null,
      };
    });
  },
  ["workshops-list"],
  { tags: ["workshops"], revalidate: 3600 },
);

export const getWorkshop = unstable_cache(
  async (slug: string) => {
    const doc = await collection("workshops").findOne({
      slug,
      status: "published",
    });
    if (!doc) return null;
    const item = workshop.parse(doc);
    return {
      slug: item.slug,
      title: item.title,
      description: item.description,
      body: item.body,
      mode: item.mode,
      price: item.price,
      discount: item.discount ?? null,
      capacity: item.capacity,
      cover: editorialWorkshopCover(item.slug, item.cover),
      startsAt: item.startsAt?.toISOString() ?? null,
      endsAt: item.endsAt?.toISOString() ?? null,
    };
  },
  ["workshops-detail"],
  { tags: ["workshops"], revalidate: 3600 },
);
