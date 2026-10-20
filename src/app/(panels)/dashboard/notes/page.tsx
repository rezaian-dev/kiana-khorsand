import {
  panelCardClassName,
  panelGridClassName,
  panelStackClassName,
  panelMutedClassName,
} from "@/components/panels/panel-layout-classes";
import { requireUser } from "@/lib/session";
import { listMyMeetingNotes } from "@/features/dashboard/legacy-private-notes";
import { listMyNotes } from "@/features/dashboard/queries";
import { DeleteNoteButton } from "@/features/dashboard/ui/delete-note-button";
import { NoteForm } from "@/features/dashboard/ui/note-form";
import { PanelHeading, PanelEmpty } from "@/components/panels/ui";
import { formatDate } from "@/lib/format";
export const metadata = { title: "یادداشت‌های من" };
export default async function Page() {
  const { user } = await requireUser();
  const [notes, meetingNotes] = await Promise.all([
    listMyNotes(user.id),
    listMyMeetingNotes(user.id),
  ]);
  return (
    <>
      <PanelHeading
        title="یادداشت‌های من"
        description="جایی برای ثبت موضوع‌هایی که می‌خواهید بعداً به آن‌ها برگردید."
      />
      <div className={panelStackClassName}>
        <NoteForm />
        {notes.length ? (
          <div className={panelGridClassName}>
            {notes.map((item) => (
              <article
                className={`${panelCardClassName} ${panelStackClassName}`}
                key={item.id}
              >
                <h2>{item.title}</h2>
                <p className={panelMutedClassName}>{item.body}</p>
                <time dateTime={item.updatedAt.toISOString()}>
                  {formatDate(item.updatedAt)}
                </time>
                <div>
                  <DeleteNoteButton id={item.id} title={item.title} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <PanelEmpty message="هنوز یادداشتی ثبت نکرده‌اید." />
        )}
      </div>
      <section
        className={panelStackClassName}
        aria-labelledby="meeting-notes-archive-title"
      >
        <h2 id="meeting-notes-archive-title">
          یادداشت‌های خصوصی جلسه‌ها و کارگاه‌ها
        </h2>
        <p className={panelMutedClassName}>
          این نوشته‌ها تنها با حساب شما قابل مشاهده‌اند؛ پس از پایان یا لغو جلسه
          نیز در این آرشیو می‌مانند.
        </p>
        {meetingNotes.length ? (
          <div className={panelGridClassName}>
            {meetingNotes.map((item) => (
              <article
                className={`${panelCardClassName} ${panelStackClassName}`}
                key={item.id}
              >
                <h3>
                  {item.kind === "appointment"
                    ? "جلسهٔ مشاوره"
                    : "کارگاه آنلاین"}
                </h3>
                <p
                  className={`${panelMutedClassName} wrap-anywhere whitespace-pre-wrap`}
                >
                  {item.body ??
                    "این یادداشت قابل بازیابی نیست؛ کلید رمزنگاری را بررسی کنید."}
                </p>
                <time dateTime={item.updatedAt.toISOString()}>
                  {formatDate(item.updatedAt)}
                </time>
                <DeleteNoteButton
                  id={item.id}
                  title="یادداشت خصوصی جلسه"
                  meeting
                />
              </article>
            ))}
          </div>
        ) : (
          <PanelEmpty message="هنوز یادداشت جلسه‌ای ذخیره نکرده‌اید." />
        )}
      </section>
    </>
  );
}
