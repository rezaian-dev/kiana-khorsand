import {
  adminOverviewHeadingClassName,
  adminOverviewTitleClassName,
  adminOverviewStatusClassName,
  panelListClassName,
  panelListItemClassName,
  panelInlineFormClassName,
  panelCardClassName,
  panelButtonClassName,
  panelButtonOutlineClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
import { PanelSelect } from "@/components/panels/panel-select";
import Link from "next/link";
import {
  adminCalendarAppointments,
  adminPendingAppointments,
  adminUsers,
  adminServices,
} from "@/features/admin/queries";
import { setAppointmentStatus } from "@/actions/admin";
import { CalendarBoard } from "@/features/admin/ui/calendar-board";
import { PanelHeading, PanelEmpty } from "@/components/panels/panel-heading";
import { appointmentLabels } from "@/components/panels/labels";
import { formatDate, formatTime, formatNumber } from "@/lib/format";
import { dayKey, periodFor, validDayKey } from "@/lib/tehran-calendar";
export const metadata = { title: "تقویم و نوبت‌ها" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; date?: string }>;
}) {
  const query = await searchParams;
  const today = dayKey(new Date());
  const date =
    typeof query.date === "string" && validDayKey(query.date)
      ? query.date
      : today;
  const view =
    query.view === "day" || query.view === "month" ? query.view : "week";
  const period = periodFor(date, view);
  const [appointments, pending, users, services] = await Promise.all([
    adminCalendarAppointments(period.from, period.to),
    adminPendingAppointments(),
    adminUsers(),
    adminServices(),
  ]);
  const nameFor = (id: string) =>
    users.find((user) => user.id === id)?.name || "حساب حذف‌شده";
  const serviceFor = (id: string) =>
    services.find((service) => service.slug === id)?.name || "خدمت";
  return (
    <>
      <PanelHeading
        title="زمان‌بندی جلسه‌ها"
        description="نوبت‌های واقعی را در نماهای روز، هفته و ماه مرور و وضعیت درخواست‌ها را مدیریت کنید. ساعت‌ها به وقت تهران‌اند."
        action={{
          href: "/admin/availability",
          label: "زمان‌های آزاد و تعطیلی‌ها",
        }}
      />
      <CalendarBoard
        view={view}
        date={date}
        today={today}
        items={appointments.map((item) => ({
          id: item.id,
          startsAt: item.startsAt,
          endsAt: item.endsAt,
          status: item.status,
          name: nameFor(item.userId),
          service: serviceFor(item.serviceId),
        }))}
      />
      <section
        className={`admin-calendar-pending ${panelCardClassName} mt-[1.15rem]`}
        aria-labelledby="pending-title"
      >
        <div className={adminOverviewHeadingClassName}>
          <h2 id="pending-title" className={adminOverviewTitleClassName}>
            درخواست‌های در انتظار
          </h2>
          <span className={panelMutedClassName}>
            {formatNumber(pending.length)} مورد اخیر
          </span>
        </div>
        {pending.length ? (
          <div className="admin-calendar-pending-list grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[.55rem]">
            {pending.map((item) => (
              <Link
                key={item.id}
                className="grid gap-[.3rem] rounded-[12px] px-[.85rem] py-[.7rem] text-[.78rem] text-(--panel-text) [border:1px_solid_var(--panel-line)] hover:[background:var(--ar-brand-soft)]!"
                href={`/admin/calendar?view=day&date=${dayKey(item.startsAt)}`}
              >
                <span>
                  {nameFor(item.userId)} · {serviceFor(item.serviceId)}
                </span>
                <time
                  className="text-(--panel-muted)"
                  dateTime={item.startsAt.toISOString()}
                >
                  {formatDate(item.startsAt)} · {formatTime(item.startsAt)}
                </time>
              </Link>
            ))}
          </div>
        ) : (
          <p className={panelMutedClassName}>درخواستی در انتظار تأیید نیست.</p>
        )}
      </section>
      <section
        className="admin-calendar-appointment-list mt-[1.15rem]"
        aria-labelledby="calendar-list-title"
      >
        <h2
          id="calendar-list-title"
          className="mb-[.7rem] text-[1.1rem] font-extrabold"
        >
          نوبت‌های این{" "}
          {view === "day" ? "روز" : view === "week" ? "هفته" : "ماه"} (
          {formatNumber(appointments.length)})
        </h2>
        {appointments.length ? (
          <div className={panelListClassName}>
            {appointments.map((item) => (
              <article
                className={`${panelCardClassName} ${panelListItemClassName}`}
                key={item.id}
              >
                <div>
                  <h3 className="font-extrabold">
                    {formatDate(item.startsAt)} · {formatTime(item.startsAt)}
                  </h3>
                  <p>
                    {nameFor(item.userId)} · {serviceFor(item.serviceId)}
                  </p>
                  <p
                    className={`${adminOverviewStatusClassName} status-${item.status} m-[.45rem_0_0] inline-block`}
                  >
                    {appointmentLabels[item.status]}
                  </p>
                </div>
                {["pending", "confirmed"].includes(item.status) && (
                  <form
                    className={`${panelInlineFormClassName} gap-[.65rem]!`}
                    action={setAppointmentStatus}
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <PanelSelect
                      name="status"
                      defaultValue={item.status}
                      label={`وضعیت نوبت ${nameFor(item.userId)}`}
                      options={[
                        { value: "pending", label: "در انتظار" },
                        { value: "confirmed", label: "تأیید" },
                        { value: "completed", label: "انجام‌شده" },
                        { value: "cancelled", label: "لغو" },
                        { value: "no_show", label: "عدم حضور" },
                      ]}
                    />
                    <button
                      type="submit"
                      className={`${panelButtonClassName} ${panelButtonOutlineClassName}`}
                    >
                      ذخیره وضعیت
                    </button>
                  </form>
                )}
              </article>
            ))}
          </div>
        ) : (
          <PanelEmpty message="در این بازه نوبتی ثبت نشده است." />
        )}
      </section>
    </>
  );
}
