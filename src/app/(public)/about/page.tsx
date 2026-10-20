import { publicMetadata } from "@/lib/public-metadata";
import { notFound } from "next/navigation";
import { getPage } from "@/features/pages/queries";
import { getSettings } from "@/features/settings/queries";
import { AboutReference } from "@/features/pages/ui/about-reference";

export async function generateMetadata() {
  const page = await getPage("about");
  return publicMetadata({
    title: "درباره کیانا خرسند | رویکرد و مسیر مشاوره",
    description: page?.description || "آشنایی با خدمات و رویکرد مشاوره.",
    path: "/about",
    image: "/assets/images/about-therapist.jpg",
  });
}

export default async function Page() {
  const [page, settings] = await Promise.all([getPage("about"), getSettings()]);
  if (!page) notFound();
  return (
    <AboutReference
      image={settings?.images.portrait || "/assets/images/about-therapist.jpg"}
      name={settings?.profile.name || "کیانا خرسند"}
      title={settings?.profile.title || "روان‌شناس بالینی"}
    />
  );
}
