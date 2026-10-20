import { siteDetailClassName } from "@/components/shared/public-layout-classes";
import { readingSurfaceClassName } from "@/components/shared/reading-surface";
import { ScrollReveal } from "@/components/layout/page-reveal";
import { publicMetadata } from "@/lib/public-metadata";
import type { SlugPageProps } from "@/types/routes";
import { notFound } from "next/navigation";
import { getArea, listAreas } from "@/features/areas/queries";
import { Intro } from "@/components/shared/intro";
import { Prose } from "@/components/shared/prose";
import { cleanEditorialBody } from "@/lib/clean-copy";

export async function generateStaticParams() {
  return (await listAreas()).map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  const area = await getArea(slug);
  if (!area) notFound();
  return publicMetadata({
    title: area.title,
    description: area.description,
    path: `/areas/${slug}`,
    image: area.image,
  });
}
export default async function Page({ params }: SlugPageProps) {
  const area = await getArea((await params).slug);
  if (!area) notFound();
  return (
    <>
      <Intro
        story="path"
        parent={{ label: "حوزه‌های کاری", href: "/areas" }}
        title={area.title.split(" | ")[0]}
        description={area.description}
        image={area.image}
      />
      <ScrollReveal
        as="article"
        className={`${siteDetailClassName} reading-surface reading-surface-area ${readingSurfaceClassName}`}
      >
        <Prose reading body={cleanEditorialBody(area.body, "area")} />
      </ScrollReveal>
    </>
  );
}
