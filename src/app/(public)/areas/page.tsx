import {
  siteContainerClassName,
  siteGridClassName,
} from "@/components/shared/public-layout-classes";
import { listAreas } from "@/features/areas/queries";
import { Intro } from "@/components/shared/intro";
import { ContentCard } from "@/components/shared/card";
import { labels } from "@/lib/labels";
import { publicMetadata } from "@/lib/public-metadata";

export const revalidate = 3600;
export const metadata = publicMetadata({
  title: labels.areas,
  description:
    "با حوزه‌های کاری و موضوعات مشاوره فردی، خانواده و روابط آشنا شوید.",
  path: "/areas",
  image: "/assets/images/intro-path.jpg",
});
export default async function Page() {
  const areas = await listAreas();
  return (
    <>
      <Intro
        story="path"
        title={labels.areas}
        description={areas[0]?.description}
      />
      <div className={`${siteContainerClassName} ${siteGridClassName}`}>
        {areas.map((item) => (
          <ContentCard
            key={item.slug}
            title={item.title}
            description={item.description}
            href={`/areas/${item.slug}`}
            image={item.image}
          />
        ))}
      </div>
    </>
  );
}
