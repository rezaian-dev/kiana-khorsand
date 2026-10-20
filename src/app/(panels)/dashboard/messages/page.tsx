import { requireUser } from "@/lib/session";
import { listMyMessages } from "@/features/dashboard/queries";
import { MessageForm } from "@/features/dashboard/ui/message-form";
import { markSupportRead } from "@/actions/dashboard";
import { MeetInviteNotice } from "@/components/shared/meet-invite-notice";
import { meetInviteUrl } from "@/validations/admin";
import { formatDate, formatTime } from "@/lib/format";
import {
  ArrowUpLeft,
  BellRing,
  CheckCheck,
  Headset,
  MessagesSquare,
} from "lucide-react";

export const metadata = { title: "تیکت و اعلان‌های پشتیبانی" };
export default async function Page() {
  const { user } = await requireUser();
  const messages = await listMyMessages(user.id);
  const unread = messages.filter(
    (item) => item.sender !== "client" && !item.readAt,
  ).length;
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-bl from-[#0c5660] via-[#183c64] to-[#273966] p-6 text-white shadow-2xl shadow-slate-800/10 sm:p-9">
        <div className="pointer-events-none absolute -top-16 -left-16 size-60 rounded-full bg-cyan-300/15 blur-3xl" />
        <span className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">
          <Headset size={16} aria-hidden="true" /> همراه شما در هر قدم
        </span>
        <h1 className="relative mt-4 text-2xl leading-relaxed font-black sm:text-3xl">
          تیکت و اعلان‌های شما
        </h1>
        <p className="relative mt-2 max-w-[65ch] text-sm leading-8 text-white/85">
          پرسش‌ها و پاسخ‌های پشتیبان، از جمله لینک دعوت جلسه‌های آنلاین، فقط در
          حساب شما نمایش داده می‌شوند.
        </p>
        <div className="relative mt-5 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-white/15 px-3 py-1.5">
            گفت‌وگوی خصوصی
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <BellRing size={14} aria-hidden="true" />{" "}
            {unread
              ? `${unread} پیام خوانده‌نشده`
              : "همهٔ پیام‌ها خوانده شده‌اند"}
          </span>
        </div>
      </header>
      <MeetInviteNotice />
      <section
        className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_-42px_rgba(20,50,80,.45)] sm:p-6 dark:border-white/10 dark:bg-slate-900/80"
        aria-labelledby="support-history"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-800/20 dark:text-teal-200">
              <MessagesSquare size={21} aria-hidden="true" />
            </span>
            <div>
              <h2 id="support-history" className="text-fg font-extrabold">
                گفت‌وگو با پشتیبان
              </h2>
              <p className="text-xs leading-6 text-slate-600 dark:text-slate-300">
                تاریخچهٔ پیام‌های همین حساب
              </p>
            </div>
          </div>
          {unread > 0 && (
            <form action={markSupportRead}>
              <button
                type="submit"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-teal-200 px-3 text-xs font-bold text-teal-800 transition-colors hover:bg-teal-50 dark:border-teal-700 dark:text-teal-200 dark:hover:bg-teal-900/30"
              >
                <CheckCheck size={16} aria-hidden="true" /> علامت‌گذاری به‌عنوان
                خوانده‌شده
              </button>
            </form>
          )}
        </div>
        <div className="space-y-4" aria-live="polite">
          {messages.length ? (
            messages.map((item) => {
              const own = item.sender === "client";
              const invite = item.meetUrl
                ? meetInviteUrl.safeParse(item.meetUrl)
                : null;
              return (
                <article
                  key={item.id}
                  className={`max-w-[min(100%,45rem)] rounded-2xl border p-4 shadow-sm sm:p-5 ${own ? "mr-auto border-blue-100 bg-blue-50/80 dark:border-blue-900/50 dark:bg-blue-950/30" : "ml-auto border-teal-100 bg-teal-50/70 dark:border-teal-900/50 dark:bg-teal-950/30"}`}
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <span>{own ? "شما" : "پشتیبان"}</span>
                    <time dateTime={item.createdAt.toISOString()}>
                      {formatDate(item.createdAt)} ·{" "}
                      {formatTime(item.createdAt)}
                    </time>
                  </div>
                  <p className="text-fg text-sm leading-8 break-words whitespace-pre-wrap">
                    {item.body}
                  </p>
                  {invite?.success && (
                    <a
                      href={invite.data}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-l from-teal-700 to-blue-700 px-4 text-sm font-extrabold text-white shadow-md shadow-blue-900/15 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 motion-safe:hover:-translate-y-0.5"
                    >
                      ورود به جلسه در Google Meet{" "}
                      <ArrowUpLeft size={16} aria-hidden="true" />
                    </a>
                  )}
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-teal-200 bg-teal-50/60 p-7 text-center dark:border-teal-800 dark:bg-teal-900/20">
              <p className="text-fg font-bold">هنوز پیامی ندارید.</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                اولین پرسش خود را بنویسید؛ پشتیبان در همین گفت‌وگو پاسخ می‌دهد.
              </p>
            </div>
          )}
        </div>
      </section>
      <MessageForm />
    </div>
  );
}
