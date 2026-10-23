import {
  panelListItemClassName,
  panelInlineFormClassName,
  panelCardClassName,
  panelStackClassName,
  panelButtonClassName,
  panelButtonOutlineClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
import { PanelSelect } from "@/components/panels/panel-select";
import {
  adminContacts,
  adminMessages,
  adminUsers,
} from "@/features/admin/queries";
import { setContactStatus, markClientRead } from "@/actions/admin";
import { SupportReplyForm } from "@/features/admin/ui/support-reply-form";
import {
  ArrowUpLeft,
  BellRing,
  Headset,
  MessageCircleMore,
} from "lucide-react";
import { meetInviteUrl } from "@/validations/admin";
import { FilterableList } from "@/components/panels/filterable-list";
import { PanelHeading, PanelEmpty } from "@/components/panels/panel-heading";
import { formatDate } from "@/lib/format";
export const metadata = { title: "تیکت‌های پشتیبانی" };
export default async function Page() {
  const [contacts, messages, users] = await Promise.all([
    adminContacts(),
    adminMessages(),
    adminUsers(),
  ]);
  const threads = [...new Set(messages.map((item) => item.threadId))];
  return (
    <>
      <PanelHeading
        title="تیکت‌های پشتیبانی"
        description="پیام‌های فرم تماس، گفت‌وگوی خصوصی حساب‌ها و ارسال لینک دعوت را مدیریت کنید."
      />
      <div className={panelStackClassName}>
        <section className={`${panelCardClassName} ${panelStackClassName}`}>
          <h2>فرم تماس</h2>
          {contacts.length ? (
            <FilterableList
              label="جست‌وجو در پیام‌های تماس"
              options={[
                { value: "new", label: "تازه" },
                { value: "read", label: "خوانده‌شده" },
                { value: "closed", label: "بسته‌شده" },
              ]}
              items={contacts.map((item) => ({
                key: item.id,
                status: item.status,
                search: `${item.name} ${item.subject} ${item.phone} ${item.body}`,
                content: (
                  <article
                    key={item.id}
                    className={`${panelCardClassName} ${panelListItemClassName}`}
                  >
                    <div>
                      <h3>
                        {item.name} · {item.subject}
                      </h3>
                      <p dir="ltr">{item.phone}</p>
                      <p>{item.body}</p>
                      <time
                        className={panelMutedClassName}
                        dateTime={item.createdAt.toISOString()}
                      >
                        {formatDate(item.createdAt)}
                      </time>
                    </div>
                    <form
                      action={setContactStatus}
                      className={`${panelInlineFormClassName} gap-[.65rem]!`}
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <PanelSelect
                        name="status"
                        defaultValue={item.status}
                        label="وضعیت پیام"
                        options={[
                          { value: "new", label: "تازه" },
                          { value: "read", label: "خوانده‌شده" },
                          { value: "closed", label: "بسته‌شده" },
                        ]}
                      />
                      <button
                        type="submit"
                        className={`${panelButtonClassName} ${panelButtonOutlineClassName}`}
                      >
                        ذخیره
                      </button>
                    </form>
                  </article>
                ),
              }))}
            />
          ) : (
            <PanelEmpty message="پیامی از فرم تماس ثبت نشده است." />
          )}
        </section>
        <section className="space-y-5" aria-labelledby="support-tickets-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-teal-700">
                ارتباط امن و مستقیم
              </p>
              <h2
                id="support-tickets-title"
                className="text-fg mt-1 text-xl font-black"
              >
                تیکت‌ها و اعلان‌ها
              </h2>
              <p className="text-muted mt-1 text-sm leading-7">
                پاسخ‌ها و لینک دعوت Google Meet را برای حساب درست ارسال کنید.
              </p>
            </div>
            <Headset size={30} className="text-teal-700" aria-hidden="true" />
          </div>
          <details className="rounded-3xl border border-teal-200 bg-gradient-to-bl from-teal-50 via-white to-blue-50 p-5 shadow-sm dark:border-teal-800 dark:from-teal-950/40 dark:via-slate-900 dark:to-blue-950/30">
            <summary className="text-fg cursor-pointer text-sm font-extrabold">
              ارسال پیام یا لینک دعوت به کاربر جدید
            </summary>
            <SupportReplyForm
              users={users
                .filter((user) => user.role !== "admin")
                .map((user) => ({ id: user.id, name: user.name }))}
            />
          </details>
          {threads.length ? (
            threads.map((threadId) => {
              const entries = messages
                .filter((item) => item.threadId === threadId)
                .reverse();
              const owner = users.find(
                (item) => item.id === entries[0]?.userId,
              );
              const unread = entries.filter(
                (item) => item.sender === "client" && !item.readAt,
              ).length;
              return (
                <article
                  className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-[0_18px_60px_-42px_rgba(15,55,70,.45)] sm:p-6 dark:border-white/10 dark:bg-slate-900/80"
                  key={threadId}
                >
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-800/20">
                        <MessageCircleMore size={22} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-fg font-extrabold">
                          {owner?.name || "حساب کاربری"}
                        </h3>
                        <p className="text-muted text-xs">
                          گفت‌وگوی خصوصی پشتیبانی
                        </p>
                      </div>
                    </div>
                    {unread > 0 && (
                      <form action={markClientRead}>
                        <input type="hidden" name="id" value={threadId} />
                        <button
                          type="submit"
                          className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-amber-100 px-3 text-xs font-bold text-amber-900"
                        >
                          <BellRing size={15} aria-hidden="true" /> {unread}{" "}
                          پیام جدید · خواندم
                        </button>
                      </form>
                    )}
                  </div>
                  <div className="max-h-[32rem] space-y-3 overflow-y-auto pe-1">
                    {entries.map((item) => (
                      <div
                        key={item.id}
                        className={`max-w-[min(100%,40rem)] rounded-2xl border px-4 py-3 ${item.sender === "client" ? "ml-auto border-blue-100 bg-blue-50/70 dark:border-blue-900 dark:bg-blue-950/20" : "mr-auto border-teal-100 bg-teal-50/70 dark:border-teal-900 dark:bg-teal-950/20"}`}
                      >
                        <p className="text-muted mb-1 text-xs font-bold">
                          {item.sender === "client" ? "کاربر" : "پشتیبان"}
                        </p>
                        <p className="text-fg text-sm leading-7 break-words whitespace-pre-wrap">
                          {item.body}
                        </p>
                        {item.meetUrl &&
                          meetInviteUrl.safeParse(item.meetUrl).success && (
                            <a
                              href={item.meetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700"
                            >
                              لینک دعوت Google Meet{" "}
                              <ArrowUpLeft size={15} aria-hidden="true" />
                            </a>
                          )}
                      </div>
                    ))}
                  </div>
                  <SupportReplyForm threadId={threadId} />
                </article>
              );
            })
          ) : (
            <PanelEmpty message="هنوز تیکتی ثبت نشده است؛ می‌توانید نخستین پیام را برای یکی از کاربران ارسال کنید." />
          )}
        </section>
      </div>
    </>
  );
}
