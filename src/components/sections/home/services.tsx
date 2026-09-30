import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { routes } from "@/lib/constants";

export function Services() {
  return <SectionSurface tone="lagoon" id="services" aria-labelledby="services-title"><SectionHeading id="services-title" eyebrow="مسیرهای همراهی" title="از جایی شروع کنیم که برای شما مهم است." description="فرد، رابطه یا خانواده؛ نقطهٔ شروع هر گفت‌وگو می‌تواند متفاوت باشد." href={routes.services} linkLabel="همهٔ خدمات" /><div className="services-grid">{services.map((service) => <ServiceCard key={service.key} service={service} />)}</div><div className="service-action scroll-reveal"><div><h3>برای انتخاب مسیر، تنها نیستید.</h3><p>اگر هنوز نمی‌دانید کدام گفت‌وگو مناسب شماست، می‌توانیم از همین پرسش شروع کنیم.</p></div><Button asChild size="lg"><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button></div></SectionSurface>;
}
