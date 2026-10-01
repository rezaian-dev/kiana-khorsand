import { Intro } from "./intro";
import { Details } from "./details";
import { Preparation } from "./preparation";
import { BookingPrompt } from "@/components/shared/booking-prompt";
import { BookingBar } from "@/components/layout/booking-bar";
import { JsonLd } from "@/components/shared/json-ld";
import { services } from "@/content/services";
import type { Profile } from "@/lib/published";
import { routes } from "@/lib/constants";
import { getEnv } from "@/lib/env";

type Props = { profile: Profile; isLoading?: boolean };

export function Services({ profile, isLoading = false }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  const url = `${origin}${routes.services}`;
  return <>
    {isLoading && <p role="status" className="load-status">در حال آماده‌سازی صفحهٔ خدمات…</p>}
    <main id="main-content" className="services-page booking-page" inert={isLoading} aria-busy={isLoading}>
      {!isLoading && <JsonLd schema={{ "@context": "https://schema.org", "@graph": [
        { "@type": "WebPage", "@id": `${url}#page`, url, name: "خدمات", inLanguage: "fa-IR", about: services.map((service) => ({ "@id": `${origin}/#${service.key}` })), isPartOf: { "@id": `${origin}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
        { "@type": "Person", "@id": `${origin}/#person`, name: profile.name, jobTitle: profile.role, url: `${origin}${routes.about}` },
        ...services.map((service) => ({ "@type": "Service", "@id": `${origin}/#${service.key}`, url: `${origin}${service.href}`, name: service.title, serviceType: service.title, description: service.description, provider: { "@id": `${origin}/#person` } })),
        { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: `${origin}${routes.home}` },
          { "@type": "ListItem", position: 2, name: "خدمات", item: url },
        ] },
      ] }} />}
      <Intro /><Details /><Preparation />
      <BookingPrompt tone="dream" title="هنوز دربارهٔ مسیر مطمئن نیستید؟" description="لازم نیست پیش از گفت‌وگوی اول، پاسخ قطعی داشته باشید. می‌توانید از دغدغه و انتظار خود شروع کنید و دربارهٔ مناسب‌بودن همکاری بپرسید." secondaryHref={routes.about} secondaryLabel="آشنایی بیشتر با من" />
      <BookingBar />
    </main>
  </>;
}
