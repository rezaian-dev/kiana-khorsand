"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpLeft, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { credentialsSchema, signUpSchema, type Credentials } from "@/lib/auth";
import { createAccount, loginAccount } from "@/lib/account";
import { routes } from "@/lib/constants";
import { notices } from "@/content/profile";

type Props = { isRegister: boolean; isReady: boolean; returnTo: string };

export function AuthForm({ isRegister, isReady, returnTo }: Props) {
  const id = useId();
  const [message, setMessage] = useState("");
  const [hasSession, setHasSession] = useState(false);
  const { control, handleSubmit, resetField, setError, formState: { errors, isSubmitting } } = useForm<Credentials>({ resolver: zodResolver(isRegister ? signUpSchema : credentialsSchema), defaultValues: { name: "", email: "", password: "" } });
  async function handleAuthenticate(value: Credentials) {
    if (!isReady || hasSession) return;
    setMessage("");
    try {
      const response = isRegister ? await createAccount(value) : await loginAccount(value);
      if (!response.isSuccess) {
        setMessage(response.message);
        const fields: Partial<Record<keyof Credentials, string[]>> = response.fieldErrors;
        for (const field of ["name", "email", "password"] as const) {
          const errors = fields[field];
          if (errors?.[0]) setError(field, { message: errors[0] });
        }
        return;
      }
      resetField("password");
      setMessage("ورود تأیید شد؛ صفحه در حال به‌روزرسانی است.");
      setHasSession(true);
      try { window.location.assign(returnTo); }
      catch { setMessage("ورود تأیید شد؛ برای ادامه پیوند زیر را انتخاب کنید."); }
    } catch { setMessage("اتصال برقرار نشد؛ کمی بعد دوباره تلاش کنید."); }
  }
  return <form className="auth-form" action={routes.login} method="get" noValidate aria-busy={isSubmitting} aria-describedby={`${id}-privacy ${id}-status`} onSubmit={handleSubmit(handleAuthenticate)}>
    <fieldset disabled={!isReady || isSubmitting || hasSession} className="auth-fields">
      <legend className="sr-only">{isRegister ? "ساخت حساب" : "ورود به حساب"}</legend>
      <div className="auth-name-slot">{isRegister ? <><label htmlFor={`${id}-name`}>نام</label><Controller name="name" control={control} render={({ field }) => <Input id={`${id}-name`} ref={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} autoComplete="name" maxLength={80} aria-required="true" aria-invalid={!!errors.name} aria-describedby={`${id}-name-error`} />} /><p id={`${id}-name-error`} className="field-error" aria-live="polite">{errors.name?.message}</p></> : <div className="auth-reminder"><ShieldCheck aria-hidden="true" /><div><strong>حساب شخصی، نه پروندهٔ درمانی</strong><p>برای ورود فقط ایمیل و رمزتان لازم است؛ شرح‌حال یا اطلاعات حساس ننویسید.</p></div></div>}</div>
      <div className="auth-field"><label htmlFor={`${id}-email`}>ایمیل</label><Controller name="email" control={control} render={({ field }) => <Input id={`${id}-email`} ref={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} type="email" inputMode="email" dir="ltr" autoComplete="username" maxLength={254} aria-required="true" aria-invalid={!!errors.email} aria-describedby={`${id}-email-error`} />} /><p id={`${id}-email-error`} className="field-error" aria-live="polite">{errors.email?.message}</p></div>
      <div className="auth-field"><label htmlFor={`${id}-password`}>رمز عبور <span className="muted">(۸ تا ۱۲۸ نویسه)</span></label><Controller name="password" control={control} render={({ field }) => <Input id={`${id}-password`} ref={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} type="password" dir="ltr" autoComplete={isRegister ? "new-password" : "current-password"} maxLength={128} aria-required="true" aria-invalid={!!errors.password} aria-describedby={`${id}-password-error`} />} /><p id={`${id}-password-error`} className="field-error" aria-live="polite">{errors.password?.message}</p></div>
      <Button type="submit" size="lg">{isSubmitting ? "در حال بررسی…" : isRegister ? "ساخت حساب و ورود" : "ورود به حساب"}<ArrowUpLeft aria-hidden="true" /></Button>
    </fieldset>
    <p id={`${id}-status`} className="auth-status" role="status">{message || (!isReady ? "ورود هنوز روی این میزبان تنظیم نشده است؛ اطلاعات واقعی وارد نکنید." : "اطلاعات حساب فقط هنگام انتخاب دکمه ارسال می‌شود.")}</p>
    {hasSession && <a className="quiet-link" href={returnTo}>ادامه پس از ورود</a>}
    <div className="message-privacy" id={`${id}-privacy`}><ShieldCheck aria-hidden="true" /><p>{notices.confidentiality} <Link href={routes.privacy}>حریم خصوصی</Link> و <Link href={routes.terms}>شرایط استفاده</Link> را پیش از ادامه بخوانید.</p></div>
    <noscript><p className="query-notice">برای ورود، جاوااسکریپت مرورگر را فعال کنید. با بازشدن دوبارهٔ صفحه، اطلاعات این فرم در نشانی صفحه فرستاده نمی‌شوند.</p></noscript>
  </form>;
}
