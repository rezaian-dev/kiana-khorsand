import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SectionSurface } from "@/components/shared/section-surface";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "صفحه پیدا نشد | دکتر کیانا خرسند" },
  description: "این نشانی پیدا نشد. برای ادامه به صفحهٔ اصلی وب‌سایت دکتر کیانا خرسند برگردید.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <><Header /><main id="main-content"><SectionSurface tone="dream" className="missing-page"><div className="missing-symbol" aria-hidden="true"><Compass /></div><p className="section-eyebrow">خطای ۴۰۴</p><h1>این مسیر پیدا نشد.</h1><p>ممکن است نشانی تغییر کرده باشد یا این صفحه هنوز آماده نشده باشد.<br />می‌توانید از صفحهٔ اصلی دوباره شروع کنید.</p><Button asChild size="lg"><Link href={routes.home}><ArrowRight aria-hidden="true" />بازگشت به صفحهٔ اصلی</Link></Button></SectionSurface></main><Footer /></>
  );
}
