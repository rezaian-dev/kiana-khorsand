import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NotFoundContent } from "@/components/shared/not-found-content";

export const metadata: Metadata = {
  title: { absolute: "صفحه پیدا نشد | دکتر کیانا خرسند" },
  description: "این نشانی پیدا نشد. برای ادامه به صفحهٔ اصلی وب‌سایت دکتر کیانا خرسند برگردید.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <><Header /><main id="main-content"><NotFoundContent /></main><Footer /></>
  );
}
