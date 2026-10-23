import {
  panelAdminFormClassName,
  panelListItemClassName,
  panelCardClassName,
  adminCreatePanelClassName,
  adminCreatePanelSummaryClassName,
  panelStackClassName,
  panelButtonClassName,
} from "@/components/panels/panel-styles";
import { PanelSelect } from "@/components/panels/panel-select";
import { adminServices } from "@/features/admin/queries";
import { saveService } from "@/actions/admin";
import { AdminStatus } from "@/components/panels/admin-status";
import { FilterableList } from "@/components/panels/filterable-list";
import { PanelHeading, PanelEmpty } from "@/components/panels/ui";
import { formatToman } from "@/lib/format";
export const metadata = { title: "خدمات" };
export default async function Page() {
  const services = await adminServices();
  return (
    <>
      <PanelHeading
        title="خدمات"
        description="نام، مدت، قیمت و وضعیت خدمات از داده‌های فعلی سایت مدیریت می‌شوند."
      />
      <details className={`${panelCardClassName} ${adminCreatePanelClassName}`}>
        <summary className={adminCreatePanelSummaryClassName}>
          افزودن خدمت تازه
        </summary>
        <form
          action={saveService}
          className={`${panelAdminFormClassName} mt-5`}
        >
          <p className="panel-help">
            خدمت جدید ابتدا به‌صورت پیش‌نویس ذخیره می‌شود؛ پس از بازبینی آن را
            منتشر کنید. شناسهٔ یکتا را فقط با حروف انگلیسی، رقم و خط تیره وارد
            کنید.
          </p>
          <label htmlFor="new-service-slug">شناسهٔ یکتا</label>
          <input
            id="new-service-slug"
            name="slug"
            required
            pattern="[a-z0-9-]{1,80}"
            placeholder="individual-online"
          />
          <label htmlFor="new-service-name">نام خدمت</label>
          <input
            id="new-service-name"
            name="name"
            minLength={2}
            maxLength={120}
            required
          />
          <label htmlFor="new-service-duration">مدت (دقیقه)</label>
          <input
            id="new-service-duration"
            name="duration"
            type="number"
            min="10"
            max="240"
            required
          />
          <label htmlFor="new-service-price">قیمت (تومان)</label>
          <input
            id="new-service-price"
            name="price"
            type="number"
            min="0"
            max="100000000"
            required
          />
          <label htmlFor="new-service-mode">قالب</label>
          <PanelSelect
            id="new-service-mode"
            name="mode"
            defaultValue="online"
            options={[
              { value: "online", label: "آنلاین" },
              { value: "in_person", label: "حضوری" },
            ]}
          />
          <label htmlFor="new-service-features">ویژگی‌ها (هر مورد یک خط)</label>
          <textarea
            id="new-service-features"
            name="features"
            maxLength={2000}
          />
          <button type="submit" className={panelButtonClassName}>
            ذخیرهٔ خدمت
          </button>
        </form>
      </details>
      {services.length ? (
        <FilterableList
          label="جست‌وجو در خدمات"
          options={[
            { value: "published", label: "منتشرشده" },
            { value: "draft", label: "پیش‌نویس" },
            { value: "hidden", label: "پنهان" },
          ]}
          items={services.map((item) => ({
            key: item.slug,
            status: item.status,
            search: `${item.name} ${item.slug}`,
            content: (
              <article
                className={`${panelCardClassName} ${panelStackClassName}`}
                key={item.slug}
              >
                <div className={panelListItemClassName}>
                  <div>
                    <h2>{item.name}</h2>
                    <p>
                      {formatToman(item.price)} · {item.duration} دقیقه
                    </p>
                  </div>
                  <AdminStatus
                    kind="services"
                    slug={item.slug}
                    value={item.status}
                  />
                </div>
                <details>
                  <summary className={adminCreatePanelSummaryClassName}>
                    ویرایش جزئیات
                  </summary>
                  <form
                    action={saveService}
                    className={`${panelAdminFormClassName}`}
                  >
                    <input type="hidden" name="slug" value={item.slug} />
                    <label htmlFor={`name-${item.slug}`}>نام</label>
                    <input
                      id={`name-${item.slug}`}
                      name="name"
                      defaultValue={item.name}
                      required
                    />
                    <label htmlFor={`duration-${item.slug}`}>مدت (دقیقه)</label>
                    <input
                      id={`duration-${item.slug}`}
                      name="duration"
                      type="number"
                      min="10"
                      max="240"
                      defaultValue={item.duration}
                      required
                    />
                    <label htmlFor={`price-${item.slug}`}>قیمت (تومان)</label>
                    <input
                      id={`price-${item.slug}`}
                      name="price"
                      type="number"
                      min="0"
                      defaultValue={item.price}
                      required
                    />
                    <label htmlFor={`mode-${item.slug}`}>قالب</label>
                    <PanelSelect
                      id={`mode-${item.slug}`}
                      name="mode"
                      defaultValue={item.mode}
                      options={[
                        { value: "online", label: "آنلاین" },
                        { value: "in_person", label: "حضوری" },
                      ]}
                    />
                    <label htmlFor={`features-${item.slug}`}>
                      ویژگی‌ها (هر مورد یک خط)
                    </label>
                    <textarea
                      id={`features-${item.slug}`}
                      name="features"
                      defaultValue={item.features.join("\n")}
                    />
                    <button type="submit" className={panelButtonClassName}>
                      ذخیره جزئیات
                    </button>
                  </form>
                </details>
              </article>
            ),
          }))}
        />
      ) : (
        <PanelEmpty message="خدمتی ثبت نشده است." />
      )}
    </>
  );
}
