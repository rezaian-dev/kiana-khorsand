"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet-trigger";
import { SheetContent } from "@/components/ui/sheet-content";
import { SheetHeader } from "@/components/ui/sheet-header";
import { SheetTitle } from "@/components/ui/sheet-title";
import { SheetDescription } from "@/components/ui/sheet-description";

type Props = { brand: ReactNode; children: ReactNode };

export function AdminDrawer({ brand, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  function handleFocus(event: Event) {
    const trigger = document.querySelector<HTMLElement>(".header-row .admin-mobile button");
    if (!trigger || trigger.getClientRects().length) return;
    const brand = document.querySelector<HTMLAnchorElement>(".header-row .brand-link");
    if (brand?.getClientRects().length) {
      event.preventDefault();
      brand.focus({ preventScroll: true });
    }
  }
  return <div className="admin-mobile"><Sheet open={isOpen} onOpenChange={setIsOpen}><SheetTrigger asChild><Button size="icon" variant="outline" aria-label="بازکردن منوی مدیریت"><Menu aria-hidden="true" /></Button></SheetTrigger><SheetContent onCloseAutoFocus={handleFocus} isOpen={isOpen} side="left" className="admin-drawer"><div className="menu-brand" onClick={() => setIsOpen(false)}>{brand}</div><SheetHeader><SheetTitle>مدیریت سایت</SheetTitle><SheetDescription>دسترسی فقط برای حساب مدیر تأییدشده است.</SheetDescription></SheetHeader><div onClick={(event) => { if (event.target instanceof Element && event.target.closest("a")) setIsOpen(false); }}>{children}</div></SheetContent></Sheet></div>;
}
