"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { recordSearchSchema, type RecordHits } from "@/lib/clients";
import { findRecords } from "@/server/actions/search";
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
  { label: "مدیریت مقالات", href: routes.adminArticles }, { label: "مدیریت دوره‌ها", href: routes.adminCourses },
  { label: "داشبورد", href: routes.admin }, { label: "مدیریت نوبت‌ها", href: routes.agenda }, { label: "حساب‌های مراجعان", href: routes.clients }, { label: "برنامهٔ امروز", href: `${routes.admin}#schedule-today` },
  { label: "خلاصهٔ پیام‌ها", href: `${routes.admin}#message-preview` }, { label: "تغییرهای اخیر", href: `${routes.admin}#recent-activity` },
  { label: "تنظیمات حساب من", href: routes.settings }, { label: "دیدن سایت", href: routes.home },
];

export function CommandMenu() {
  const router = useRouter();
  const id = useId();
  const request = useRef(0);
  const [isPending, startTransition] = useTransition();
  const [hits, setHits] = useState<RecordHits | null>(null);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ q: string }>({ resolver: zodResolver(recordSearchSchema), defaultValues: { q: "" } });
  function handleSearch(value: { q: string }) {
    const token = ++request.current;
    setHits(null); setMessage("");
    startTransition(async () => {
      try {
        const result = await findRecords(value);
        if (request.current !== token) return;
        if (result.isSuccess) { setHits(result.value); setMessage("حداکثر شش حساب و یک نوبت با شناسهٔ کامل؛ انتخاب نتیجه، فهرست مربوط را باز می‌کند."); }
        else setMessage(result.message);
      } catch { if (request.current === token) setMessage("جست‌وجو دریافت نشد؛ دوباره تلاش کنید. هیچ تغییری ارسال نشده است."); }
    });
  }
  function handleOpen(isNext: boolean) {
    request.current += 1;
    setHits(null); setMessage(""); reset({ q: "" }); setIsOpen(isNext);
  }
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || event.altKey || event.repeat) return;
      if ((event.metaKey || event.ctrlKey) && (event.key.toLowerCase() === "k" || event.code === "KeyK")) {
        if (!isOpen && event.target instanceof Element && event.target.closest('[role="dialog"],[role="menu"]')) return;
        event.preventDefault(); request.current += 1; setHits(null); setMessage(""); reset({ q: "" }); setIsOpen((value) => !value);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, reset]);
  function handleNavigate(href: string) { handleOpen(false); router.push(href); }
  return <Sheet open={isOpen} onOpenChange={handleOpen}><SheetTrigger asChild><Button variant="outline" className="command-trigger" aria-label="فرمان‌های سریع؛ کنترل یا فرمان به‌همراه کی"><Search aria-hidden="true" /><span>دسترسی سریع</span><kbd dir="ltr">⌘ / Ctrl K</kbd></Button></SheetTrigger><SheetContent isOpen={isOpen} side="top" className="admin-command" data-live-pause={isOpen}><SheetHeader><SheetTitle>کجا می‌خواهید بروید؟</SheetTitle><SheetDescription>میان‌برها یا جست‌وجوی واقعی حساب و نوبت؛ فقط برای هماهنگی ضروری.</SheetDescription></SheetHeader><Command label="فرمان‌های مدیریت" loop><CommandInput placeholder="نام بخش را بنویسید…" aria-label="جست‌وجوی میان‌بر" maxLength={80} /><CommandList><CommandEmpty>میان‌بری با این عبارت پیدا نشد.</CommandEmpty><CommandGroup heading="بخش‌های آماده">{destinations.map((entry) => <CommandItem key={entry.href} value={entry.label} onSelect={() => handleNavigate(entry.href)}>{entry.label}</CommandItem>)}</CommandGroup></CommandList></Command><form className="command-search" action={routes.admin} method="post" noValidate onSubmit={(event) => { void handleSubmit(handleSearch)(event); }} aria-busy={isPending} aria-describedby={`${id}-privacy ${id}-status`}><label htmlFor={`${id}-q`}>نام، ایمیل، شمارهٔ مراجع یا شناسهٔ کامل نوبت</label><Input id={`${id}-q`} {...register("q")} onInput={() => { request.current += 1; setHits(null); setMessage(""); }} type="search" autoComplete="off" maxLength={80} aria-invalid={!!errors.q} disabled={isPending} /><Button type="submit" disabled={isPending}>{isPending ? "در حال جست‌وجو…" : "جست‌وجوی رکوردها"}</Button><p className="field-error" role="status">{errors.q?.message}</p><p className="search-privacy" id={`${id}-privacy`}>حریم خصوصی: عبارت با درخواست خصوصی ارسال می‌شود، نه در نشانی. شرح‌حال ننویسید. انتخاب نتیجه، شناسه را در نشانی فهرست قرار می‌دهد.</p></form><p id={`${id}-status`} role="status" className="member-feedback">{message}</p>{hits && <Command label="نتیجهٔ جست‌وجوی رکوردها" shouldFilter={false}><CommandList>{!hits.clients.length && !hits.appointments.length && <p className="dashboard-empty">حساب یا نوبتی پیدا نشد. نوبت فقط با شناسهٔ کامل جست‌وجو می‌شود.</p>}{hits.clients.length > 0 && <CommandGroup heading="حساب‌های مراجعان">{hits.clients.map((client) => <CommandItem key={client.id} value={client.id} onSelect={() => handleNavigate(`${routes.clients}?q=${encodeURIComponent(client.id)}`)}>{client.name}</CommandItem>)}</CommandGroup>}{hits.appointments.length > 0 && <CommandGroup heading="نوبت">{hits.appointments.map((entry) => <CommandItem key={entry.id} value={entry.id} onSelect={() => handleNavigate(`${routes.agenda}?q=${encodeURIComponent(entry.id)}`)}>{entry.label}</CommandItem>)}</CommandGroup>}</CommandList></Command>}</SheetContent></Sheet>;
}
