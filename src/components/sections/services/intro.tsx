import { ArrowDownLeft } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { services } from "@/content/services";
import { formatNumber } from "@/lib/format";

export function Intro() {
  return <SectionSurface tone="ocean" className="services-intro" aria-label="معرفی خدمات"><PageHeading breadcrumb="خدمات" eyebrow="مسیرهای همراهی" title="از دغدغهٔ شما، به یک گفت‌وگوی روشن" description="مشاورهٔ فردی، زوج‌ها و خانواده؛ در این صفحه می‌توانید با موضوع‌های هر مسیر و شرایط کلی گفت‌وگوی آنلاین آشنا شوید. انتخاب نهایی به نیاز و شرایط شما بستگی دارد." /><nav className="service-index" aria-label="بخش‌های خدمات">{services.map((service, index) => <a data-interact="control" href={`#${service.key}`} key={service.key}><span className="index-number">{formatNumber(index + 1)}</span><span>{service.title}</span><ArrowDownLeft aria-hidden="true" /></a>)}</nav></SectionSurface>;
}
