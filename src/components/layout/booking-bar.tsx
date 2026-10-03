"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";

export function BookingBar({ isHeroPage = false }: { isHeroPage?: boolean }) {
  const [isVisible, setVisible] = useState(!isHeroPage);
  useEffect(() => {
    const hero = isHeroPage ? document.querySelector(".home-hero") : null;
    const footer = document.querySelector(".footer-booking");
    let heroVisible = Boolean(hero);
    let footerVisible = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === footer) footerVisible = entry.isIntersecting;
      });
      setVisible(!heroVisible && !footerVisible);
    });
    if (hero) observer.observe(hero);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, [isHeroPage]);
  return <aside className="booking-bar" data-visible={isVisible} inert={!isVisible} aria-hidden={!isVisible} aria-label="دسترسی سریع به رزرو"><div><strong>یک قدم برای خودتان</strong><span>انتخاب زمان و ثبت درخواست</span></div><Button asChild><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button></aside>;
}
