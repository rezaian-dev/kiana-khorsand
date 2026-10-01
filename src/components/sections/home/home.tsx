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
import { services } from "@/content/services";
import { routes } from "@/lib/constants";
import type { Article, Course, Profile, Review } from "@/lib/published";
import { getEnv } from "@/lib/env";

type Props = { profile: Profile; articles: Article[]; courses: Course[]; reviews: Review[]; isLoading?: boolean };

export function Home({ profile, articles, courses, reviews, isLoading = false }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  return <>
    {isLoading && <p role="status" className="load-status">در حال آماده‌سازی صفحه…</p>}
    <main id="main-content" className="home-page booking-page" inert={isLoading} aria-busy={isLoading}>
      {!isLoading && <JsonLd schema={{ "@context": "https://schema.org", "@graph": [
        { "@type": "WebSite", "@id": `${origin}/#website`, url: origin, name: profile.name, inLanguage: "fa-IR", publisher: { "@id": `${origin}/#person` } },
        { "@type": "Person", "@id": `${origin}/#person`, name: profile.name, jobTitle: profile.role, url: `${origin}${routes.about}` },
        ...services.map((service) => ({ "@type": "Service", "@id": `${origin}/#${service.key}`, url: `${origin}${service.href}`, name: service.title, serviceType: service.title, description: service.description, provider: { "@id": `${origin}/#person` } })),
      ] }} />}
      <Hero profile={profile} />
      <About profile={profile} /><Services /><Steps /><Courses courses={courses} /><Articles articles={articles} /><Testimonials reviews={reviews} /><Faq /><Invitation />
      <BookingBar />
    </main>
  </>;
}
