import Link from "next/link";
import { ArrowUpLeft, MessagesSquare } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import { Accordion } from "@/components/ui/accordion";
import { AccordionItem } from "@/components/ui/accordion-item";
import { AccordionTrigger } from "@/components/ui/accordion-trigger";
import { AccordionContent } from "@/components/ui/accordion-content";
import { questions } from "@/content/questions";
import { routes } from "@/lib/constants";

export function Faq() {
  return <SectionSurface tone="orchid" aria-labelledby="faq-title"><div className="faq-grid"><div className="faq-intro"><span className="faq-symbol"><MessagesSquare aria-hidden="true" /></span><p className="section-eyebrow">پیش از شروع</p><h2 id="faq-title">شاید پرسش<br />شما هم همین باشد.</h2><p className="muted">دانستن اینکه چه چیزی پیش روست، می‌تواند شروع گفت‌وگو را روشن‌تر کند.</p><Link href={routes.faq} prefetch={false} className="quiet-link">همهٔ پرسش‌ها<ArrowUpLeft aria-hidden="true" /></Link></div><Accordion type="single" collapsible className="home-faq">{questions.slice(0, 4).map((question) => <AccordionItem key={question.key} value={question.key}><AccordionTrigger>{question.question}</AccordionTrigger><AccordionContent forceMount><p>{question.answer}</p></AccordionContent></AccordionItem>)}</Accordion></div></SectionSurface>;
}
