import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { faq } from "@/validations/models";

export const listFaqs = unstable_cache(
  async () => {
    const docs = await collection("faqs")
      .find({ status: "published" })
      .sort({ slug: 1 })
      .toArray();
    return docs.map((doc) => faq.parse(doc));
  },
  ["faqs-list"],
  { tags: ["faqs"], revalidate: 3600 },
);
