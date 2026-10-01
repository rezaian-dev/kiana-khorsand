"use client";

import { useId, useState } from "react";
import { useDraft } from "@/lib/use-draft";
import { requestLive } from "@/lib/live-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet-trigger";
import { SheetContent } from "@/components/ui/sheet-content";
import { SheetTitle } from "@/components/ui/sheet-title";
import { SheetDescription } from "@/components/ui/sheet-description";
import { notices } from "@/content/profile";
import { changeSchema } from "@/lib/mutations";
import { resultCodes, routes } from "@/lib/constants";
import { cancelBooking } from "@/server/actions/appointments";

type Props = { id: string; revision: number; canCancel: boolean; title: string; date: string; time: string };
type Change = z.infer<typeof changeSchema>;

export function CancelForm(props: Props) {
  const labelId = useId();
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isCancelled, setCancelled] = useState(false);
  const [isBlocked, setBlocked] = useState(false);
  const { handleSubmit, reset, formState: { isSubmitting } } = useForm<Change>({ resolver: zodResolver(changeSchema), defaultValues: { id: props.id, revision: props.revision } });
  const { snapshot, hasChanged } = useDraft({ value: props, version: `${props.revision}:${props.canCancel}`, isPaused: isSubmitting, onApply(next) { reset({ id: next.id, revision: next.revision }); setBlocked(false); } });
  function handleOpen(isNext: boolean) {
    if (isNext && isSubmitting) return;
    if (isNext) {
      reset({ id: props.id, revision: props.revision });
      if (!isBlocked && !isCancelled) setMessage("");
    } else if (!isSubmitting) requestLive();
    setOpen(isNext);
  }
  async function handleCancel(value: Change) {
    if (hasChanged || !props.canCancel || isCancelled || isBlocked) return;
    setMessage("");
    try {
      const result = await cancelBooking(value);
      if (result.isSuccess) {
        // The receipt is shown before the coordinated read can remove a cancelled row.
        toast.success("لغو نوبت تأیید شد؛ وضعیت تازه را در نوبت‌های من ببینید.");
        setCancelled(true);
        setMessage("لغو نوبت تأیید شد. وضعیت تازه در حساب نمایش داده می‌شود.");
      } else {
        setMessage(result.message);
        toast.error(result.message);
        setBlocked(result.code === resultCodes.unavailable || result.code === resultCodes.conflict || result.code === resultCodes.unauthorized || result.code === resultCodes.forbidden);
      }
    } catch {
      setBlocked(true);
      toast.error("نتیجهٔ لغو تأیید نشد؛ ارسال دوباره متوقف شد.");
      setMessage("نتیجهٔ لغو مشخص نیست؛ ارسال دوباره متوقف شد. ناموفق‌بودن قطعی فرض نمی‌شود.");
    } finally { requestLive(); }
  }
  return <div><Sheet open={isOpen} onOpenChange={handleOpen}>
    <SheetTrigger asChild><Button type="button" variant="outline" disabled={!props.canCancel || isCancelled || isSubmitting}>{isSubmitting ? "در حال بررسی لغو…" : isCancelled ? "لغو تأیید شد" : props.canCancel ? "بررسی لغو نوبت" : "لغو در دسترس نیست"}</Button></SheetTrigger>
    <SheetContent isOpen={isOpen} side="bottom" className="cancel-sheet">
      <SheetTitle>لغو این نوبت را تأیید می‌کنید؟</SheetTitle><SheetDescription>این اقدام فقط نوبت نمایش‌داده‌شده را لغو می‌کند؛ حذف حساب یا تأیید بازپرداخت نیست. بستن پنجره، درخواستِ ارسال‌شده را متوقف نمی‌کند.</SheetDescription>
      <div className="cancel-summary"><strong>{snapshot.title}</strong><p>{snapshot.date} · {snapshot.time} به وقت تهران</p></div>
      <form action={routes.appointments} method="get" noValidate onSubmit={handleSubmit(handleCancel)} aria-busy={isSubmitting} data-live-pause={isSubmitting} aria-describedby={`${labelId}-status ${labelId}-privacy`}>
        <p className="member-feedback" id={`${labelId}-status`} role="status">{message || (hasChanged ? "وضعیت نوبت تغییر کرده است؛ دادهٔ تازه در حال اعمال است." : "تا انتخاب دکمهٔ تأیید، هیچ تغییری ثبت نمی‌شود.")}</p>
        <div className="member-actions"><Button type="submit" variant="destructive" disabled={isSubmitting || hasChanged || !props.canCancel || isCancelled || isBlocked}>{isSubmitting ? "در حال بررسی لغو…" : "تأیید لغو نوبت"}</Button><Button type="button" variant="outline" onClick={() => handleOpen(false)}>{isSubmitting ? "بستن؛ بررسی ادامه دارد" : "بستن پنجره"}</Button></div>
        <div className="message-privacy" id={`${labelId}-privacy`}><ShieldCheck aria-hidden="true" /><p>{notices.confidentiality} شرایط مالی لغو هنوز اعلام نشده‌اند؛ این اقدام وعدهٔ بازپرداخت نیست.</p></div>
      </form>
    </SheetContent>
  </Sheet></div>;
}
