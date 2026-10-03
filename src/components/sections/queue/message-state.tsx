"use client";

import { useId, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { useDraft } from "@/lib/use-draft";
import { requestLive } from "@/lib/live-client";
import { DraftNotice } from "@/components/shared/draft-notice";
import { ChoiceField } from "@/components/shared/choice-field";
import { Button } from "@/components/ui/button";
import { messageEditSchema } from "@/lib/mutations";
import { messageStates, resultCodes, routes } from "@/lib/constants";
import { queueLabels } from "@/lib/queue";
import { changeMessage } from "@/server/actions/messages";

type Change = z.infer<typeof messageEditSchema>;
type Props = { value: Change };

export function MessageState({ value }: Props) {
  const id = useId();
  const [message, setMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isSending = useRef(false);
  const { control, handleSubmit, reset, formState: { isDirty, errors } } = useForm<Change>({ resolver: zodResolver(messageEditSchema), defaultValues: value });
  const { hasChanged, discard } = useDraft({ value, version: value.revision, isPaused: isPending || (isDirty && !isSaved), onApply(next) { reset(next); setIsSaved(false); setIsBlocked(false); } });
  const canSave = !isBlocked && !isSaved && !isPending && !hasChanged;
  function handleSave(change: Change) {
    if (!canSave || isSending.current) return;
    isSending.current = true;
    startTransition(async () => {
      try {
        const result = await changeMessage(change);
        if (result.isSuccess) { setIsSaved(true); setMessage("تغییر وضعیت تأیید شد؛ این به معنی ارسال پاسخ نیست."); toast.success("وضعیت پیام ذخیره شد."); }
        else { setMessage(result.message); setIsBlocked(result.code !== resultCodes.invalid && result.code !== resultCodes.limited); toast.error(result.message); }
      } catch { setIsBlocked(true); setMessage("نتیجه مشخص نیست؛ ارسال دوباره متوقف شد."); toast.error("نتیجهٔ تغییر پیام مشخص نیست."); }
      finally { isSending.current = false; requestLive(); }
    });
  }
  return <form action={routes.inbox} method="post" noValidate aria-busy={isPending} data-live-pause={isPending || (isDirty && !isSaved)} onSubmit={(event) => { void handleSubmit(handleSave)(event); }} aria-describedby={`${id}-status ${id}-privacy`}><fieldset disabled={!canSave}><legend>تغییر وضعیت، با انتخاب صریح</legend><label htmlFor={`${id}-value`}>وضعیت تازه</label><ChoiceField control={control} name="status" id={`${id}-value`} kind="segmented" label="وضعیت تازه" options={Object.values(messageStates).map((value) => ({ value, label: queueLabels[value] }))} disabled={!canSave} /><p className="field-error">{Object.keys(errors).length ? "وضعیت معتبر انتخاب کنید." : ""}</p><Button type="submit" disabled={!canSave}>{isPending ? "در حال ثبت…" : "ثبت وضعیت پیام"}</Button></fieldset><p className="member-feedback" role="status" id={`${id}-status`}>{message || (hasChanged ? "نسخهٔ پیام تغییر کرده؛ انتخاب شما خودکار جایگزین نشده است." : "بازکردن پیام، آن را خودکار خوانده‌شده نمی‌کند.")}</p><DraftNotice hasChanged={hasChanged} isDisabled={isPending} onDiscard={discard} /><p className="search-privacy" id={`${id}-privacy`}>اطلاعات خصوصی است؛ وضعیت فقط برای پیگیری داخلی است. بایگانی، حذف پیام یا سیاست نگهداری داده نیست. ذخیره به JavaScript نیاز دارد.</p></form>;
}
