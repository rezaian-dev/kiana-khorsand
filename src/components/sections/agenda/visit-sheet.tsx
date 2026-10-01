"use client";

import { useEffect, useEffectEvent, useId, useOptimistic, useRef, useState, useTransition, type KeyboardEvent } from "react";
import { useDraft } from "@/lib/use-draft";
import { requestLive } from "@/lib/live-client";
import { DraftNotice } from "@/components/shared/draft-notice";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet-trigger";
import { SheetContent } from "@/components/ui/sheet-content";
import { SheetTitle } from "@/components/ui/sheet-title";
import { SheetDescription } from "@/components/ui/sheet-description";
import { operationSchema, visitActions, type AgendaEntry, type Operation } from "@/lib/agenda";
import { appointmentStates, resultCodes, routes } from "@/lib/constants";
import { appointmentLabels } from "@/lib/visits";
import { formatDate, formatNumber } from "@/lib/format";
import { getInstant } from "@/lib/slots";
import type { Slot } from "@/lib/result";
import { notices } from "@/content/profile";
import { changeStatus, getMoveTimes, moveAppointment } from "@/server/actions/appointments";

type Props = { entry: AgendaEntry; title: string; checkedAt: string };
const actionLabels = { confirm: "تأیید نوبت", cancel: "لغو نوبت", complete: "ثبت انجام‌شدن جلسه", move: "جابه‌جایی نوبت" };

