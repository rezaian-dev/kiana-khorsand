import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowUpLeft, Sprout } from "lucide-react";
import { SectionSurface } from "./section-surface";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";

type Props = {
  title: string;
  description: string;
  secondaryHref: string;
  secondaryLabel: string;
  tone: ComponentProps<typeof SectionSurface>["tone"];
};

export function BookingPrompt({ title, description, secondaryHref, secondaryLabel, tone }: Props) {
  return <SectionSurface tone={tone} className="booking-prompt" aria-labelledby="invitation-title">
    <div className="prompt-inner"><span className="service-symbol"><Sprout aria-hidden="true" /></span><p className="section-eyebrow">قدم بعدی، با انتخاب شما</p><h2 id="invitation-title">{title}</h2><p className="muted">{description}</p><div className="page-actions"><Button asChild size="lg"><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button><Link href={secondaryHref} className="quiet-link">{secondaryLabel}<ArrowUpLeft aria-hidden="true" /></Link></div><p className="section-disclosure">زمان‌ها از برنامهٔ فعال خوانده می‌شوند؛ ثبت درخواست، تأیید نهایی جلسه نیست. پیش از پذیرش واقعی، هزینه و شرایط همکاری باید روشن شوند.</p></div>
  </SectionSurface>;
}
