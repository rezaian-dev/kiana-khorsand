"use client";

import Link from "next/link";
import { useId, useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldCheck, Check } from "lucide-react";
import { requestLive } from "@/lib/live-client";
import { DraftNotice } from "@/components/shared/draft-notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema, type Message } from "@/lib/message";
import { notices } from "@/content/profile";
import { sendMessage } from "@/server/actions/messages";
import { resultCodes, routes } from "@/lib/constants";

export function MessageForm() {
  const id = useId();
  const hasRequest = useRef(false);
  const [isPending, startTransition] = useTransition();
  const [isSent, setIsSent] = useState(false);
  const [isUncertain, setIsUncertain] = useState(false);
  const [message, setMessage] = useState("");
  const { control, reset, handleSubmit, setError, formState: { errors, isSubmitting, isDirty } } = useForm<Message>({ resolver: zodResolver(messageSchema), defaultValues: { name: "", email: "", message: "" } });
  const isBusy = isSubmitting || isPending;
  const isLocked = isBusy || isSent || isUncertain;
  function handleSend(value: Message) {
    if (hasRequest.current || isLocked) return;
    hasRequest.current = true;
    setMessage("");
    startTransition(async () => {
      try {
        const result = await sendMessage(value);
        if (result.isSuccess) {
          setIsSent(true);
          toast.success("ذخیرهٔ پیام تأیید شد؛ این رسید وعدهٔ پاسخ نیست.");
          setMessage("ذخیرهٔ پیام تأیید شد. این رسید به معنی خوانده‌شدن پیام، پاسخ‌گویی یا تأیید نوبت نیست.");
        } else {
          setMessage(result.message);
          toast.error(result.code === resultCodes.unavailable ? "نتیجهٔ ارسال روشن نیست؛ ارسال دوباره متوقف شد." : result.message);
          for (const key of ["name", "email", "message"] as const) {
            const field = result.fieldErrors[key]?.[0];
            if (field) setError(key, { message: field });
          }
          if (result.code === resultCodes.unavailable) setIsUncertain(true);
        }
      } catch {
        setIsUncertain(true);
        toast.error("نتیجهٔ ارسال روشن نیست؛ ارسال دوباره متوقف شد.");
        setMessage("نتیجهٔ ارسال روشن نیست؛ ممکن است پیام ذخیره شده باشد. برای جلوگیری از ارسال تکراری، ارسال دوباره متوقف شد.");
      } finally { hasRequest.current = false; requestLive(); }
    });
  }
  return <form action={routes.contact} method="get" noValidate autoComplete="off" className="message-form" aria-busy={isBusy} data-live-pause={isBusy || (isDirty && !isSent)} aria-labelledby={`${id}-title`} aria-describedby={`${id}-notice ${id}-privacy`} onSubmit={(event) => { void handleSubmit(handleSend)(event); }}>
    <p className="section-eyebrow">برای پرسش‌های عمومی</p><h2 id={`${id}-title`}>پیامی کوتاه بفرستید</h2><p id={`${id}-notice`} className="muted">با انتخاب ارسال، نام اختیاری، ایمیل و پیام در سرور ذخیره می‌شوند. این فرم برای شرح‌حال، موقعیت بحرانی یا رزرو نوبت نیست؛ زمان و روش پاسخ‌گویی هنوز اعلام نشده‌اند.</p>
    {/* Controller identities are internal; no native input names can leak content into the pre-hydration GET fallback. */}
    <fieldset disabled={isLocked} className="message-entry"><legend className="sr-only">اطلاعات پیام</legend>
    <div className="message-fields"><div><label htmlFor={`${id}-name`}>نام <span className="muted">(اختیاری)</span></label><Controller name="name" control={control} render={({ field }) => <Input id={`${id}-name`} ref={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} maxLength={80} aria-invalid={!!errors.name} aria-describedby={`${id}-name-error`} />} /><p id={`${id}-name-error`} className="field-error" aria-live="polite">{errors.name?.message}</p></div>
    <div><label htmlFor={`${id}-email`}>ایمیل <span className="muted">(ضروری)</span></label><Controller name="email" control={control} render={({ field }) => <Input id={`${id}-email`} ref={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} type="email" inputMode="email" dir="ltr" maxLength={254} aria-required="true" aria-invalid={!!errors.email} aria-describedby={`${id}-email-error`} />} /><p id={`${id}-email-error`} className="field-error" aria-live="polite">{errors.email?.message}</p></div>
    <div><label htmlFor={`${id}-message`}>پیام کوتاه <span className="muted">(ضروری)</span></label><Controller name="message" control={control} render={({ field }) => <Textarea id={`${id}-message`} ref={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} rows={5} maxLength={1200} aria-required="true" aria-invalid={!!errors.message} aria-describedby={`${id}-message-error ${id}-privacy`} placeholder="فقط یک پرسش عمومی؛ بدون شرح‌حال یا اطلاعات حساس" />} /><p id={`${id}-message-error`} className="field-error" aria-live="polite">{errors.message?.message}</p></div></div>
    </fieldset><div className="message-privacy" id={`${id}-privacy`}><ShieldCheck aria-hidden="true" /><p>{notices.confidentiality} <Link href={routes.privacy}>حریم خصوصی این نسخه</Link></p></div>
    <Button type="submit" size="lg" disabled={isLocked}><Check aria-hidden="true" />{isBusy ? "در حال ارسال…" : isSent ? "ذخیرهٔ پیام تأیید شد" : isUncertain ? "نتیجه نیاز به پیگیری دارد" : "ارسال پیام"}</Button><div className="message-status" data-checked={isSent}><strong role="status">{isBusy ? "خروج از صفحه، ارسال در حال انجام را متوقف نمی‌کند." : message || "اطلاعات فقط با انتخاب دکمه ارسال می‌شوند."}</strong><p>{isUncertain ? "این فرم امکان استعلام عمومی ندارد. بدون ارسال دوباره، از راه تماس تأییدشدهٔ صاحب خدمت پیگیری کنید؛ بارگذاری دوباره نتیجهٔ قبلی را مشخص نمی‌کند." : "ثبت پیام، تعهدی برای پاسخ یا شروع رابطهٔ درمانی ایجاد نمی‌کند. از نوشتن اطلاعات حساس خود یا دیگران خودداری کنید."}</p></div><noscript><p className="query-notice">ارسال فرم به جاوااسکریپت نیاز دارد. بدون آن فقط همین صفحه دوباره باز می‌شود و مقادیر واردشده ارسال نمی‌شوند.</p></noscript>
    <DraftNotice isDisabled={isBusy} onDiscard={() => { reset(); requestLive(); }} />
  </form>;
}
