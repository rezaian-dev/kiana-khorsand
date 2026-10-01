"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { passwordChangeSchema, type PasswordChange } from "@/lib/auth";
import { changePassword } from "@/lib/account";
import { resultCodes, routes } from "@/lib/constants";
import { notices } from "@/content/profile";

export function PasswordForm() {
  const id = useId();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isBlocked, setBlocked] = useState(false);
  const { control, handleSubmit, reset, setError, formState: { errors, isDirty, isSubmitting } } = useForm<PasswordChange>({ resolver: zodResolver(passwordChangeSchema), defaultValues: { currentPassword: "", newPassword: "" } });
  async function handleSave(value: PasswordChange) {
    if (isBlocked) return;
    setMessage("");
    const result = await changePassword(value);
    if (!result.isSuccess) {
      setMessage(result.code === resultCodes.unavailable ? "نتیجهٔ ذخیره تأیید نشد؛ ممکن است تغییر ثبت شده باشد. پیش از تکرار، وضعیت را دوباره بررسی کنید." : result.message);
      setBlocked(result.code === resultCodes.unavailable || result.code === resultCodes.unauthorized || result.code === resultCodes.forbidden);
      for (const field of ["currentPassword", "newPassword"] as const) {
        const message = result.fieldErrors[field]?.[0];
        if (message) setError(field, { message });
      }
      return;
    }
    reset({ currentPassword: "", newPassword: "" });
    setMessage("درخواست تغییر رمز و پایان‌دادن به نشست‌های دیگر تأیید شد.");
    router.refresh();
  }
  return <form className="member-form" action={routes.settings} method="get" noValidate onSubmit={handleSubmit(handleSave)} aria-busy={isSubmitting} data-live-pause={isDirty || isSubmitting} aria-describedby={`${id}-privacy ${id}-status`}>
    <fieldset disabled={isSubmitting || isBlocked}><legend className="sr-only">تغییر رمز عبور</legend>
      {(["currentPassword", "newPassword"] as const).map((name) => <div className="auth-field" key={name}><label htmlFor={`${id}-${name}`}>{name === "currentPassword" ? "رمز فعلی" : "رمز تازه"}</label><Controller name={name} control={control} render={({ field }) => <Input id={`${id}-${name}`} ref={field.ref} value={field.value} onBlur={field.onBlur} onChange={field.onChange} type="password" dir="ltr" autoComplete={name === "currentPassword" ? "current-password" : "new-password"} maxLength={128} aria-required="true" aria-invalid={!!errors[name]} aria-describedby={`${id}-${name}-error`} />} /><p id={`${id}-${name}-error`} className="field-error" aria-live="polite">{errors[name]?.message}</p></div>)}
      <p className="section-disclosure">۸ تا ۱۲۸ نویسه. با تغییر رمز، نشست‌های دیگر از طریق سرویس ورود پایان داده می‌شوند. بازیابی رمز با ایمیل هنوز فراهم نیست.</p>
      <Button type="submit">{isSubmitting ? "در حال تغییر رمز…" : "ذخیرهٔ رمز تازه"}</Button>
    </fieldset>
    <p className="member-feedback" id={`${id}-status`} role="status">{message || "رمز فعلی برای تأیید این تغییر لازم است."}</p>
    {isBlocked && <a className="quiet-link" href={routes.settings}>بازخوانی و بررسی پیش از تکرار؛ رمزهای واردشده پاک می‌شوند</a>}
    <div className="message-privacy" id={`${id}-privacy`}><ShieldCheck aria-hidden="true" /><p>{notices.confidentiality} رمزتان را با دیگران به اشتراک نگذارید. <Link href={routes.privacy}>حریم خصوصی</Link></p></div>
    <noscript><p className="query-notice">برای تغییر رمز، جاوااسکریپت لازم است؛ رمز در نشانی صفحه فرستاده نمی‌شود.</p></noscript>
  </form>;
}
