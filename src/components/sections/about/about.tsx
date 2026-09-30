import { Intro } from "./intro";
import { Approach } from "./approach";
import { Background } from "./background";
import { Collaboration } from "./collaboration";
import { BookingPrompt } from "@/components/shared/booking-prompt";
import { BookingBar } from "@/components/layout/booking-bar";
import { JsonLd } from "@/components/shared/json-ld";
import { profile } from "@/content/profile";
import { routes } from "@/lib/constants";
import { getEnv } from "@/lib/env";

type Props = { isLoading?: boolean };

export function About({ isLoading = false }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  const url = `${origin}${routes.about}`;
  return <>
    {isLoading && <p role="status" className="load-status">در حال آماده‌سازی صفحهٔ دربارهٔ من…</p>}
    <main id="main-content" className="about-page booking-page" inert={isLoading} aria-busy={isLoading}>
      {!isLoading && <JsonLd schema={{ "@context": "https://schema.org", "@graph": [
        { "@type": "AboutPage", "@id": `${url}#page`, url, name: "درباره من", inLanguage: "fa-IR", mainEntity: { "@id": `${origin}/#person` }, isPartOf: { "@id": `${origin}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
        { "@type": "Person", "@id": `${origin}/#person`, name: profile.name, jobTitle: profile.role, description: profile.introduction, url },
        { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: `${origin}${routes.home}` },
          { "@type": "ListItem", position: 2, name: "درباره من", item: url },
        ] },
      ] }} />}
      <Intro /><Approach /><Background /><Collaboration />
      <BookingPrompt tone="dream" title="لازم نیست نقطهٔ شروع، بی‌نقص باشد." description="اگر به گفت‌وگو فکر می‌کنید، می‌توانید ابتدا مسیرهای مشاوره را بشناسید و پرسش‌هایتان را برای شروع یادداشت کنید." secondaryHref={routes.services} secondaryLabel="مرور خدمات مشاوره" />
      <BookingBar />
    </main>
  </>;
}
