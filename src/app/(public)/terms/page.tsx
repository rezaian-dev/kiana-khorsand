import { publicMetadata } from "@/lib/public-metadata";
import { notFound } from "next/navigation";
import { getPage } from "@/features/pages/queries";
import { Intro } from "@/components/shared/intro";
import { Section } from "@/components/shared/section";

export async function generateMetadata() {
  const page = await getPage("terms");
  return publicMetadata({
    title: page?.title || "شرایط استفاده",
    description: page?.description || "آشنایی با خدمات و رویکرد مشاوره.",
    path: "/terms",
    image: "/assets/images/intro-fees.jpg",
  });
}

export default async function Page() {
  const page = await getPage("terms");
  if (!page) notFound();
  return (
    <>
      <Intro
        story="fees"
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
