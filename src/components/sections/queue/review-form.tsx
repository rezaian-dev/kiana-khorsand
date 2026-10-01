"use client";

import { useId, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useDraft } from "@/lib/use-draft";
import { requestLive } from "@/lib/live-client";
import { DraftNotice } from "@/components/shared/draft-notice";
import { Button } from "@/components/ui/button";
import { moderationSchema, queueLabels, type Moderation } from "@/lib/queue";
import { reviewStates, resultCodes, routes } from "@/lib/constants";
import { moderateTestimonial } from "@/server/actions/content";

type Props = { value: Moderation; isSample: boolean };

export function ReviewForm({ value, isSample }: Props) {
  const id = useId();
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isSending = useRef(false);
  const { register, handleSubmit, reset, formState: { isDirty, errors } } = useForm<Moderation>({ resolver: zodResolver(moderationSchema), defaultValues: value });
  const { snapshot, hasChanged, discard } = useDraft({ value, version: value.revision, isPaused: isPending || (isDirty && !isSaved), onApply(next) { reset(next); setIsSaved(false); setIsBlocked(false); } });
  const canSave = !hasChanged && !isSaved && !isBlocked && !isPending;
  function handleSave(change: Moderation) {
    if (!canSave || isSending.current) return;
    isSending.current = true;
    startTransition(async () => {
      try {
        const result = await moderateTestimonial(change);
        if (result.isSuccess) { setIsSaved(true); setMessage("تصمیم بررسی از سرور تأیید شد."); toast.success("تصمیم بررسی دیدگاه ثبت شد."); }
        else { setMessage([result.message, ...Object.values(result.fieldErrors).flatMap((values) => values ?? [])].join(" ")); setIsBlocked(result.code !== resultCodes.invalid && result.code !== resultCodes.limited); toast.error(result.message); }
      } catch { setIsBlocked(true); setMessage("نتیجه مشخص نیست؛ ارسال دوباره متوقف شد."); toast.error("نتیجهٔ بررسی دیدگاه مشخص نیست."); }
      finally { isSending.current = false; requestLive(); }
    });
  }
  return <form action={routes.reviews} method="post" noValidate aria-busy={isPending} data-live-pause={isPending || (isDirty && !isSaved)} onSubmit={(event) => { void handleSubmit(handleSave)(event); }} aria-describedby={`${id}-status ${id}-privacy`}><fieldset disabled={!canSave}><legend>تصمیم انتشار</legend><label htmlFor={`${id}-value`}>وضعیت تازه</label><select id={`${id}-value`} {...register("status")} defaultValue={snapshot.status} className="admin-select">{Object.values(reviewStates).map((status) => <option key={status} value={status} disabled={isSample && status === reviewStates.approved}>{queueLabels[status]}</option>)}</select><label className="review-check"><input type="checkbox" {...register("hasConsent")} defaultChecked={snapshot.hasConsent} />رضایت معتبر برای انتشار همین متن و نام نمایشی وجود دارد.</label><label className="review-check"><input type="checkbox" {...register("isImageRemoved")} defaultChecked={snapshot.isImageRemoved} />تصویر حذف شود و دیدگاه بدون عکس نمایش داده شود.</label><p>تأیید فقط برای روایت واقعی با رضایت انتشار ممکن است؛ تصویر نمونه قابل انتشار همراه روایت واقعی نیست. این ابزار متن یا برچسب نمونه را تغییر نمی‌دهد.</p><p className="field-error">{errors.status?.message && /[\u0600-\u06ff]/.test(errors.status.message) ? errors.status.message : Object.keys(errors).length ? "وضعیت و انتخاب‌ها را بررسی کنید." : ""}</p><Button type="submit" disabled={!canSave}>{isPending ? "در حال ثبت…" : "ثبت تصمیم بررسی"}</Button></fieldset><p className="member-feedback" role="status" id={`${id}-status`}>{message || (hasChanged ? "نسخهٔ دیدگاه تغییر کرده؛ انتخاب شما حفظ شده است." : isSample ? "این دیدگاه نمونه است؛ انتشار آن به‌عنوان نظر واقعی بسته است." : "انتخاب تأییدشده پس از ذخیره، این روایت را عمومی می‌کند.")}</p><DraftNotice hasChanged={hasChanged} isDisabled={isPending} onDiscard={discard} /><p className="search-privacy" id={`${id}-privacy`}>محرمانگی و رضایت را مستقل بررسی کنید؛ این تیک جای مدرک رضایت یا ممیزی را نمی‌گیرد. رد/انتظار، روایت را از نمایش عمومی خارج می‌کند، نه از پایگاه‌داده. ذخیره به JavaScript نیاز دارد.</p></form>;
}
