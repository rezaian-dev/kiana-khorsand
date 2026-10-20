import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { service } from "@/validations/models";

export const listServices = unstable_cache(
  async () => {
    const docs = await collection("services")
      .find({ status: "published" })
      .sort({ price: 1 })
      .toArray();
    return docs.map((doc) => service.parse(doc));
  },
  ["services-list"],
  { tags: ["services"], revalidate: 3600 },
);