export function VisitSheet({ entry, title, checkedAt }: Props) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isWriting, startWrite] = useTransition();
  const [isReading, startRead] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic<Operation | null, Operation>(null, (_current, next) => next);
  const [availability, setAvailability] = useState<{ slots: Slot[]; checkedAt: string; revision: number } | null>(null);
  const request = useRef(0);
  const isSending = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const { register, control, reset, setValue, handleSubmit, formState: { errors, isDirty } } = useForm<Operation>({ resolver: zodResolver(operationSchema), defaultValues: { id: entry.id, revision: entry.revision, action: entry.canConfirm ? visitActions.confirm : entry.canMove ? visitActions.move : entry.canComplete ? visitActions.complete : visitActions.cancel, date: "", slot: "", scheduleRevision: 0 } });
  const [action, date, slot] = useWatch({ control, name: ["action", "date", "slot"] });
  const { snapshot, hasChanged, discard } = useDraft({ value: entry, version: `${entry.revision}:${entry.canConfirm}:${entry.canMove}:${entry.canCancel}:${entry.canComplete}`, isPaused: isWriting || (isDirty && !isSaved), onApply(next) {
    reset({ id: next.id, revision: next.revision, action: next.canConfirm ? visitActions.confirm : next.canMove ? visitActions.move : next.canComplete ? visitActions.complete : visitActions.cancel, date: "", slot: "", scheduleRevision: 0 });
    setIsSaved(false); setIsBlocked(false); setAvailability(null);
  } });
  const isFresh = availability !== null && availability.checkedAt === checkedAt && availability.revision === snapshot.revision && !hasChanged;
  const selected = isFresh ? availability.slots.find((value) => value.date === date && value.slot === slot) : undefined;
  const canAct = !hasChanged && !isBlocked && !isSaved && !isWriting && !isReading && (action === visitActions.confirm ? entry.canConfirm : action === visitActions.cancel ? entry.canCancel : action === visitActions.complete ? entry.canComplete : entry.canMove && !!selected);
  const days = [...new Set(availability?.slots.map((value) => value.date) ?? [])];

  function handleOpen(isNext: boolean) {
    if (isNext && isSending.current) return;
    request.current += 1;
    if (isNext && !isBlocked && !isSaved) {
      discard(); setMessage(""); setAvailability(null);
      reset({ id: entry.id, revision: entry.revision, action: entry.canConfirm ? visitActions.confirm : entry.canMove ? visitActions.move : entry.canComplete ? visitActions.complete : visitActions.cancel, date: "", slot: "", scheduleRevision: 0 });
    }
    setIsOpen(isNext);
    if (!isNext && !isSending.current) requestLive();
  }
  function handleRead() {
    if (hasChanged || isBlocked || isWriting || isReading) return;
    const token = ++request.current;
    setMessage("");
    startRead(async () => {
      try {
        const result = await getMoveTimes({ id: snapshot.id, revision: snapshot.revision });
        if (token !== request.current) return;
        if (result.isSuccess) {
          setAvailability({ slots: result.value, checkedAt, revision: snapshot.revision });
          setMessage(result.value.length ? "زمان‌های قابل انتخاب دریافت شدند؛ انتخاب قبلی خودکار عوض نمی‌شود." : "در برنامهٔ فعالِ ۳۲ روز پیش رو زمان قابل انتخابی پیدا نشد.");
        } else { setAvailability(null); setMessage(result.message); }
      } catch { if (token === request.current) { setAvailability(null); setMessage("زمان‌ها دریافت نشدند؛ هیچ تغییری ارسال نشده است."); } }
    });
  }
  const handleAvailability = useEffectEvent(() => { if (isOpen && action === visitActions.move) handleRead(); });
  useEffect(() => { const timer = setTimeout(handleAvailability, 250); return () => clearTimeout(timer); }, [isOpen, action, checkedAt]);
  function handleWrite(value: Operation) {
    if (!canAct || isSending.current) return;
    isSending.current = true;
    setMessage("");
    startWrite(async () => {
      setOptimistic(value);
      try {
        const result = value.action === visitActions.move
          ? await moveAppointment({ id: value.id, revision: value.revision, date: value.date, slot: value.slot, scheduleRevision: selected?.scheduleRevision ?? value.scheduleRevision })
          : await changeStatus({ id: value.id, revision: value.revision, status: value.action === visitActions.confirm ? appointmentStates.confirmed : value.action === visitActions.cancel ? appointmentStates.cancelled : appointmentStates.completed });
        if (result.isSuccess) {
          setIsSaved(true);
          setMessage("ثبت تغییر از سرور تأیید شد.");
          toast.success("تغییر نوبت از سرور تأیید شد.");
        } else {
          setMessage(result.message); toast.error(result.message);
          setIsBlocked([resultCodes.unavailable, resultCodes.conflict, resultCodes.unauthorized, resultCodes.forbidden].some((code) => code === result.code));
          setAvailability(null);
        }
      } catch {
        setIsBlocked(true);
        setMessage("نتیجه مشخص نیست؛ ناموفق‌بودن قطعی فرض نمی‌شود. ارسال دوباره متوقف شد.");
        toast.error("نتیجهٔ تغییر مشخص نیست؛ ارسال دوباره متوقف شد.");
      } finally { isSending.current = false; requestLive(); }
    });
  }
  function handleKey(event: KeyboardEvent<HTMLFormElement>) {
    if (event.nativeEvent.isComposing || event.repeat || event.altKey) return;
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") { event.preventDefault(); if (canAct) form.current?.requestSubmit(); }
  }
  return <div><Sheet open={isOpen} onOpenChange={handleOpen}><SheetTrigger asChild><Button variant="outline" disabled={isWriting} aria-label={`جزئیات نوبت ${entry.name}، ${formatDate(new Date(entry.startsAt))}`}>{optimistic ? "در انتظار پاسخ…" : "جزئیات و اقدام"}</Button></SheetTrigger><SheetContent isOpen={isOpen} side="left" className="record-sheet"><SheetTitle>بررسی نوبت {snapshot.name}</SheetTitle><SheetDescription>ویرایش ذخیره‌نشده حفظ می‌شود. بستن پنجره، درخواست ارسال‌شده را متوقف نمی‌کند.</SheetDescription><div className="record-summary"><strong>{title}</strong><p>{formatDate(new Date(snapshot.startsAt), { dateStyle: "full", timeStyle: "short" })} · تهران</p><p>{appointmentLabels[snapshot.status]} · نسخهٔ {formatNumber(snapshot.revision)}</p><p>آخرین به‌روزرسانی: {formatDate(new Date(snapshot.updatedAt), { dateStyle: "medium", timeStyle: "short" })}</p><p>شناسه: <bdi>{snapshot.id}</bdi></p></div>
      <form ref={form} action={routes.agenda} method="get" noValidate onSubmit={(event) => { void handleSubmit(handleWrite)(event); }} onKeyDown={handleKey} aria-busy={isWriting} data-live-pause={isWriting || (isDirty && !isSaved)} aria-describedby={`${id}-message ${id}-privacy`}>
        <fieldset disabled={isWriting || isSaved || isBlocked || hasChanged}><legend>اقدام روی همین نوبت</legend><label htmlFor={`${id}-action`}>نوع تغییر</label><select {...register("action")} id={`${id}-action`} className="admin-select"><option value={visitActions.confirm} disabled={!entry.canConfirm}>{actionLabels.confirm}</option><option value={visitActions.cancel} disabled={!entry.canCancel}>{actionLabels.cancel}</option><option value={visitActions.complete} disabled={!entry.canComplete}>{actionLabels.complete}</option><option value={visitActions.move} disabled={!entry.canMove}>{actionLabels.move}</option></select>
          {action === visitActions.move && <div className="move-fields"><span role="status">{isReading ? "در حال دریافت زمان‌ها…" : ""}</span><p>۳۲ روز پیش رو؛ زمان فعلی خود نوبت از اشغال‌ها کنار گذاشته می‌شود. دریافت فهرست، زمان را نگه نمی‌دارد.</p>{!isFresh && <p className="member-feedback">زمان‌های تازه به‌صورت خودکار دریافت می‌شوند.</p>}<label htmlFor={`${id}-date`}>روز تازه</label><select {...register("date", { onChange: () => { setValue("slot", ""); setValue("scheduleRevision", 0); } })} className="admin-select" id={`${id}-date`} disabled={!isFresh || isReading}><option value="">روز را انتخاب کنید</option>{date && !days.includes(date) && <option value={date} disabled>{formatDate(getInstant(date, "12:00"))}؛ دیگر قابل انتخاب نیست</option>}{days.map((day) => <option value={day} key={day}>{formatDate(getInstant(day, "12:00"), { weekday: "long", day: "numeric", month: "long" })}</option>)}</select><label htmlFor={`${id}-slot`}>ساعت تازه، به وقت تهران</label><select {...register("slot", { onChange: (event: { target: { value: string } }) => { const next = availability?.slots.find((value) => value.date === date && value.slot === event.target.value); setValue("scheduleRevision", next?.scheduleRevision ?? 0); } })} className="admin-select" id={`${id}-slot`} disabled={!isFresh || !date || isReading}><option value="">ساعت را انتخاب کنید</option>{slot && !availability?.slots.some((value) => value.date === date && value.slot === slot) && <option value={slot} disabled>انتخاب قبلی؛ دیگر قابل انتخاب نیست</option>}{availability?.slots.filter((value) => value.date === date).map((value) => <option value={value.slot} key={value.slot}>{formatDate(new Date(value.startsAt), { hour: "2-digit", minute: "2-digit" })}</option>)}</select></div>}
          <p className="field-error" role="status">{errors.slot?.message || (Object.keys(errors).length ? "انتخاب‌ها را بررسی کنید." : "")}</p>
          <p>{action === visitActions.cancel ? "لغو، نوبت را آزاد می‌کند؛ حذف حساب یا تأیید بازپرداخت نیست." : action === visitActions.complete ? "فقط در صورتی ثبت کنید که جلسه واقعاً انجام شده است؛ این وضعیت گزارش درمان نیست." : "فقط انتخاب دکمهٔ ثبت یا میان‌بر تأیید، درخواست تغییر می‌فرستد."}</p>
          <Button type="submit" variant={action === visitActions.cancel ? "destructive" : "default"} disabled={!canAct}>{isWriting ? "در انتظار تأیید سرور…" : `ثبت: ${actionLabels[action]}`}</Button>
        </fieldset>
        <p className="member-feedback" id={`${id}-message`} role="status">{optimistic ? `پیش‌نمایش موقت: ${actionLabels[optimistic.action]}${optimistic.action === visitActions.move ? ` به ${formatDate(getInstant(optimistic.date, optimistic.slot), { dateStyle: "medium", timeStyle: "short" })}` : ""}؛ در انتظار پاسخ. هنوز ثبت قطعی نشده است.` : message || (hasChanged ? "نسخهٔ سرور تغییر کرده است؛ انتخاب‌های ذخیره‌نشدهٔ شما حفظ شده‌اند." : !entry.canConfirm && !entry.canCancel && !entry.canComplete && !entry.canMove ? "این نوبت در وضعیت فعلی اقدام قابل ثبت ندارد." : "هیچ تغییر تأییدنشده‌ای به‌عنوان نتیجهٔ قطعی نمایش داده نمی‌شود.")}</p>
        <DraftNotice hasChanged={hasChanged} isDisabled={isWriting} onDiscard={discard} />
        <p id={`${id}-privacy`} className="search-privacy">{notices.confidentiality} فقط برای هماهنگی ضروری استفاده کنید؛ شرح‌حال ثبت نمی‌شود.</p><p className="panel-note">میان‌بر ثبت: کنترل یا فرمان + اینتر؛ بستن: اِسکیپ. تغییر وضعیت همیشه در سرور دوباره بررسی می‌شود.</p>
      </form></SheetContent></Sheet></div>;
}
