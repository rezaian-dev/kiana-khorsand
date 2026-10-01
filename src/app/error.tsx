"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useTransition } from "react";
import { liveEvents, requestLive } from "@/lib/live-client";
import { notices } from "@/content/profile";
import { routes } from "@/lib/constants";

type Props = { reset: () => void; retry: () => void };
export default function Error({ reset, retry }: Props) {
  const [isPending, startTransition] = useTransition();
  const handleRecovery = useEffectEvent(() => {
    if (isPending || document.hidden || !navigator.onLine) return;
    // Use the shell's single-flight reader if it survived the error. When the
    // shell itself failed, Next's native retry refetches this segment only.
    if (!requestLive()) startTransition(() => retry());
  });
  useEffect(() => {
    let resume: ReturnType<typeof setTimeout> | undefined;
    function handleResume() { if (resume) clearTimeout(resume); resume = setTimeout(handleRecovery, 250); }
    function handleApplied() { reset(); }
    const timer = setInterval(handleRecovery, 15_000);
    window.addEventListener("online", handleResume);
    window.addEventListener("pageshow", handleResume);
    document.addEventListener("visibilitychange", handleResume);
    window.addEventListener(liveEvents.applied, handleApplied);
    return () => {
      clearInterval(timer); if (resume) clearTimeout(resume);
      window.removeEventListener("online", handleResume);
      window.removeEventListener("pageshow", handleResume);
      document.removeEventListener("visibilitychange", handleResume);
      window.removeEventListener(liveEvents.applied, handleApplied);
    };
  }, [reset]);
  return <main id="main-content" className="service-error site-width"><h1>این بخش فعلاً در دسترس نیست.</h1><p>اطلاعات کامل دریافت نشد. برای حفظ دقت، آن را به‌جای حساب مهمان یا فهرست خالی نمایش نمی‌دهیم.</p><p>{notices.emergency}</p><Link href={routes.home} className="quiet-link">صفحهٔ اصلی</Link></main>;
}
