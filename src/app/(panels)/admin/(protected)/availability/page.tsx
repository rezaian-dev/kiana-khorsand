import {
  adminOverviewHeadingClassName,
  adminOverviewTitleClassName,
  panelFormClassName,
  panelCardClassName,
  panelGridClassName,
  panelButtonClassName,
  panelButtonOutlineClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
import { adminAvailability } from "@/features/admin/queries";
import { saveAvailability, removeBlockedRange } from "@/actions/admin";
import { SlotPicker } from "@/features/admin/ui/slot-picker";
import { BlockedRangeForm } from "@/features/admin/ui/blocked-range-form";
import { PanelHeading } from "@/components/panels/panel-heading";
import { dayKey } from "@/lib/tehran-calendar";
import { formatDate } from "@/lib/format";
const days = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];
export const metadata = { title: "زمان‌های آزاد" };
export default async function Page() {
  const rows = await adminAvailability();
  const weekly = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"].map(
    (key) =>
      rows.find((row) => row.key === key) ?? {
        key,
        weekday: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(key),
        slots: [] as string[],
        blocks: [] as (typeof rows)[number]["blocks"],
        start: "09:00",
        end: "17:00",
      },
  );
  const blocks = [
    ...new Map(
      rows
        .flatMap((row) => row.blocks)
        .filter((block) => block.id)
        .map((block) => [block.id!, block]),
    ).values(),
  ].sort((a, b) => b.from.getTime() - a.from.getTime());
  return (
    <>
      <PanelHeading
        title="مدیریت زمان‌های رزرو"
        description="ساعت‌های هر روز را از گزینه‌های آماده انتخاب کنید؛ بدون تایپ زمان. برای تعطیل‌کردن روز، هیچ ساعتی انتخاب نکنید."
      />
      <div
        className={`${panelGridClassName} admin-availability-grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]! items-stretch`}
      >
        {weekly.map((item) => (
          <form
            key={item.key}
            action={saveAvailability}
            className={`${panelCardClassName} ${panelFormClassName} grid-rows-[auto_auto_minmax(100px,1fr)_auto_auto] gap-4!`}
          >
            <h2>{days[item.weekday]}</h2>
            <input type="hidden" name="key" value={item.key} />
            <SlotPicker id={`slots-${item.key}`} initial={item.slots} />
            <p className={panelMutedClassName}>
              {item.blocks.length} بازهٔ مسدودشده · از {item.start} تا{" "}
              {item.end}
            </p>
            <button type="submit" className={panelButtonClassName}>
              ذخیره زمان‌ها
            </button>
          </form>
        ))}
      </div>
      <section
        id="closures"
        className={`${panelCardClassName} admin-block-section mt-5 scroll-mt-28`}
        aria-labelledby="closures-heading"
      >
        <div className={adminOverviewHeadingClassName}>
          <div>
            <h2
              id="closures-heading"
              className={`${adminOverviewTitleClassName} m-0!`}
            >
              بستن موقت روزها
            </h2>
            <p className={panelMutedClassName}>
              تعطیلات و عدم حضور را بدون حذف برنامهٔ هفتگی ثبت کن.
            </p>
          </div>
        </div>
        <BlockedRangeForm today={dayKey(new Date())} />
        <h3 className="admin-block-subtitle mt-[1.6rem] mb-[.6rem] pt-4 font-extrabold [border-top:1px_solid_var(--panel-line)]">
          بازه‌های بستهٔ ثبت‌شده
        </h3>
        {blocks.length ? (
          <div className="admin-block-list grid gap-[.55rem]">
            {blocks.map((block) => (
              <div
                key={block.id}
                className="admin-block-row flex flex-wrap items-center justify-between gap-4 rounded-[14px] p-[.75rem_1rem] [background:var(--ar-surface2)] [border:1px_solid_var(--panel-line)]"
              >
                <div>
                  <strong className="text-[.84rem]">
                    {formatDate(block.from)} تا{" "}
                    {formatDate(new Date(block.to.getTime() - 1))}
                  </strong>
                  <p className="text-[.78rem] text-(--panel-muted)">
                    {block.reason}
                  </p>
                </div>
                <form action={removeBlockedRange}>
                  <input type="hidden" name="id" value={block.id} />
                  <button
                    type="submit"
                    className={`${panelButtonClassName} ${panelButtonOutlineClassName}`}
                  >
                    بازکردن بازه
                  </button>
                </form>
              </div>
            ))}
          </div>
        ) : (
          <p className={panelMutedClassName}>
            بازه‌ای برای تعطیلی موقت ثبت نشده است.
          </p>
        )}
      </section>
    </>
  );
}
