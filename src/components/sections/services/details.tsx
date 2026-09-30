import { Check, Info } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import { Photo } from "@/components/shared/photo";
import { services } from "@/content/services";
import { formatNumber } from "@/lib/format";

const tones = { individual: "cotton-candy", couples: "lagoon", family: "sunrise", online: "orchid" } as const;

export function Details() {
  return services.map((service, index) => <SectionSurface key={service.key} tone={tones[service.key]} id={service.key} className="service-detail" aria-labelledby={`${service.key}-title`}><div className="detail-grid"><div className="detail-copy"><p className="section-eyebrow"><span className="detail-number">{formatNumber(index + 1)}</span>{service.key === "online" ? "شیوهٔ برگزاری" : "موضوع گفت‌وگو"}</p><h2 id={`${service.key}-title`}>{service.title}</h2><p className="detail-lead">{service.description}</p><p className="muted">{service.overview}</p><h3>{service.key === "online" ? "پیش از جلسهٔ آنلاین" : "موضوع‌هایی برای شروع"}</h3><ul className="care-list">{service.focus.map((focus) => <li key={focus}><Check aria-hidden="true" />{focus}</li>)}</ul><div className="detail-note"><Info aria-hidden="true" /><p>{service.note}</p></div></div><figure className="detail-figure"><Photo image={service.image} sizes="(min-width: 1280px) 540px, (min-width: 768px) 44vw, 90vw" /><figcaption>تصویر مفهومی ساخته‌شده با هوش مصنوعی؛ نمایش جلسه یا مراجع واقعی نیست.</figcaption></figure></div></SectionSurface>);
}
