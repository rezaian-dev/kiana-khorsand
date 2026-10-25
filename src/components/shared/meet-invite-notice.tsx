import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpLeft,
  BellRing,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";

/** Brand-style cue, not an official Google asset or an embedded meeting room. */
function MeetMark() {
  return (
    <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
      <path d="M8 11h23v26H8z" fill="#00832d" />
      <path d="M31 17 42 11v26l-11-6z" fill="#00ac47" />
      <path d="M31 17v14l11 6V11z" fill="#00832d" />
      <path d="M8 11h23L20 22H8z" fill="#ffba00" />
      <path d="M8 37V22l12 15z" fill="#ea4335" />
      <path d="M31 11 20 22v15h11z" fill="#2684fc" />
    </svg>
  );
}

export function MeetInviteNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className="relative isolate my-6 overflow-hidden rounded-[2rem] border border-teal-200/70 bg-linear-to-bl from-[#eefbf9] via-white to-[#ecf3ff] shadow-[0_22px_70px_-38px_rgba(15,71,99,.42)] dark:border-teal-800/50 dark:from-[#102b33] dark:via-[#15242d] dark:to-[#182443]"
      aria-label="دریافت لینک جلسهٔ آنلاین"
    >
      <div className="pointer-events-none absolute -inset-e-20 -top-24 size-64 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-600/20" />
      <div className="relative grid items-center gap-4 p-5 sm:p-7 lg:grid-cols-[1fr_0.88fr] lg:gap-8 lg:p-8">
        <div className="min-w-0">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/85 px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/10">
            <MeetMark />
            <span className="text-fg text-sm font-extrabold" dir="ltr">
              Google Meet
            </span>
          </div>
          <p className="mb-2 text-xs font-extrabold tracking-wide text-teal-700 dark:text-teal-300">
            جلسهٔ آنلاین، در زمان هماهنگ‌شده
          </p>
          <h2 className="text-fg text-xl leading-[1.65] font-black text-balance sm:text-2xl">
            لینک دعوت را پشتیبان در همین سایت برایتان می‌فرستد
          </h2>
          <p className="mt-3 max-w-[54ch] text-sm/8 text-slate-700 dark:text-slate-200">
            پس از تأیید و هماهنگی، پیام پشتیبان را در بخش «تیکت و اعلان‌ها»ی
            حساب خود ببینید. اگر پرسشی دارید، همان‌جا پاسخ بدهید؛ نیازی به تماس
            تصویری داخل سایت نیست.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-200">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200/70 bg-white/70 px-3 py-1.5 dark:border-white/10 dark:bg-white/10">
              <BellRing size={15} aria-hidden="true" /> اعلان داخل حساب
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/70 bg-white/70 px-3 py-1.5 dark:border-white/10 dark:bg-white/10">
              <ShieldCheck size={15} aria-hidden="true" /> فقط برای حساب شما
            </span>
          </div>
          <Link
            href="/dashboard/messages"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-linear-to-l from-teal-700 to-blue-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-teal-800/15 transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 motion-safe:hover:-translate-y-0.5"
          >
            <MessagesSquare size={18} aria-hidden="true" />
            تیکت و اعلان‌های من
            <ArrowUpLeft size={15} aria-hidden="true" />
          </Link>
        </div>
        {!compact && (
          <div className="relative min-w-0 overflow-hidden rounded-[1.4rem] border-4 border-white/80 shadow-[0_18px_55px_-20px_rgba(7,46,76,.38)] dark:border-white/10">
            <Image
              src="/assets/images/meet-invite.jpg"
              alt="تصویرسازی جلسهٔ آنلاین در فضایی آرام با لپ‌تاپ و تقویم"
              width={1264}
              height={848}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-3/2 w-full object-cover"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
