"use client";

import Link from "next/link";
import { useId, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TZDate } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { bookingSchema } from "@/lib/mutations";
import { buildLogin, type Availability, type BookingValues, type Selection } from "@/lib/booking";
import { getDay, getInstant } from "@/lib/slots";
import { formatDate } from "@/lib/format";
import { resultCodes, routes } from "@/lib/constants";
import type { Slot } from "@/lib/result";
import { bookAppointment } from "@/server/actions/appointments";
import { notices } from "@/content/profile";

type Props = { availability: Availability; selection: Selection; viewer: { name: string } | null; hasError: boolean; services: { key: BookingValues["service"]; title: string }[] };

export function BookingForm({ availability, selection, viewer, hasError, services }: Props) {
  const id = useId();
  const router = useRouter();
  const hasRequest = useRef(false);
  const [isPending, startTransition] = useTransition();
  const [isBooked, setIsBooked] = useState(false);
  const [isUncertain, setIsUncertain] = useState(false);
  const [message, setMessage] = useState("");
  const [alternatives, setAlternatives] = useState<Slot[]>([]);
  const { slots, today, until, isEnabled } = availability;
  const initial = slots.find((slot) => slot.date === selection.date && slot.slot === selection.slot);
  const { control, setValue, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<BookingValues>({ resolver: zodResolver(bookingSchema), defaultValues: { service: selection.service, date: selection.date ?? "", slot: selection.slot ?? "", scheduleRevision: initial?.scheduleRevision ?? 0 } });
  const values = useWatch({ control });
  const isBusy = isSubmitting || isPending;
  const isLocked = isBusy || isBooked || isUncertain;
  const current = slots.find((slot) => slot.date === values.date && slot.slot === values.slot && slot.scheduleRevision === values.scheduleRevision);
  const hasStale = !!values.slot && !current;
  const days = new Set(slots.map((slot) => slot.date));
  const daySlots = slots.filter((slot) => slot.date === values.date);
  const suggestions = alternatives.length ? alternatives : hasStale ? slots.filter((slot) => slot.date >= (values.date ?? today)).slice(0, 3) : [];
  const destination = buildLogin({ service: values.service, date: values.date || undefined, slot: values.date && values.slot ? values.slot : undefined });
  const getDate = (date: string) => new TZDate(getInstant(date, "12:00"), "Asia/Tehran");
  const [month, setMonth] = useState(() => getDate(selection.date ?? today));

  function handleDay(date: Date | undefined) {
    if (!date || isLocked) return;
    setValue("date", getDay(date), { shouldDirty: true, shouldValidate: true });
    setValue("slot", "", { shouldDirty: true });
    setValue("scheduleRevision", 0);
    setMessage("");
    setAlternatives([]);
  }

  function handleSlot(slot: Slot) {
    if (isLocked) return;
    setValue("date", slot.date, { shouldValidate: true, shouldDirty: true });
    setValue("slot", slot.slot, { shouldValidate: true, shouldDirty: true });
    setValue("scheduleRevision", slot.scheduleRevision, { shouldValidate: true, shouldDirty: true });
    setMonth(getDate(slot.date));
    setAlternatives([]);
    setMessage("");
  }

  function handleBook(value: BookingValues) {
    if (hasRequest.current || isLocked || !isEnabled || !current) return;
    if (!viewer) { window.location.assign(destination); return; }
    hasRequest.current = true;
    setMessage("");
    setAlternatives([]);
    startTransition(async () => {
      try {
        const result = await bookAppointment(value);
        if (result.isSuccess) {
          setIsBooked(true);
          toast.success("درخواست نوبت ذخیره شد؛ تأیید نهایی جلسه نیست.");
          setMessage("درخواست شما ثبت شد و در انتظار بررسی است؛ جلسه هنوز تأیید نشده است. وضعیت را در نوبت‌های من ببینید.");
        } else {
          setMessage(result.message);
          toast.error(result.code === resultCodes.unavailable ? "نتیجهٔ ثبت روشن نیست؛ پیش از هر تلاش تازه نوبت‌های من را بررسی کنید." : result.message);
          setAlternatives(result.alternatives ?? []);
          for (const key of ["service", "date", "slot", "scheduleRevision"] as const) {
            const field = result.fieldErrors[key]?.[0];
            if (field) setError(key, { message: field });
          }
          if (result.code === resultCodes.unavailable) setIsUncertain(true);
          if (result.code === resultCodes.unauthorized) setMessage("نشست حساب تأیید نشد. برای ادامه دوباره وارد شوید؛ این تلاش نوبتی ثبت نکرد.");
          if (result.code === resultCodes.occupied || result.code === resultCodes.conflict || result.code === resultCodes.invalid) router.refresh();
        }
      } catch {
        setIsUncertain(true);
        toast.error("نتیجهٔ ثبت روشن نیست؛ ارسال دوباره متوقف شد.");
        setMessage("نتیجهٔ درخواست روشن نیست؛ ممکن است ذخیره شده باشد. ارسال دوباره متوقف شد؛ پیش از هر تلاش تازه نوبت‌های حساب را بررسی کنید.");
      } finally { hasRequest.current = false; }
    });
  }

  return <form action={routes.booking} method="get" noValidate className="reservation-form" aria-label="درخواست نوبت" aria-describedby={`${id}-privacy`} aria-busy={isBusy} data-live-pause={isBusy} onSubmit={(event) => { void handleSubmit(handleBook)(event); }}>
    <div className="booking-choices"><fieldset disabled={isLocked || !isEnabled} className="booking-services"><legend><span>۱</span> کدام نوع جلسه؟</legend><div className="service-options">{services.map((service) => <Button key={service.key} type="button" variant="outline" aria-pressed={values.service === service.key} onClick={() => setValue("service", service.key, { shouldValidate: true, shouldDirty: true })}>{service.title}</Button>)}</div><p className="field-error" role="status">{errors.service && "نوع جلسه را انتخاب کنید."}</p><p className="muted">آنلاین شیوهٔ برگزاری است؛ مناسب‌بودن آن باید پیش از تأیید بررسی شود.</p></fieldset>
    <div className="booking-when"><fieldset disabled={isLocked || !isEnabled} className="booking-calendar"><legend><span>۲</span> چه روزی؟</legend><Calendar mode="single" required today={getDate(today)} month={month} onMonthChange={(date) => setMonth(new TZDate(date, "Asia/Tehran"))} selected={values.date ? getDate(values.date) : undefined} startMonth={getDate(today)} endMonth={getDate(until)} disabled={(date) => isLocked || !isEnabled || !days.has(getDay(date))} onSelect={handleDay} /><div className="booking-dates">{Array.from(days, (date) => <Button type="button" variant="outline" key={date} aria-pressed={values.date === date} onClick={() => handleDay(getDate(date))}>{formatDate(getDate(date), { weekday: "short", day: "numeric", month: "long" })}</Button>)}</div><p className="field-error" role="status">{errors.date && "یک روز در دسترس انتخاب کنید."}</p></fieldset>
    <fieldset disabled={isLocked || !isEnabled} className="booking-times"><legend><span>۳</span> چه ساعتی؟</legend><p className="muted">همهٔ ساعت‌ها به وقت تهران‌اند.</p><div className="slot-options">{daySlots.map((slot) => <Button type="button" variant="outline" key={slot.startsAt} aria-pressed={current?.startsAt === slot.startsAt} onClick={() => handleSlot(slot)}>{formatDate(new Date(slot.startsAt), { hour: "2-digit", minute: "2-digit" })}</Button>)}</div><p className="slot-notice" role="status">{!isEnabled ? "رزرو در تنظیمات غیرفعال است." : !slots.length ? "در بازهٔ فعلی زمان آزادی ثبت نشده است." : !values.date ? "برای دیدن ساعت‌ها، ابتدا روز را انتخاب کنید." : !daySlots.length ? "این روز دیگر زمان آزاد ندارد؛ روز دیگری انتخاب کنید." : "زمان انتخابی تا ثبت درخواست برای شما نگه داشته نمی‌شود."}</p><p className="field-error" role="status">{errors.slot && "یک ساعت در دسترس انتخاب کنید."}</p></fieldset></div></div>
    <section className="booking-summary" aria-labelledby={`${id}-summary`}><p className="section-eyebrow">یک قدم تا ثبت درخواست</p><h2 id={`${id}-summary`}>۴. انتخاب شما</h2><dl><div><dt>نوع جلسه</dt><dd>{services.find((service) => service.key === values.service)?.title ?? "هنوز انتخاب نشده"}</dd></div><div><dt>روز</dt><dd>{values.date ? formatDate(getDate(values.date)) : "هنوز انتخاب نشده"}</dd></div><div><dt>ساعت تهران</dt><dd>{values.date && values.slot ? formatDate(getInstant(values.date, values.slot), { hour: "2-digit", minute: "2-digit" }) : "هنوز انتخاب نشده"}{current && <> تا {formatDate(new Date(current.endsAt), { hour: "2-digit", minute: "2-digit" })}</>}</dd></div></dl>
    <p>{viewer ? `${viewer.name}، درخواست با حساب فعلی شما ثبت می‌شود.` : "برای ثبت درخواست، ورود یا ساخت حساب لازم است. انتخاب شما به صفحهٔ ورود منتقل می‌شود؛ زمان برایتان نگه داشته نمی‌شود."}</p>
    <p id={`${id}-privacy`} className="booking-privacy">{notices.confidentiality} در این فرم شرح‌حال نمی‌گیریم. <Link href={routes.privacy}>حریم خصوصی</Link></p>
    <div className="booking-submit"><p>ثبت درخواست، نه تأیید نهایی جلسه</p><Button type="submit" size="lg" disabled={isLocked || !isEnabled || !current || !values.service}>{isBusy ? "در حال ثبت درخواست…" : isBooked ? "درخواست ثبت شد" : isUncertain ? "نتیجه نیاز به پیگیری دارد" : viewer ? "ثبت درخواست نوبت" : "ورود و ادامهٔ رزرو"}</Button></div>
    <div className="booking-result" role="status" aria-live="polite"><p>{isBusy ? "لطفاً صبر کنید؛ خروج از صفحه درخواست در حال ارسال را متوقف نمی‌کند." : message || (hasStale ? "زمان انتخابی یا برنامه تغییر کرده است؛ یکی از زمان‌های تازه را صریحاً انتخاب کنید." : hasError ? "انتخاب پیوند معتبر یا در بازهٔ فعلی نبود؛ دوباره انتخاب کنید." : "ثبت، به معنی درخواست در انتظار بررسی است؛ نه تأیید جلسه یا پرداخت.")}</p></div>
    {(isBooked || isUncertain) && <Link className="quiet-link" href={routes.appointments} prefetch={false}>بررسی نوبت‌های من</Link>}
    {isUncertain && <p className="muted">اگر وضعیت همچنان روشن نبود، از راه تماس تأییدشده پیگیری کنید؛ نبودن فوری یک ردیف، دلیل قطعی ثبت‌نشدن نیست.</p>}
    {!isBooked && !isUncertain && viewer && <Link href={destination} prefetch={false} className="quiet-link">ورود دوباره با حفظ انتخاب</Link>}
    {!isBooked && !isUncertain && suggestions.length > 0 && <div className="booking-alternatives"><h3>زمان‌های دیگر در دسترس</h3>{suggestions.map((slot) => <Button type="button" variant="outline" key={`${slot.startsAt}-${slot.scheduleRevision}`} disabled={isBusy || !slots.some((fresh) => fresh.startsAt === slot.startsAt && fresh.scheduleRevision === slot.scheduleRevision)} onClick={() => handleSlot(slot)}>{formatDate(new Date(slot.startsAt), { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Button>)}</div>}
    <noscript><p>انتخاب زمان و ارسال به جاوااسکریپت نیاز دارد. بدون آن دکمهٔ فرم فقط همین صفحه را باز می‌کند و درخواستی ثبت نمی‌شود.</p></noscript>
    </section>
  </form>;
}
