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
import { AccountLinks } from "@/components/layout/account-links";
import { navigation } from "@/content/navigation";
import { routes } from "@/lib/constants";
import { getTravel, motionTokens } from "@/lib/motion";
import { formatNumber } from "@/lib/format";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer | null; brand: ReactNode; contacts: ReactNode };

export function MobileMenu({ viewer, brand, contacts }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isReduced = useReducedMotion();
  function handleClose() { setIsOpen(false); }
  return (
    <div className="mobile-menu">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild><Button variant="outline" size="icon" aria-label="باز کردن منوی اصلی"><Menu aria-hidden="true" /></Button></SheetTrigger>
        <SheetContent isOpen={isOpen} className="fullscreen-menu">
          <div className="menu-brand" onClick={handleClose}>{brand}</div>
          <SheetTitle className="sr-only">منوی اصلی</SheetTitle>
          <SheetDescription className="sr-only">صفحه‌های وب‌سایت و راه‌های ارتباط</SheetDescription>
          <div className="menu-orb" aria-hidden="true" />
          <nav aria-label="ناوبری موبایل" className="menu-links">
            {navigation.map((link, index) => (
              <m.div key={link.href} initial={{ opacity: 0, x: isReduced ? 0 : getTravel(motionTokens.travel) }} animate={{ opacity: 1, x: 0 }} transition={{ duration: isReduced ? 0 : motionTokens.ui, delay: isReduced ? 0 : index * motionTokens.stagger }}>
                <Link href={link.href} prefetch={false} onClick={handleClose}><span className="menu-number">{formatNumber(index + 1)}</span>{link.label}<ArrowUpLeft aria-hidden="true" /></Link>
              </m.div>
            ))}
          </nav>
          <div className="menu-bottom">
            <Button asChild size="lg"><Link href={routes.booking} prefetch={false} onClick={handleClose}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button>
            {viewer ? <AccountLinks viewer={viewer} onChoose={handleClose} /> : <Button asChild variant="outline"><Link href={routes.login} prefetch={false} onClick={handleClose}>ورود / ثبت‌نام</Link></Button>}
            {contacts}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
