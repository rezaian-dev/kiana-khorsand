import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "زیرساخت وب‌سایت",
  description: "نسخهٔ آماده‌سازی فنی؛ برای انتشار عمومی نیست.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: Props) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
