"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu, ArrowUpLeft } from "lucide-react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet-trigger";
import { SheetContent } from "@/components/ui/sheet-content";
import { SheetTitle } from "@/components/ui/sheet-title";
import { SheetDescription } from "@/components/ui/sheet-description";
import { Button } from "@/components/ui/button";
import { navigation } from "@/content/navigation";
import { routes } from "@/lib/constants";
import { getTravel, motionTokens } from "@/lib/motion";
import { formatNumber } from "@/lib/format";
import { usePathname } from "next/navigation";

type Props = { brand: ReactNode; contacts: ReactNode };

export function MobileMenu({ brand, contacts }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  function handleFocus(event: Event) {
    const trigger = document.querySelector<HTMLElement>(".header-row .mobile-menu button");
    if (!trigger || trigger.getClientRects().length) return;
    const brand = document.querySelector<HTMLAnchorElement>(".header-row .brand-link");
    if (brand?.getClientRects().length) {
      event.preventDefault();
      brand.focus({ preventScroll: true });
    }
  }
  const isReduced = useReducedMotion();
  function handleClose() { setIsOpen(false); }
  return (
    <div className="mobile-menu">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild><Button variant="outline" size="icon" aria-label="باز کردن منوی اصلی"><Menu aria-hidden="true" /></Button></SheetTrigger>
        <SheetContent onCloseAutoFocus={handleFocus} isOpen={isOpen} className="fullscreen-menu">
          <div className="menu-brand" onClick={handleClose}>{brand}</div>
          <SheetTitle className="sr-only">منوی اصلی</SheetTitle>
          <SheetDescription className="sr-only">صفحه‌های وب‌سایت و راه‌های ارتباط</SheetDescription>
          <nav aria-label="ناوبری موبایل" className="menu-links">
            {navigation.map((link, index) => (
              <m.div key={link.href} initial={{ x: isReduced ? 0 : getTravel(motionTokens.travel) }} animate={{ opacity: 1, x: 0 }} transition={{ duration: isReduced ? 0 : motionTokens.ui, ease: motionTokens.ease, delay: isReduced ? 0 : index * motionTokens.stagger }}>
                <Link data-interact="control" href={link.href} prefetch={false} onClick={handleClose} aria-current={pathname === link.href || link.href !== routes.home && pathname.startsWith(`${link.href}/`) ? "page" : undefined}><span className="menu-number">{formatNumber(index + 1)}</span>{link.label}<ArrowUpLeft aria-hidden="true" /></Link>
              </m.div>
            ))}
          </nav>
          <div className="menu-bottom">
            <Button asChild size="lg"><Link href={routes.booking} prefetch={false} onClick={handleClose}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button>
            {contacts}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
