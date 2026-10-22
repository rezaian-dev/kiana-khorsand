import {
  panelAdminFormClassName,
  panelListItemClassName,
  panelCardClassName,
  panelButtonClassName,
  panelButtonOutlineClassName,
} from "@/components/panels/panel-layout-classes";
import { setTestimonialExperience } from "@/actions/admin";
import { testimonialExperience } from "@/lib/testimonial-experience";
import { adminTestimonials } from "@/features/admin/queries";
import { AdminStatus } from "@/components/panels/admin-status";
import { FilterableList } from "@/components/panels/filterable-list";
import { PanelHeading, PanelEmpty } from "@/components/panels/ui";
export const metadata = { title: "نظرها" };
export default async function Page() {
  const rows = await adminTestimonials();
  return (
    <>
      <PanelHeading
        title="مدیریت تجربه‌ها"
        description="فقط با رضایت صریح صاحب نظر، متن و تصویر او را منتشر کنید. وضعیت انتشار و متن‌ها را جست‌وجو کنید."
      />
      {rows.length ? (
        <FilterableList
          label="جست‌وجو در نظرها"
          options={[
            { value: "published", label: "منتشرشده" },
            { value: "draft", label: "پیش‌نویس" },
            { value: "hidden", label: "پنهان" },
          ]}
          items={rows.map((item) => ({
            key: item.slug,
            status: item.status,
            search: `${item.name} ${item.quote} ${testimonialExperience(item)}`,
            content: (
              <article
                className={`${panelCardClassName} ${panelListItemClassName}`}
              >
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.quote}</p>
                  <form
                    action={setTestimonialExperience}
                    className={`${panelAdminFormClassName} mt-4`}
                  >
                    <input type="hidden" name="slug" value={item.slug} />
                    <label htmlFor={`experience-${item.slug}`}>
                      خدمت یا کارگاهِ مربوط به این تجربه
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        id={`experience-${item.slug}`}
                        name="experience"
                        defaultValue={testimonialExperience(item)}
                        minLength={2}
                        maxLength={120}
                        required
                        className="min-w-[180px] flex-1"
                      />
                      <button
                        type="submit"
                        className={`${panelButtonClassName} ${panelButtonOutlineClassName}`}
                      >
                        ذخیرهٔ عنوان
                      </button>
                    </div>
                  </form>
                </div>
                <AdminStatus
                  kind="testimonials"
                  slug={item.slug}
                  value={item.status}
                />
              </article>
            ),
          }))}
        />
      ) : (
        <PanelEmpty message="نظری ثبت نشده است." />
      )}
    </>
  );
}
