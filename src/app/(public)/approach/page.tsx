import { publicMetadata } from "@/lib/public-metadata";
import { notFound } from "next/navigation";
import { getPage } from "@/features/pages/queries";
import { Intro } from "@/components/shared/intro";
import { Section } from "@/components/shared/section";

export const revalidate = 86400;
export async function generateMetadata() {
  const page = await getPage("approach");
  return publicMetadata({
    title: page?.title || "روش کار",
    description: page?.description || "آشنایی با خدمات و رویکرد مشاوره.",
    path: "/approach",
    image: "/assets/images/intro-path.jpg",
  });
}

export default async function Page() {
  const page = await getPage("approach");
  if (!page) notFound();
  return (
    <>
      <Intro
        story="path"
        title={page.sections[0]?.title || page.title}
        description={page.description}
      />
      {page.sections.map((section, index) => (
        <Section
          key={`${section.kind}-${index}`}
          section={section}
          index={index}
          hideFirstHeading
        />
      ))}
    </>
  );
}
