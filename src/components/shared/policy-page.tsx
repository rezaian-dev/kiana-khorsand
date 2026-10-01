import Link from "next/link";
import { FileText, ArrowUpLeft } from "lucide-react";
import { PageHeading } from "./page-heading";
import { SectionSurface } from "./section-surface";
import { BreadcrumbSchema } from "./breadcrumb-schema";
import { BookingBar } from "@/components/layout/booking-bar";
import type { Policy } from "@/content/policies";
import { routes } from "@/lib/constants";

type Props = { policy: Policy; isLoading?: boolean };

export function PolicyPage({ policy, isLoading = false }: Props) {
  const isPrivacy = policy.path === routes.privacy;
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی {policy.title}…</p>}<main id="main-content" className="public-page policy-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <BreadcrumbSchema title={policy.title} path={policy.path} />}
    <SectionSurface tone={isPrivacy ? "ocean" : "cotton-candy"}><PageHeading title={policy.title} description={policy.description} eyebrow="روشن و قابل‌مرور" /><div className="editorial-notice"><FileText aria-hidden="true" /><p>پیش‌نویس برای بازبینی؛ متن حقوقیِ نهایی و تأییدشده نیست. جزئیات نامعلوم باید پیش از فعال‌شدن خدمات تکمیل شوند.</p></div><dl className="policy-summary">{policy.summary.map((entry) => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.value}</dd></div>)}</dl></SectionSurface>
    <SectionSurface tone={isPrivacy ? "mint-dew" : "peach-glow"} aria-label={`متن ${policy.title}`}><div className="reading-grid"><aside className="reading-sidebar"><nav aria-label="فهرست سند"><p>در این صفحه</p><ol>{policy.sections.map((section) => <li key={section.key}><a data-interact="control" href={`#${section.key}`}>{section.title}</a></li>)}</ol></nav></aside><div className="reading-body policy-body">{policy.sections.map((section) => <section id={section.key} key={section.key} aria-labelledby={`${section.key}-title`}><h2 id={`${section.key}-title`}>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<div className="policy-links"><Link href={isPrivacy ? routes.terms : routes.privacy} className="quiet-link">{isPrivacy ? "شرایط استفاده" : "حریم خصوصی"}<ArrowUpLeft aria-hidden="true" /></Link><Link href={routes.contact} className="quiet-link">وضعیت راه‌های تماس<ArrowUpLeft aria-hidden="true" /></Link></div></div></div></SectionSurface><BookingBar />
  </main></>;
}
