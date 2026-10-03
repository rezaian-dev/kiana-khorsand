"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";

export function BookingBar({ isHeroPage = false }: { isHeroPage?: boolean }) {
  const [isVisible, setVisible] = useState(!isHeroPage);
  useEffect(() => {
    if (!isHeroPage) return;
    const hero = document.querySelector(".home-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHeroPage]);
  return <aside className="booking-bar" data-visible={isVisible} inert={!isVisible} aria-hidden={!isVisible} aria-label="دسترسی سریع به رزرو"><div><strong>یک قدم برای خودتان</strong><span>انتخاب زمان و ثبت درخواست</span></div><Button asChild><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button></aside>;
}
