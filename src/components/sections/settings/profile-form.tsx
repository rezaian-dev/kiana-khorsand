"use client";

import { useId, useState } from "react";
import { useDraft } from "@/lib/use-draft";
import { requestLive } from "@/lib/live-client";
import { DraftNotice } from "@/components/shared/draft-notice";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { profileSchema, type Profile } from "@/lib/auth";
import { updateProfile } from "@/lib/account";
import { resultCodes, routes } from "@/lib/constants";
import { notices } from "@/content/profile";

type Props = { profile: Profile };

export function ProfileForm({ profile }: Props) {
  const id = useId();
  const [message, setMessage] = useState("");
  const [isBlocked, setBlocked] = useState(false);
  const { control, handleSubmit, setError, reset, formState: { errors, isDirty, isSubmitting } } = useForm<Profile>({ resolver: zodResolver(profileSchema), defaultValues: profile });
  const { hasChanged, discard } = useDraft({ value: profile, version: JSON.stringify(profile), isPaused: isDirty || isSubmitting, onApply(next) { reset(next); setBlocked(false); } });
  async function handleSave(value: Profile) {
    if (isBlocked || hasChanged) return;
    setMessage("");
    const result = await updateProfile(value);
    if (!result.isSuccess) {
      setMessage(result.code === resultCodes.unavailable ? "نتیجهٔ ذخیره تأیید نشد؛ ممکن است تغییر ثبت شده باشد. پیش از تکرار، وضعیت را دوباره بررسی کنید." : result.message);
      setBlocked(result.code === resultCodes.unavailable || result.code === resultCodes.unauthorized || result.code === resultCodes.forbidden);
      for (const field of ["name", "phone"] as const) {
        const message = result.fieldErrors[field]?.[0];
        if (message) setError(field, { message });
      }
      requestLive();
      return;
    }
    reset(value);
    setMessage("نام و شمارهٔ تماس ذخیره شدند.");
    requestLive();
  }
  return <form className="member-form" action={routes.settings} method="get" noValidate onSubmit={handleSubmit(handleSave)} aria-busy={isSubmitting} data-live-pause={isDirty || isSubmitting} aria-describedby={`${id}-privacy ${id}-status`}>
    <fieldset disabled={isSubmitting || isBlocked}><legend className="sr-only">ویرایش نام و شمارهٔ تماس</legend>
      <div className="auth-field"><label htmlFor={`${id}-name`}>نام</label><Controller name="name" control={control} render={({ field }) => <Input id={`${id}-name`} ref={field.ref} value={field.value} onBlur={field.onBlur} onChange={field.onChange} maxLength={80} autoComplete="name" aria-required="true" aria-invalid={!!errors.name} aria-describedby={`${id}-name-error`} />} /><p id={`${id}-name-error`} className="field-error" aria-live="polite">{errors.name?.message}</p></div>
      <div className="auth-field"><label htmlFor={`${id}-phone`}>شمارهٔ همراه <span className="muted">(اختیاری)</span></label><Controller name="phone" control={control} render={({ field }) => <Input id={`${id}-phone`} ref={field.ref} value={field.value} onBlur={field.onBlur} onChange={field.onChange} type="tel" inputMode="tel" dir="ltr" maxLength={13} autoComplete="tel" placeholder="09…" aria-invalid={!!errors.phone} aria-describedby={`${id}-phone-error ${id}-phone-hint`} />} /><p id={`${id}-phone-error`} className="field-error" aria-live="polite">{errors.phone?.message}</p><p className="section-disclosure" id={`${id}-phone-hint`}>با رقم انگلیسی و ۰۹ یا ‎+۹۸ بنویسید؛ ذخیرهٔ شماره، تأیید مالکیت آن نیست.</p></div>
      <Button type="submit" disabled={!isDirty || hasChanged}>{isSubmitting ? "در حال ذخیره…" : "ذخیرهٔ مشخصات"}</Button>
    </fieldset>
    <div className="member-feedback" id={`${id}-status`} role="status">{message || "نام و شماره فقط با انتخاب ذخیره ارسال می‌شوند."}</div>
    <DraftNotice hasChanged={hasChanged} isDisabled={isSubmitting} onDiscard={discard} />
    <div className="message-privacy" id={`${id}-privacy`}><ShieldCheck aria-hidden="true" /><p>{notices.confidentiality} <Link href={routes.privacy}>حریم خصوصی</Link></p></div>
    <noscript><p className="query-notice">برای ذخیره، جاوااسکریپت لازم است؛ اطلاعات فرم در نشانی صفحه ارسال نمی‌شوند.</p></noscript>
  </form>;
}
