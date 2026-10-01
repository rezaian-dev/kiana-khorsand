import { CalendarDays, Check, MessageCircle } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { steps } from "@/content/home";
import { formatNumber } from "@/lib/format";

const icons = [MessageCircle, CalendarDays, Check];

export function Steps() {
  return <SectionSurface className="home-steps" tone="sunrise" id="booking-guide" aria-labelledby="steps-title"><SectionHeading id="steps-title" eyebrow="شروعی روشن" title="سه قدم تا درخواست جلسهٔ اول" description="مسیر رزرو طوری طراحی می‌شود که بدانید در هر قدم چه چیزی پیش روی شماست." /><ol className="steps-list">{steps.map((step, index) => {
    const Icon = icons[index] ?? Check;
    return <li key={step.number}><div className="step-top"><span className="step-number">{formatNumber(step.number)}</span><Icon aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.description}</p></li>;
  })}</ol><p className="section-disclosure">این بخش راهنمای مسیر است؛ ثبت درخواست و نمایش زمان‌های واقعی در مرحلهٔ رزرو فعال می‌شوند.</p></SectionSurface>;
}
