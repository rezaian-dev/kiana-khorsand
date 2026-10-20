import { publicMetadata } from "@/lib/public-metadata";
import type { SlugPageProps } from "@/types/routes";
import { notFound } from "next/navigation";
import { getAssessment, listAssessments } from "@/features/assessments/queries";
import { Intro } from "@/components/shared/intro";
import { Quiz } from "@/features/assessments/ui/quiz";

export const revalidate = 3600;
export const dynamicParams = true;
export async function generateStaticParams() {
  const items = await listAssessments();
  if (items.length > 0) return items.map((item) => ({ slug: item.slug }));
  return [
    { slug: "anxiety-check" },
    { slug: "mood-check" },
    { slug: "stress-check" },
    { slug: "sleep-check" },
    { slug: "relationship-check" },
    { slug: "self-esteem-check" },
  ];
}
export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  const item = await getAssessment(slug);
  if (!item) notFound();
  return publicMetadata({
    title: item.title,
    description: item.introduction,
    path: `/assessments/${slug}`,
  });
}
export default async function Page({ params }: SlugPageProps) {
  const item = await getAssessment((await params).slug);
  if (!item) notFound();
  return (
    <>
      <Intro
        story="journal"
        parent={{ label: "ارزیابی‌ها", href: "/assessments" }}
        title={item.title}
        description={item.introduction}
      />
      <Quiz definition={item} />
    </>
  );
}
