import { publicMetadata } from "@/lib/public-metadata";
import type { SlugPageProps } from "@/types/routes";
import { notFound } from "next/navigation";
import { getAssessment, listAssessments } from "@/features/assessments/queries";
import { Intro } from "@/components/shared/intro";
import { Quiz } from "@/features/assessments/ui/quiz";

export async function generateStaticParams() {
  return (await listAssessments()).map((item) => ({ slug: item.slug }));
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
