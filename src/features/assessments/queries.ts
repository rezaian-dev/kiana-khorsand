import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { assessment } from "@/validations/models";

export const listAssessments = unstable_cache(
  async () => {
    const docs = await collection("assessments")
      .find({ status: "published" })
      .toArray();
    return docs.map((doc) => {
      const item = assessment.parse(doc);
      return {
        slug: item.slug,
        title: item.title,
        introduction: item.introduction,
        questionCount: item.questions.length,
      };
    });
  },
  ["assessments-list"],
  { tags: ["assessments"], revalidate: 3600 },
);

export const getAssessment = unstable_cache(
  async (slug: string) => {
    const doc = await collection("assessments").findOne({
      slug,
      status: "published",
    });
    return doc ? assessment.parse(doc) : null;
  },
  ["assessments-detail"],
  { tags: ["assessments"], revalidate: 3600 },
);
