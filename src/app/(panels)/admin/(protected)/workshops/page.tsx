import {
  panelAdminFormClassName,
  panelListItemClassName,
  panelCardClassName,
  adminCreatePanelClassName,
  adminCreatePanelSummaryClassName,
  panelStackClassName,
  panelButtonClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
import Link from "next/link";
import { pageNumber, searchText } from "@/lib/list-search";
import { WorkshopForm } from "@/features/admin/ui/workshop-form";
import { WorkshopDiscount } from "@/features/admin/ui/workshop-discount";
import { workshopPrice } from "@/features/workshops/pricing";
import { WorkshopSchedule } from "@/features/admin/ui/workshop-schedule";
import { WorkshopCommunityManager } from "@/features/admin/ui/workshop-community-manager";
import { workshopCommunityAdmin } from "@/features/workshops/reviews";
import { PanelSelect } from "@/components/panels/panel-select";
import { adminWorkshops } from "@/features/admin/queries";
import { AdminStatus } from "@/components/panels/admin-status";
import { SiteToaster } from "@/components/shared/site-toaster";
import { FilterableList } from "@/components/panels/filterable-list";
import { PanelHeading, PanelEmpty } from "@/components/panels/panel-heading";
import { formatToman, formatNumber } from "@/lib/format";

/** One workshop in the admin list. */
const workshopRowClassName =
  "rounded-[12px] border border-(--panel-line,var(--line)) px-4 py-2 text-(--panel-text,var(--fg)) hover:bg-[color-mix(in_srgb,var(--panel-accent)_10%,var(--panel-surface))]";

export const metadata = { title: "کارگاه‌ها" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; q?: string | string[] }>;
}) {
  const params = await searchParams;
  const q = searchText(params.q, 80);
  const { workshops, page, pages, total } = await adminWorkshops(
    pageNumber(params.page),
    q,
  );
  const community = await workshopCommunityAdmin(
    workshops.map((item) => item.slug),
  );
  const pageHref = (number: number) => {
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (number > 1) query.set("page", String(number));
    return `/admin/workshops${query.size ? `?${query}` : ""}`;
  };
  return (
    <>
      <SiteToaster />
      <PanelHeading
        title="کارگاه‌ها"
        description="شرح، زمان‌بندی، ثبت‌نام و حضور، و نظرهای هر کارگاه را مدیریت کنید."
      />
      <details className={`${panelCardClassName} ${adminCreatePanelClassName}`}>
        <summary className={adminCreatePanelSummaryClassName}>
          افزودن کارگاه تازه
        </summary>
        <WorkshopForm className={`${panelAdminFormClassName} mt-5`}>
          <input type="hidden" name="intent" value="create" />
          <p className="panel-help">
            کارگاه جدید ابتدا به‌صورت پیش‌نویس ذخیره می‌شود. شناسهٔ یکتا را با
            حروف انگلیسی، رقم و خط تیره وارد کنید.
          </p>
          <label htmlFor="new-workshop-slug">شناسهٔ یکتا</label>
          <input
            id="new-workshop-slug"
            name="slug"
            required
            pattern="[a-z0-9-]{1,80}"
          />
          <label htmlFor="new-workshop-title">عنوان</label>
          <input
            id="new-workshop-title"
            name="title"
            minLength={3}
            maxLength={150}
            required
          />
          <label htmlFor="new-workshop-description">معرفی کوتاه</label>
          <textarea
            id="new-workshop-description"
            name="description"
            minLength={10}
            maxLength={500}
            required
          />
          <label htmlFor="new-workshop-body">شرح کامل</label>
          <textarea
            id="new-workshop-body"
            name="body"
            minLength={20}
            maxLength={50000}
            required
          />
          <label htmlFor="new-workshop-mode">قالب</label>
          <PanelSelect
            id="new-workshop-mode"
            name="mode"
            defaultValue="online"
            options={[
              { value: "online", label: "آنلاین" },
              { value: "in_person", label: "حضوری" },
            ]}
          />
          <label htmlFor="new-workshop-price">قیمت (تومان)</label>
          <input
            id="new-workshop-price"
            name="price"
            type="number"
            min="0"
            max="100000000"
            required
          />
          <label htmlFor="new-workshop-capacity">ظرفیت</label>
          <input
            id="new-workshop-capacity"
            name="capacity"
            type="number"
            min="1"
            max="1000"
            required
          />
          <p className="panel-help">
            ظرفیت کارگاه آنلاین حداکثر ۲۰ شرکت‌کننده است؛ برگزارکننده یک جایگاه
            جدا دارد.
          </p>
          <WorkshopSchedule />
          <WorkshopDiscount />
          <button type="submit" className={panelButtonClassName}>
            ذخیرهٔ کارگاه
          </button>
        </WorkshopForm>
      </details>
      <form
        method="get"
        role="search"
        className={`${panelCardClassName} my-4 flex flex-wrap items-center gap-[.8rem] p-4!`}
      >
        <label htmlFor="admin-workshop-global-search">
          جست‌وجو در همهٔ کارگاه‌ها
        </label>
        <input
          id="admin-workshop-global-search"
          className="min-w-0 flex-[1_1_200px] rounded-[12px] border border-(--panel-line,var(--line)) bg-(--panel-surface,var(--surface)) px-[.85rem] py-[.7rem] text-(--panel-text,var(--fg))"
          type="search"
          name="q"
          defaultValue={q}
          placeholder="عنوان یا شناسهٔ کارگاه"
        />
        <button className={panelButtonClassName} type="submit">
          جست‌وجو
        </button>
        {q && (
          <Link
            href="/admin/workshops"
            className="text-(--panel-accent) underline underline-offset-[3px]"
          >
            نمایش همه
          </Link>
        )}
      </form>
      <p className={`${panelMutedClassName} mt-2 mb-4`}>
        {formatNumber(total)} کارگاه · صفحهٔ {formatNumber(page)} از{" "}
        {formatNumber(pages)}
      </p>
      {workshops.length ? (
        <FilterableList
          label="جست‌وجو در کارگاه‌های این صفحه"
          options={[
            { value: "published", label: "منتشرشده" },
            { value: "draft", label: "پیش‌نویس" },
            { value: "hidden", label: "پنهان" },
          ]}
          items={workshops.map((item) => ({
            key: item.slug,
            status: item.status,
            search: `${item.title} ${item.slug}`,
            content: (
              <article
                className={`${panelCardClassName} ${panelStackClassName}`}
                key={item.slug}
              >
                <div className={panelListItemClassName}>
                  <div>
                    <h2>{item.title}</h2>
                    <p>
                      {formatToman(workshopPrice(item).total)}
                      {workshopPrice(item).percent
                        ? ` (٪${workshopPrice(item).percent} تخفیف)`
                        : ""}{" "}
                      · {item.capacity || "بدون ظرفیت ثبت‌شده"}
                    </p>
                  </div>
                  <AdminStatus
                    kind="workshops"
                    slug={item.slug}
                    value={item.status}
                  />
                </div>

                <details>
                  <summary className={adminCreatePanelSummaryClassName}>
                    ویرایش کارگاه
                  </summary>
                  <WorkshopForm className={`${panelAdminFormClassName}`}>
                    <input type="hidden" name="intent" value="edit" />
                    <input type="hidden" name="slug" value={item.slug} />
                    <label htmlFor={`w-title-${item.slug}`}>عنوان</label>
                    <input
                      id={`w-title-${item.slug}`}
                      name="title"
                      defaultValue={item.title}
                      required
                    />
                    <label htmlFor={`w-desc-${item.slug}`}>معرفی کوتاه</label>
                    <textarea
                      id={`w-desc-${item.slug}`}
                      name="description"
                      defaultValue={item.description}
                      required
                    />
                    <label htmlFor={`w-body-${item.slug}`}>متن کارگاه</label>
                    <textarea
                      id={`w-body-${item.slug}`}
                      name="body"
                      defaultValue={item.body}
                      required
                    />
                    <label htmlFor={`w-mode-${item.slug}`}>قالب</label>
                    <PanelSelect
                      id={`w-mode-${item.slug}`}
                      name="mode"
                      defaultValue={item.mode}
                      options={[
                        { value: "online", label: "آنلاین" },
                        { value: "in_person", label: "حضوری" },
                      ]}
                    />
                    <label htmlFor={`w-price-${item.slug}`}>قیمت (تومان)</label>
                    <input
                      id={`w-price-${item.slug}`}
                      name="price"
                      type="number"
                      min="0"
                      defaultValue={item.price}
                      required
                    />
                    <label htmlFor={`w-cap-${item.slug}`}>ظرفیت</label>
                    <input
                      id={`w-cap-${item.slug}`}
                      name="capacity"
                      type="number"
                      min="1"
                      defaultValue={item.capacity || 1}
                      required
                    />
                    <p className="panel-help">
                      برای کارگاه آنلاین سقف ۲۰ شرکت‌کننده است.
                    </p>
                    <WorkshopSchedule
                      start={item.startsAt?.toISOString()}
                      end={item.endsAt?.toISOString()}
                    />
                    <WorkshopDiscount
                      value={
                        item.discount
                          ? {
                              percent: item.discount.percent,
                              startsAt: item.discount.startsAt.toISOString(),
                              endsAt: item.discount.endsAt.toISOString(),
                            }
                          : null
                      }
                    />
                    <button type="submit" className={panelButtonClassName}>
                      ذخیره کارگاه
                    </button>
                  </WorkshopForm>
                </details>
                <WorkshopCommunityManager
                  slug={item.slug}
                  ended={Boolean(item.endsAt && item.endsAt <= new Date())}
                  enrollments={community.enrollments.filter(
                    (enrollment) => enrollment.workshopId === item.slug,
                  )}
                  reviews={community.reviews.filter(
                    (review) => review.workshopId === item.slug,
                  )}
                />
              </article>
            ),
          }))}
        />
      ) : (
        <PanelEmpty
          message={
            q ? "کارگاهی با این جست‌وجو پیدا نشد." : "کارگاهی ثبت نشده است."
          }
        />
      )}
      {pages > 1 && (
        <nav
          className="flex flex-wrap items-center justify-center gap-4 py-[1.4rem]"
          aria-label="صفحه‌بندی مدیریت کارگاه‌ها"
        >
          {page > 1 && (
            <Link href={pageHref(page - 1)} className={workshopRowClassName}>
              صفحهٔ قبل
            </Link>
          )}
          <span>
            صفحهٔ {formatNumber(page)} از {formatNumber(pages)}
          </span>
          {page < pages && (
            <Link href={pageHref(page + 1)} className={workshopRowClassName}>
              صفحهٔ بعد
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
