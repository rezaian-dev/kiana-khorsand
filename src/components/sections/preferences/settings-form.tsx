"use client";

import { useId, useRef, useState, useTransition } from "react";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs-list";
import { TabsTrigger } from "@/components/ui/tabs-trigger";
import { TabsContent } from "@/components/ui/tabs-content";
import { HoursEditor } from "./hours-editor";
import { settingsTabs, settingsLabels, type SettingsTab, type Preferences, type SettingsSnapshot } from "@/lib/preferences";
import { settingsEditSchema } from "@/lib/mutations";
import { resultCodes, routes } from "@/lib/constants";
import { formatDate, formatNumber } from "@/lib/format";
import { writeSettings } from "@/server/actions/content";
import { notices } from "@/content/profile";

type Props = { snapshot: SettingsSnapshot };
const contactFields = [{ name: "phone", label: "شمارهٔ همراه عمومی", max: 14 }, { name: "whatsapp", label: "شمارهٔ واتس‌اپ عمومی", max: 14 }] as const;
const socialFields = [{ name: "instagram", label: "اینستاگرام" }, { name: "telegram", label: "تلگرام" }] as const;

export function SettingsForm({ snapshot }: Props) {
  const id = useId();
  const [initial] = useState(snapshot);
  const [tab, setTab] = useState<SettingsTab>(settingsTabs.profile);
  const [message, setMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isSending = useRef(false);
  const form = useForm<Preferences>({ resolver: zodResolver(settingsEditSchema), defaultValues: initial.value, shouldFocusError: false });
  const { register, control, handleSubmit, getFieldState, formState } = form;
  const hasChanged = snapshot.value.revision !== initial.value.revision;
  const canSave = !hasChanged && !isBlocked && !isSaved && !isPending;
  function handleInvalid(errors: FieldErrors<Preferences>) {
    const record = errors.record;
    if (record?.name || record?.role || record?.introduction || record?.license) setTab(settingsTabs.profile);
    else if (record?.hours || record?.slotMinutes || record?.isBookingEnabled) setTab(settingsTabs.hours);
    else if (record?.phone || record?.whatsapp || record?.address) setTab(settingsTabs.contact);
    else if (record?.instagram || record?.telegram) setTab(settingsTabs.social);
    setMessage("ذخیره ارسال نشد؛ نخستین تب دارای خطا باز شد. فیلدهای مشخص‌شده را بررسی کنید.");
  }
  function handleSave(value: Preferences) {
    if (!canSave || isSending.current) return;
    isSending.current = true; setMessage("");
    startTransition(async () => {
      try {
        const result = await writeSettings(value);
        if (result.isSuccess) { setIsSaved(true); setMessage("ذخیرهٔ همهٔ تب‌ها از سرور تأیید شد؛ برای ویرایش بعدی نسخهٔ ذخیره‌شده را بازخوانی کنید."); toast.success("تنظیمات سایت ذخیره شد."); }
        else { setMessage([result.message, ...Object.values(result.fieldErrors).flatMap((values) => values ?? [])].join(" ")); setIsBlocked(result.code !== resultCodes.invalid && result.code !== resultCodes.limited); toast.error(result.message); }
      } catch { setIsBlocked(true); setMessage("نتیجهٔ ذخیره مشخص نیست؛ پیش از تکرار، تنظیمات را بازخوانی و بررسی کنید."); toast.error("نتیجهٔ ذخیرهٔ تنظیمات مشخص نیست."); }
      finally { isSending.current = false; }
    });
  }
  return <form className="content-form settings-form" action={routes.adminSettings} method="post" noValidate onSubmit={(event) => { void handleSubmit(handleSave, handleInvalid)(event); }} aria-busy={isPending} data-live-pause={isPending || (formState.isDirty && !isSaved)} aria-describedby={`${id}-status ${id}-privacy`}><div className="editor-status" id={`${id}-status`} role="status" data-saved={isSaved}><strong>{isPending ? "در حال ذخیره…" : isSaved ? "ذخیره تأیید شد" : isBlocked ? "نیازمند بررسی نتیجه" : hasChanged ? "نسخهٔ سرور تغییر کرده است" : formState.isDirty ? "تغییرات ذخیره‌نشده" : "تنظیمات خوانده‌شده از سرور"}</strong><p>{message || (hasChanged ? "فرم شما بازنویسی نشده است؛ ذخیره روی نسخهٔ قدیمی بسته است." : "همهٔ تب‌ها با یک ذخیره و یک نسخه ثبت می‌شوند. ذخیرهٔ خودکار یا محافظ خروج نداریم؛ ناوبری می‌تواند تغییرات محلی را از بین ببرد.")}</p><p>نسخهٔ {formatNumber(initial.value.revision)} · {formatDate(new Date(initial.updatedAt), { dateStyle: "medium", timeStyle: "short" })}</p></div>{(hasChanged || isBlocked || isSaved) && <a className="quiet-link" href={routes.adminSettings}>بازخوانی کامل تنظیمات؛ تغییرات محلی کنار گذاشته می‌شوند</a>}
    <Tabs value={tab} onValueChange={(value) => { if (Object.hasOwn(settingsTabs, value)) setTab(value as SettingsTab); }} dir="rtl" className="settings-tabs" activationMode="manual"><TabsList aria-label="بخش‌های تنظیمات">{Object.entries(settingsLabels).map(([value, label]) => <TabsTrigger key={value} value={value}>{label}</TabsTrigger>)}</TabsList><fieldset disabled={!canSave}><legend className="sr-only">تنظیمات حرفه‌ای سایت</legend>
      <TabsContent value={settingsTabs.profile} forceMount><h3>مشخصات حرفه‌ای عمومی</h3><p className="panel-note">این مشخصات سایت‌اند، نه هویت ورود، نقش دسترسی یا رمز حساب شما. فقط اطلاعات واقعی و تأییدشده را درج کنید.</p>{[{ name: "name", label: "نام حرفه‌ای" }, { name: "role", label: "عنوان حرفه‌ای" }].map(({ name, label }) => { const field = name === "name" ? "record.name" : "record.role"; return <div key={field}><label htmlFor={`${id}-${name}`}>{label}</label><Input id={`${id}-${name}`} {...register(field)} maxLength={160} aria-invalid={getFieldState(field, formState).invalid} /><p className="field-error">{getFieldState(field, formState).invalid ? "۲ تا ۱۶۰ نویسه لازم است." : ""}</p></div>; })}<label htmlFor={`${id}-intro`}>معرفی کوتاه</label><Textarea id={`${id}-intro`} {...register("record.introduction")} rows={5} maxLength={4000} aria-invalid={getFieldState("record.introduction", formState).invalid} /><p className="field-error">{getFieldState("record.introduction", formState).invalid ? "معرفی باید ۱ تا ۴۰۰۰ نویسه باشد." : ""}</p><Controller control={control} name="record.license" render={({ field, fieldState }) => <div><label htmlFor={`${id}-license`}>شمارهٔ مجوز تأییدشده؛ در صورت نامشخص‌بودن خالی بگذارید</label><Input ref={field.ref} name={field.name} id={`${id}-license`} value={field.value ?? ""} onBlur={field.onBlur} onChange={(event) => field.onChange(event.target.value === "" ? null : event.target.value)} maxLength={100} aria-invalid={fieldState.invalid} /><p className="field-error">{fieldState.invalid ? "حداکثر ۱۰۰ نویسهٔ غیرخالی، یا خالی برای نامشخص." : ""}</p></div>} /></TabsContent>
      <TabsContent value={settingsTabs.hours} forceMount><HoursEditor form={form} /></TabsContent>
      <TabsContent value={settingsTabs.contact} forceMount><h3>راه‌های تماس عمومی</h3><p>شماره‌ها فقط برای تماس حرفه‌ای عمومی؛ رقم انگلیسی با ۰۹ یا ‎+۹۸۹. خالی‌کردن، آن راه تماس را از دادهٔ عمومی حذف می‌کند.</p>{contactFields.map(({ name, label, max }) => <Controller key={name} control={control} name={`record.${name}`} render={({ field, fieldState }) => <div><label htmlFor={`${id}-${name}`}>{label}</label><Input ref={field.ref} name={field.name} id={`${id}-${name}`} type="tel" dir="ltr" value={field.value ?? ""} onBlur={field.onBlur} onChange={(event) => field.onChange(event.target.value === "" ? null : event.target.value)} maxLength={max} aria-invalid={fieldState.invalid} /><p className="field-error">{fieldState.invalid ? "شمارهٔ همراه ایرانی معتبر یا مقدار خالی لازم است." : ""}</p></div>} />)}<Controller control={control} name="record.address" render={({ field, fieldState }) => <div><label htmlFor={`${id}-address`}>نشانی یا توضیح مراجعهٔ تأییدشده، اختیاری</label><Textarea ref={field.ref} name={field.name} id={`${id}-address`} rows={4} value={field.value ?? ""} onBlur={field.onBlur} onChange={(event) => field.onChange(event.target.value === "" ? null : event.target.value)} maxLength={500} aria-invalid={fieldState.invalid} /><p className="field-error">{fieldState.invalid ? "حداکثر ۵۰۰ نویسهٔ غیرخالی، یا خالی برای نامشخص." : ""}</p></div>} /></TabsContent>
      <TabsContent value={settingsTabs.social} forceMount><h3>شبکه‌های اجتماعی تأییدشده</h3><p>نشانی کامل HTTPS بدون نام کاربری/رمز در ساختار URL؛ مالکیت صفحه را مستقل بررسی کنید. ذخیره، پیام یا درخواست خارجی ارسال نمی‌کند.</p>{socialFields.map(({ name, label }) => <Controller key={name} control={control} name={`record.${name}`} render={({ field, fieldState }) => <div><label htmlFor={`${id}-${name}`}>{label}</label><Input ref={field.ref} name={field.name} id={`${id}-${name}`} type="url" dir="ltr" value={field.value ?? ""} onBlur={field.onBlur} onChange={(event) => field.onChange(event.target.value === "" ? null : event.target.value)} maxLength={500} aria-invalid={fieldState.invalid} /><p className="field-error">{fieldState.invalid ? "نشانی HTTPS معتبر و بدون اطلاعات ورود، یا مقدار خالی لازم است." : ""}</p></div>} />)}</TabsContent>
    </fieldset></Tabs><Button type="submit" disabled={!canSave}>{isPending ? "در حال ذخیره…" : "ذخیرهٔ همهٔ تنظیمات"}</Button><p className="search-privacy" id={`${id}-privacy`}>{notices.confidentiality} شرح‌حال یا اطلاعات خصوصی مراجع را در تنظیمات عمومی ننویسید. ذخیره به JavaScript نیاز دارد؛ تغییر تب، درخواست ذخیره نمی‌فرستد.</p><noscript><p>ویرایش و ذخیرهٔ تنظیمات به JavaScript نیاز دارد.</p></noscript></form>;
}
