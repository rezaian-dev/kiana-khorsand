import { publicMetadata } from "@/lib/public-metadata";
import { notFound } from "next/navigation";
import { getPage } from "@/features/pages/queries";
import { getSettings } from "@/features/settings/queries";
import { listServices } from "@/features/services/queries";
import { listArticles } from "@/features/articles/queries";
import { listAreas } from "@/features/areas/queries";
import { listWorkshops } from "@/features/workshops/queries";
import { listTestimonials } from "@/features/testimonials/queries";
import { listFaqs } from "@/features/faqs/queries";
import { HomeReference } from "@/features/pages/ui/home-reference";

export async function generateMetadata() {
  const page = await getPage("home");
  return publicMetadata({
    title: page?.title || "کیانا خرسند",
    description: page?.description || "آشنایی با خدمات و رویکرد مشاوره.",
    path: "/",
    image: "/assets/images/hero-therapist.jpg",
  });
}

export default async function Page() {
  const [
    page,
    settings,
    services,
    articles,
    areas,
    workshops,
    testimonials,
    faqs,
  ] = await Promise.all([
    getPage("home"),
    getSettings(),
    listServices(),
    listArticles(),
    listAreas(),
    listWorkshops(),
    listTestimonials(),
    listFaqs(),
  ]);
  if (!page) notFound();
  return (
    <HomeReference
      image={settings?.images.hero}
      areas={areas}
      services={services}
      articles={articles}
      workshops={workshops}
      testimonials={testimonials}
      faqs={faqs}
    />
  );
}
