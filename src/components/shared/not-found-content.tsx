import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { SectionSurface } from "./section-surface";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";

export function NotFoundContent() {
  return (<SectionSurface tone="dream" className="missing-page"><div className="missing-symbol" aria-hidden="true"><Compass /></div><p className="section-eyebrow">خطای ۴۰۴</p><h1>این مسیر پیدا نشد.</h1><p>ممکن است نشانی تغییر کرده باشد.<br />می‌توانید از صفحهٔ اصلی دوباره شروع کنید.</p><Button asChild size="lg"><Link href={routes.home}><ArrowRight aria-hidden="true" />بازگشت به صفحهٔ اصلی</Link></Button></SectionSurface>);
}
