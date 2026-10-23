import {
  panelCardClassName,
  panelGridClassName,
  panelStackClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
import { requireUser } from "@/lib/session";
import { listMyEnrollments } from "@/features/dashboard/queries";
import { listWorkshops } from "@/features/workshops/queries";
import { PanelHeading, PanelEmpty } from "@/components/panels/ui";
import { MeetInviteNotice } from "@/components/shared/meet-invite-notice";
import { formatDate } from "@/lib/format";
export const metadata = { title: "کارگاه‌های من" };
export default async function Page() {
  const { user } = await requireUser();
  const [enrollments, workshops] = await Promise.all([
    listMyEnrollments(user.id),
    listWorkshops(),
  ]);
  return (
    <>
      <PanelHeading
        title="کارگاه‌های من"
        description="فقط ثبت‌نام‌های مربوط به همین حساب نمایش داده می‌شوند."
        action={{ href: "/workshops", label: "مشاهده کارگاه‌ها" }}
      />
      {enrollments.some(
        (item) =>
          item.status === "active" &&
          workshops.some(
            (workshop) =>
              workshop.slug === item.workshopId && workshop.mode === "online",
          ),
      ) && <MeetInviteNotice />}
      {enrollments.length ? (
        <div className={panelGridClassName}>
          {enrollments.map((item) => (
            <article
              className={`${panelCardClassName} ${panelStackClassName}`}
              key={item.id}
            >
              <h2>
                {workshops.find((workshop) => workshop.slug === item.workshopId)
                  ?.title || "کارگاه"}
              </h2>
              <p>
                {item.status === "active"
                  ? "فعال"
                  : item.status === "pending"
                    ? "در انتظار بررسی"
                    : "لغوشده"}
              </p>
              <time
                className={panelMutedClassName}
                dateTime={item.createdAt.toISOString()}
              >
                {formatDate(item.createdAt)}
              </time>
            </article>
          ))}
        </div>
      ) : (
        <PanelEmpty
          message="هنوز کارگاهی در این حساب ثبت‌نام نشده است."
          href="/workshops"
          label="مشاهده کارگاه‌ها"
        />
      )}
    </>
  );
}
