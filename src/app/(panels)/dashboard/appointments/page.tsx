import {
  panelCardClassName,
  panelGridClassName,
  panelStackClassName,
  panelMutedClassName,
  panelMetaClassName,
} from "@/components/panels/panel-styles";
import Link from "next/link";
import { requireUser } from "@/lib/session";
import { listMyAppointments } from "@/features/dashboard/queries";
import { listServices } from "@/features/services/queries";
import { PanelHeading, PanelEmpty } from "@/components/panels/panel-heading";
import { appointmentLabels } from "@/components/panels/labels";
import { MeetInviteNotice } from "@/components/shared/meet-invite-notice";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime, formatToman } from "@/lib/format";
export const metadata = { title: "نوبت‌های من" };
export default async function Page() {
  const { user } = await requireUser();
  const [appointments, services] = await Promise.all([
    listMyAppointments(user.id),
    listServices(),
  ]);
  return (
    <>
      <PanelHeading
        title="نوبت‌های من"
        description="وضعیت هر درخواست و زمان جلسه را اینجا ببینید."
        action={{ href: "/book", label: "درخواست وقت جدید" }}
      />
      {appointments.some((item) =>
        services.some(
          (service) =>
            service.slug === item.serviceId && service.mode === "online",
        ),
      ) && <MeetInviteNotice />}
      {appointments.length ? (
        <div className={panelGridClassName}>
          {appointments.map((item) => (
            <article
              className={`${panelCardClassName} ${panelStackClassName}`}
              key={item.id}
            >
              <div className={panelMetaClassName}>
                <Badge variant="secondary">
                  {appointmentLabels[item.status]}
                </Badge>
                <time dateTime={item.startsAt.toISOString()}>
                  {formatDate(item.startsAt)} · {formatTime(item.startsAt)}
                </time>
              </div>
              <h2>
                {services.find((service) => service.slug === item.serviceId)
                  ?.name || "جلسه مشاوره"}
              </h2>
              <p>{formatToman(item.price)}</p>
              {item.note && (
                <p className={panelMutedClassName}>یادداشت: {item.note}</p>
              )}
              <Link href={`/book/done?id=${item.id}`}>جزئیات درخواست ←</Link>
            </article>
          ))}
        </div>
      ) : (
        <PanelEmpty
          message="هنوز در این حساب نوبتی ثبت نشده است."
          href="/book"
          label="درخواست وقت"
        />
      )}
    </>
  );
}
