import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { settings } from "@/validations/models";

export const getSettings = unstable_cache(
  async () => {
    const document = await collection("settings").findOne({ _id: "site" });
    return document ? settings.parse(document) : null;
  },
  ["site-settings"],
  { tags: ["settings"], revalidate: 3600 },
);
