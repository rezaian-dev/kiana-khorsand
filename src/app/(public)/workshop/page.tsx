import type { LegacySlugPageProps } from "@/types/routes";
import { notFound, permanentRedirect } from "next/navigation";
import { legacySlugSchema } from "@/validations/routes";

export default async function Page({ searchParams }: LegacySlugPageProps) {
  const { slug } = await searchParams;
  if (!slug) permanentRedirect("/workshops");
  if (!legacySlugSchema.safeParse(slug).success) notFound();
  permanentRedirect(`/workshops/${slug}`);
}
