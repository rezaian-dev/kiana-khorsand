import {
  siteCardClassName,
  siteContainerClassName,
} from "@/components/shared/public-layout-classes";
import { publicMetadata } from "@/lib/public-metadata";
import { notFound } from "next/navigation";
import { getPage } from "@/features/pages/queries";
import { getSettings } from "@/features/settings/queries";
import { Intro } from "@/components/shared/intro";
import { PublicCardMotion } from "@/components/shared/card-hover-motion";
import { Section } from "@/components/shared/section";

export async function generateMetadata() {
  const page = await getPage("cancellation");
  return publicMetadata({
    title: page?.title || "شرایط لغو",
    description: page?.description || "آشنایی با خدمات و رویکرد مشاوره.",
    path: "/cancellation",
    image: "/assets/images/intro-fees.jpg",
  });
}

export default async function Page() {
  const [page, settings] = await Promise.all([
    getPage("cancellation"),
    getSettings(),
  ]);
  if (!page) notFound();
  return (
    <>
      <Intro
        story="fees"
        title={page.sections[0]?.title || page.title}
        description={page.description}
      />
      {settings?.cancellation && (
        <section className="site-section py-[clamp(3rem,6vw,6rem)]">
          <div className={siteContainerClassName}>
            <PublicCardMotion
              className={`${siteCardClassName} transition-none!`}
            >
              <h2>شرایط لغو و جابه‌جایی</h2>
              <p>{settings.cancellation}</p>
            </PublicCardMotion>
          </div>
        </section>
      )}
      {page.sections.map((section, index) => (
        <Section
          key={`${section.kind}-${index}`}
          section={section}
          index={index}
        />
      ))}
    </>
  );
}
