import {
  panelCardClassName,
  panelGridClassName,
  panelStatClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
import Link from "next/link";
import { requireUser } from "@/lib/session";
import {
  listMyAppointments,
  listMyNotes,
  listMyResults,
  listMyMessages,
} from "@/features/dashboard/queries";
import { PanelHeading } from "@/components/panels/panel-heading";
import { appointmentLabels } from "@/components/panels/labels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatNumber, formatTime } from "@/lib/format";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "پنل کاربری" };
export default async function Page() {
  const { user } = await requireUser();
  const [appointments, notes, results, messages] = await Promise.all([
    listMyAppointments(user.id),
    listMyNotes(user.id),
    listMyResults(user.id),
    listMyMessages(user.id),
  ]);
  const next = appointments
    .filter(
      (item) =>
        ["pending", "confirmed"].includes(item.status) &&
        item.startsAt > new Date(),
    )
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())[0];
  const stats = [
    {
      label: "نوبت‌ها",
      value: appointments.length,
      href: "/dashboard/appointments",
    },
    {
      label: "یادداشت‌های شخصی",
      value: notes.length,
      href: "/dashboard/notes",
    },
    {
      label: "نتایج خودسنجی",
      value: results.length,
      href: "/dashboard/assessments",
    },
    { label: "پیام‌ها", value: messages.length, href: "/dashboard/messages" },
  ];
  return (
    <>
      <PanelHeading
        title={`سلام ${user.name}`}
        description="مسیر خودت را اینجا دنبال کن؛ تنها اطلاعات حساب خودت نمایش داده می‌شود."
        action={{ href: "/book", label: "درخواست وقت" }}
      />
      <section className={panelGridClassName} aria-label="نمای کلی حساب">
        {stats.map((item) => (
          <Link href={item.href} key={item.href}>
            <Card className={`${panelCardClassName} ${panelStatClassName}`}>
              <CardHeader>
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <strong>{formatNumber(item.value)}</strong>
                <p>مشاهده جزئیات ←</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
      <section className={`${panelGridClassName} mt-6`}>
        <Card className={panelCardClassName}>
          <CardHeader>
            <CardTitle>نوبت پیش رو</CardTitle>
          </CardHeader>
          <CardContent>
            {next ? (
              <>
                <p>
                  {formatDate(next.startsAt)} · {formatTime(next.startsAt)}
                </p>
                <p className={panelMutedClassName}>
                  {appointmentLabels[next.status]}
                </p>
                <Link href="/dashboard/appointments">همه نوبت‌ها ←</Link>
              </>
            ) : (
              <>
                <p className={panelMutedClassName}>
                  هنوز نوبتی برای آینده ثبت نشده است.
                </p>
                <Link href="/book">درخواست وقت ←</Link>
              </>
            )}
          </CardContent>
        </Card>
        <Card className={panelCardClassName}>
          <CardHeader>
            <CardTitle>آخرین خودسنجی</CardTitle>
          </CardHeader>
          <CardContent>
            {results[0] ? (
              <>
                <p>
                  {results[0].band} · {formatDate(results[0].createdAt)}
                </p>
                <Link href="/dashboard/assessments">نتایج من ←</Link>
              </>
            ) : (
              <>
                <p className={panelMutedClassName}>
                  هنوز خودسنجی ثبت نکرده‌اید.
                </p>
                <Link href="/assessments">مشاهده خودسنجی‌ها ←</Link>
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
