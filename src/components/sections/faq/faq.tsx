import Link from "next/link";
import { ArrowDownLeft, ArrowUpLeft } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";
import { BookingBar } from "@/components/layout/booking-bar";
import { Accordion } from "@/components/ui/accordion";
import { AccordionItem } from "@/components/ui/accordion-item";
import { AccordionTrigger } from "@/components/ui/accordion-trigger";
import { AccordionContent } from "@/components/ui/accordion-content";
import { questions, questionGroups } from "@/content/questions";
import { routes } from "@/lib/constants";

type Props = { isLoading?: boolean };

export function Faq({ isLoading = false }: Props) {
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی پرسش‌ها…</p>}<main id="main-content" className="faq-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <BreadcrumbSchema title="پرسش‌های متداول" path={routes.faq} />}
    <SectionSurface tone="ocean"><PageHeading breadcrumb="پرسش‌های متداول" eyebrow="پیش از شروع، بپرسید" title="پرسش‌های کوچک هم جای گفت‌وگو دارند." description="پاسخ‌هایی دربارهٔ شروع مشاوره، وضعیت رزرو، حریم خصوصی و محتوای این سایت. هرجا اطلاعات تأییدشده نداریم، آن را روشن گفته‌ایم." /><nav className="service-index" aria-label="موضوع پرسش‌ها">{questionGroups.map((group) => <a key={group.key} href={`#${group.key}`}><span>{group.title}</span><ArrowDownLeft aria-hidden="true" /></a>)}</nav><p className="muted">این نسخه هنوز امکان رزرو، ورود به حساب یا ارسال واقعی پیام ندارد.</p></SectionSurface>
    {questionGroups.map((group) => <SectionSurface key={group.key} tone={group.tone} id={group.key} aria-labelledby={`${group.key}-title`}><div className="question-group"><SectionHeading id={`${group.key}-title`} eyebrow="پاسخ‌های روشن" title={group.title} description={group.description} /><Accordion type="multiple" dir="rtl" className="question-list">{questions.filter((question) => question.group === group.key).map((question) => <AccordionItem key={question.key} value={question.key}><AccordionTrigger>{question.question}</AccordionTrigger><AccordionContent forceMount><p>{question.answer}</p></AccordionContent></AccordionItem>)}</Accordion></div></SectionSurface>)}
    <SectionSurface tone="dream" className="learning-note" aria-labelledby="more-questions"><div><p className="section-eyebrow">هنوز پرسشی دارید؟</p><h2 id="more-questions">راه ارتباط باید روشن باشد.</h2><p className="muted">در صفحهٔ تماس می‌توانید وضعیت راه‌های ارتباط و نمونهٔ فرم را ببینید. شماره و نشانی واقعی هنوز تأیید نشده‌اند و نمونهٔ فرم، پیام ارسال نمی‌کند.</p><Link href={routes.contact} className="quiet-link">دیدن صفحهٔ تماس<ArrowUpLeft aria-hidden="true" /></Link></div></SectionSurface><BookingBar />
  </main></>;
}
