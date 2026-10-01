"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema, type Message } from "@/lib/message";
import { notices } from "@/content/profile";
import { routes } from "@/lib/constants";

export function MessageForm() {
  const id = useId();
  const [isChecked, setIsChecked] = useState(false);
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Message>({ resolver: zodResolver(messageSchema), defaultValues: { name: "", email: "", message: "" } });
  function handleCheck() { setIsChecked(true); }
  function handleClear() { setIsChecked(false); }
  return <form action={routes.contact} method="get" noValidate autoComplete="off" className="message-form" aria-busy={isSubmitting} aria-labelledby={`${id}-title`} aria-describedby={`${id}-preview ${id}-privacy`} onSubmit={handleSubmit(handleCheck, handleClear)} onChange={handleClear}>
    <p className="section-eyebrow">نمونهٔ فرم، بدون ارسال</p><h2 id={`${id}-title`}>پیامی کوتاه، فقط برای بررسی قالب</h2><p id={`${id}-preview`} className="muted">برای بازبینی از اطلاعات آزمایشی استفاده کنید. دکمهٔ پایین فقط اعتبارسنجی محلی انجام می‌دهد؛ هیچ پیامی ارسال یا در سرور ذخیره نمی‌شود.</p>
    {/* Native names are intentionally omitted until real submission is authorized. Controller retains internal field identities; pre-hydration GET carries no entered values. */}
    <div className="message-fields"><div><label htmlFor={`${id}-name`}>نام <span className="muted">(اختیاری)</span></label><Controller name="name" control={control} render={({ field }) => <Input id={`${id}-name`} ref={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} maxLength={80} aria-invalid={!!errors.name} aria-describedby={`${id}-name-error`} />} /><p id={`${id}-name-error`} className="field-error" aria-live="polite">{errors.name?.message}</p></div>
    <div><label htmlFor={`${id}-email`}>ایمیل <span className="muted">(ضروری)</span></label><Controller name="email" control={control} render={({ field }) => <Input id={`${id}-email`} ref={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} type="email" inputMode="email" dir="ltr" maxLength={254} aria-required="true" aria-invalid={!!errors.email} aria-describedby={`${id}-email-error`} />} /><p id={`${id}-email-error`} className="field-error" aria-live="polite">{errors.email?.message}</p></div>
    <div><label htmlFor={`${id}-message`}>پیام کوتاه <span className="muted">(ضروری)</span></label><Controller name="message" control={control} render={({ field }) => <Textarea id={`${id}-message`} ref={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} rows={5} maxLength={1200} aria-required="true" aria-invalid={!!errors.message} aria-describedby={`${id}-message-error ${id}-privacy`} placeholder="فقط یک پرسش عمومی؛ بدون شرح‌حال یا اطلاعات حساس" />} /><p id={`${id}-message-error`} className="field-error" aria-live="polite">{errors.message?.message}</p></div></div>
    <div className="message-privacy" id={`${id}-privacy`}><ShieldCheck aria-hidden="true" /><p>{notices.confidentiality} <Link href={routes.privacy}>حریم خصوصی این نسخه</Link></p></div>
    <Button type="submit" size="lg" disabled={isSubmitting}><Check aria-hidden="true" />بررسی پیام، بدون ارسال</Button><div className="message-status" data-checked={isChecked}><strong role="status">{isChecked ? "قالب اطلاعات معتبر است." : "هنوز بررسی نشده است."}</strong><p>این فرم فقط قالب اطلاعات را بررسی می‌کند؛ هیچ پیامی ارسال نشده و پاسخی دریافت نخواهید کرد. ارسال واقعی هنوز فعال نیست.</p></div><noscript><p className="query-notice">بررسی فرم به جاوااسکریپت نیاز دارد. بدون آن فقط همین صفحه دوباره باز می‌شود و مقادیر واردشده ارسال نمی‌شوند.</p></noscript>
  </form>;
}
