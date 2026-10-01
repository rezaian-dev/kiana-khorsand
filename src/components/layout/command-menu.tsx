"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet-trigger";
import { SheetContent } from "@/components/ui/sheet-content";
import { SheetHeader } from "@/components/ui/sheet-header";
import { SheetTitle } from "@/components/ui/sheet-title";
import { SheetDescription } from "@/components/ui/sheet-description";
import { Command } from "@/components/ui/command";
import { CommandInput } from "@/components/ui/command-input";
import { CommandList } from "@/components/ui/command-list";
import { CommandGroup } from "@/components/ui/command-group";
import { CommandItem } from "@/components/ui/command-item";
import { CommandEmpty } from "@/components/ui/command-empty";
import { routes } from "@/lib/constants";

const destinations = [
  { label: "داشبورد", href: routes.admin }, { label: "برنامهٔ امروز", href: `${routes.admin}#schedule-today` },
  { label: "خلاصهٔ پیام‌ها", href: `${routes.admin}#message-preview` }, { label: "تغییرهای اخیر", href: `${routes.admin}#recent-activity` },
  { label: "تنظیمات حساب من", href: routes.settings }, { label: "دیدن سایت", href: routes.home },
];

export function CommandMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || event.altKey || event.repeat) return;
      if ((event.metaKey || event.ctrlKey) && (event.key.toLowerCase() === "k" || event.code === "KeyK")) {
        if (!isOpen && event.target instanceof Element && event.target.closest('[role="dialog"],[role="menu"]')) return;
        event.preventDefault(); setIsOpen((value) => !value);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);
  function handleNavigate(href: string) { setIsOpen(false); router.push(href); }
  return <Sheet open={isOpen} onOpenChange={setIsOpen}><SheetTrigger asChild><Button variant="outline" className="command-trigger" aria-label="فرمان‌های سریع؛ کنترل یا فرمان به‌همراه کی"><Search aria-hidden="true" /><span>دسترسی سریع</span><kbd dir="ltr">⌘ / Ctrl K</kbd></Button></SheetTrigger><SheetContent isOpen={isOpen} side="top" className="admin-command" data-live-pause={isOpen}><SheetHeader><SheetTitle>کجا می‌خواهید بروید؟</SheetTitle><SheetDescription>جست‌وجو میان میان‌برها؛ جست‌وجوی حساب و نوبت هنوز در حال تکمیل است.</SheetDescription></SheetHeader><Command label="فرمان‌های مدیریت" loop><CommandInput placeholder="نام بخش را بنویسید…" aria-label="جست‌وجوی میان‌بر" maxLength={80} /><CommandList><CommandEmpty>میان‌بری با این عبارت پیدا نشد.</CommandEmpty><CommandGroup heading="بخش‌های آماده">{destinations.map((entry) => <CommandItem key={entry.href} value={entry.label} onSelect={() => handleNavigate(entry.href)}>{entry.label}</CommandItem>)}</CommandGroup></CommandList></Command></SheetContent></Sheet>;
}
