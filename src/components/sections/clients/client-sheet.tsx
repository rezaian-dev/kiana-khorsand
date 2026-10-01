"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet-trigger";
import { SheetContent } from "@/components/ui/sheet-content";
import { SheetTitle } from "@/components/ui/sheet-title";
import { SheetDescription } from "@/components/ui/sheet-description";

type Props = { name: string; children: ReactNode };

export function ClientSheet({ name, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return <Sheet open={isOpen} onOpenChange={setIsOpen}><SheetTrigger asChild><Button variant="outline" aria-label={`مشخصات و تاریخچهٔ ${name}`}>مشخصات و تاریخچه</Button></SheetTrigger><SheetContent isOpen={isOpen} side="left" className="record-sheet"><SheetTitle>{name}</SheetTitle><SheetDescription>حساب و نوبت‌های ثبت‌شده؛ نه پرونده یا شرح‌حال درمانی. این نمای خواندنی با تازه‌سازی داده به‌روز می‌شود.</SheetDescription>{children}</SheetContent></Sheet>;
}
