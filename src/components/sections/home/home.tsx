import { ShieldCheck } from "lucide-react";
import { Hero } from "./hero";
import { About } from "./about";
import { Services } from "./services";
import { Steps } from "./steps";
import { Courses } from "./courses";
import { Articles } from "./articles";
import { Testimonials } from "./testimonials";
import { Faq } from "./faq";
import { Invitation } from "./invitation";
import { BookingBar } from "@/components/layout/booking-bar";
import { JsonLd } from "@/components/shared/json-ld";
import { notices, profile } from "@/content/profile";
import { services } from "@/content/home";
import { getEnv } from "@/lib/env";

type Props = { isLoading?: boolean };

export function Home({ isLoading = false }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  return <>
    {isLoading && <p role="status" className="load-status">در حال آماده‌سازی صفحه…</p>}
    <main id="main-content" className="home-page" inert={isLoading} aria-busy={isLoading}>
      <JsonLd schema={{ "@context": "https://schema.org", "@graph": [
        { "@type": "WebSite", "@id": `${origin}/#website`, url: origin, name: profile.name, inLanguage: "fa-IR", publisher: { "@id": `${origin}/#person` } },
        { "@type": "Person", "@id": `${origin}/#person`, name: profile.name, jobTitle: profile.role, url: origin },
        ...services.map((service) => ({ "@type": "Service", "@id": `${origin}/#${service.key}`, name: service.title, serviceType: service.title, description: service.description, provider: { "@id": `${origin}/#person` } })),
      ] }} />
      <Hero />
      <div className="home-disclosure"><div className="site-width"><ShieldCheck aria-hidden="true" /><p>{notices.sample} رزرو و صفحات دیگر هنوز در حال ساخت‌اند؛ پیوندهای آن‌ها فعلاً به صفحهٔ ۴۰۴ می‌رسند.</p></div></div>
      <About /><Services /><Steps /><Courses /><Articles /><Testimonials /><Faq /><Invitation />
      <BookingBar />
    </main>
  </>;
}
