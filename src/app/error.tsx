"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notices } from "@/content/profile";
import { routes } from "@/lib/constants";

type Props = { reset: () => void };
export default function Error({ reset }: Props) {
  return <main id="main-content" className="service-error site-width"><h1>این بخش فعلاً در دسترس نیست.</h1><p>اطلاعات کامل دریافت نشد. برای حفظ دقت، آن را به‌جای حساب مهمان یا فهرست خالی نمایش نمی‌دهیم. کمی بعد دوباره تلاش کنید.</p><p>{notices.emergency}</p><Button onClick={reset}>تلاش دوباره</Button><Link href={routes.home} className="quiet-link">صفحهٔ اصلی</Link></main>;
}
