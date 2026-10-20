import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { testimonial } from "@/validations/models";
import { testimonialExperience } from "@/lib/testimonial-experience";

export const listTestimonials = unstable_cache(
  async () => {
    const docs = await collection("testimonials")
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .toArray();
    return docs.map((doc) => {
      const item = testimonial.parse(doc);
      return {
        slug: item.slug,
        name: item.name,
        quote: item.quote,
        category: item.category,
        experience: testimonialExperience(item),
        avatar: item.avatar,
      };
    });
  },
  ["testimonials-list"],
  { tags: ["testimonials"], revalidate: 3600 },
);
