import { JsonLd } from "./json-ld";
import { getEnv } from "@/lib/env";
import { routes } from "@/lib/constants";

type Props = { title: string; path: string };

export function BreadcrumbSchema({ title, path }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  return <JsonLd schema={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: `${origin}${routes.home}` },
    { "@type": "ListItem", position: 2, name: title, item: `${origin}${path}` },
  ] }} />;
}
