import { adminGlassClassName } from "@/components/panels/panel-layout-classes";
import { PanelSelect } from "@/components/panels/panel-select";
import { Checkbox } from "@/components/ui/checkbox";
import { timeOptions } from "@/lib/time-options";
import {
  adminSettings,
  adminAvailability,
  adminServices,
} from "@/features/admin/queries";
import {
  saveAdminReferenceSettings,
  revokeOtherAdminSessions,
} from "@/actions/admin-settings";
import { requireAdmin } from "@/lib/session";
import { PanelEmpty } from "@/components/panels/ui";
import { PasswordChangeForm } from "@/features/dashboard/ui/password-change-form";
import type { AdminHoursRow, AdminSettingField } from "@/types/admin-settings";

// Static settings layout, palette aliases and focus policy stay on the server-rendered markup.
// Interactive and third-party state styling outside this scoped component is unchanged.
const settingsPaletteClassName =
  "[--brand:var(--panel-accent)] [--brand-soft:var(--ar-brand-soft)] [--brand-ink:var(--ar-brand-ink)] [--border:var(--panel-line)] [--border-strong:var(--ar-border-strong)] [--text:var(--panel-text)] [--text-2:var(--ar-text2)] [--muted:var(--panel-muted)] [--surface-solid:var(--panel-surface)] [--danger:var(--ar-danger)] [--danger-soft:var(--ar-danger-soft)] [--radius-sm:14px] [--ring:0_0_0_3px_var(--ar-brand-soft)]";
const inputClassName =
  "input w-full min-h-11 rounded-[var(--radius-sm)] [border:1px_solid_var(--border-strong)] bg-[var(--surface-solid)] px-[.8rem] py-[.55rem] [font-family:inherit] text-base leading-[1.7] text-[var(--text)] outline-none hover:[border-color:var(--brand)] focus:[border-color:var(--brand)] focus:[box-shadow:var(--ring)] read-only:bg-[var(--ar-surface2)] read-only:cursor-not-allowed";
const textareaClassName = `${inputClassName} min-h-[108px]! resize-y`;
const buttonClassName =
  "btn inline-flex min-h-11 items-center justify-center gap-[.45rem] rounded-[var(--radius-sm)] [border:1px_solid_transparent] px-[1.05rem] py-0 [font-family:inherit] text-[.9rem] font-bold cursor-pointer";
const fieldClass = "field flex min-w-0 flex-col gap-[.35rem]";
const labelClass =
  "label inline-flex items-center gap-1 text-[.84rem] font-semibold text-[var(--text-2)]";
const requiredClass = "req font-bold text-[var(--danger)]";
const hintClass = "hint m-0 text-[.75rem] text-[var(--muted)]";
const feedbackClassName =
  "admin-ref-feedback [margin:.5rem_0_1rem] rounded-[14px] [border:1px_solid_#0f7a58] [background:rgba(15,122,88,.12)] px-4 py-3";
const feedbackErrorClassName = `${feedbackClassName} error [border-color:var(--ar-danger)]! [background:var(--ar-danger-soft)]!`;
const checkboxInputClassName =
  "[&_input[type=checkbox]]:m-0 [&_input[type=checkbox]]:size-5 [&_input[type=checkbox]]:flex-none [&_input[type=checkbox]]:accent-[var(--brand)]";
const checkClass = `check ${checkboxInputClassName} has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-70 flex min-h-11 cursor-pointer items-center gap-[.6rem] rounded-[var(--radius-sm)] [border:1px_solid_var(--border)] bg-[var(--surface-solid)] px-3 py-[.45rem] text-[.88rem] text-[var(--text-2)]`;
const rowClass =
  "rowline grid grid-cols-[minmax(0,1fr)] gap-[.6rem] rounded-[var(--radius-sm)] [border:1px_solid_var(--border)] bg-[var(--surface-solid)] p-3 min-[560px]:items-center";

export const metadata = { title: "تنظیمات سایت" };
const weekdays = [
  { key: "sat", day: "شنبه" },
  { key: "sun", day: "یکشنبه" },
  { key: "mon", day: "دوشنبه" },
  { key: "tue", day: "سه‌شنبه" },
  { key: "wed", day: "چهارشنبه" },
  { key: "thu", day: "پنجشنبه" },
  { key: "fri", day: "جمعه" },
] as const;
function Icon({ name }: { name: string }) {
  return <i className={`ph-duotone ph-${name}`} aria-hidden="true" />;
}
function Card({
  id,
  title,
  icon,
  intro,
  children,
}: {
  id: string;
  title: string;
  icon: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`glass card ${adminGlassClassName} min-w-0 p-4 sm:px-[1.375rem] sm:py-5`}
      aria-labelledby={id}
    >
      <div className="card-head mb-4 flex items-start gap-3 pb-3.5 [border-bottom:1px_solid_var(--border)]">
        <span
          className="card-ico grid size-[42px] flex-none place-items-center rounded-[14px] bg-[var(--brand-soft)] text-[1.25rem] text-[var(--brand-ink)]"
          aria-hidden="true"
        >
          <Icon name={icon} />
        </span>
        <div className="card-head-txt min-w-0">
          <h2 id={id} className="m-0 text-[1.02rem] leading-[1.6] font-bold">
            {title}
          </h2>
          <p className="mt-[.15rem] mb-0 text-[.82rem] leading-[1.7] text-[var(--muted)]">
            {intro}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}
function Field({ field }: { field: AdminSettingField }) {
  return (
    <div className={field.span ? "fieldsm:col-span-2" : fieldClass}>
      <label className={labelClass} htmlFor={field.id}>
        {field.label}
        {field.required && (
          <span className={requiredClass} aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        className={inputClassName}
        id={field.id}
        name={field.id}
        type={field.type ?? "text"}
        dir={
          field.type === "email" || field.type === "tel" || field.type === "url"
            ? "ltr"
            : undefined
        }
        inputMode={field.type === "tel" ? "numeric" : undefined}
        autoComplete={
          field.id === "contactPhone"
            ? "tel"
            : field.id === "contactEmail"
              ? "email"
              : undefined
        }
        defaultValue={field.value}
        required={field.required}
        maxLength={field.type === "url" ? 300 : undefined}
      />
      {field.hint && <p className={hintClass}>{field.hint}</p>}
    </div>
  );
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string; revoked?: string }>;
}) {
  const [settings, availability, services, session, params] = await Promise.all(
    [
      adminSettings(),
      adminAvailability(),
      adminServices(),
      requireAdmin(),
      searchParams,
    ],
  );
  if (!settings)
    return <PanelEmpty message="تنظیمات اولیه هنوز درج نشده است." />;
  const hours: AdminHoursRow[] = weekdays.map(({ key, day }) => {
    const row = availability.find((item) => item.key === key);
    return {
      key,
      day,
      on: Boolean(row?.slots.length),
      from: row?.start || "10:00",
      to: row?.end || "14:00",
    };
  });
  const contactFields: AdminSettingField[] = [
    {
      id: "contactPhone",
      label: "شماره موبایل مطب",
      type: "tel",
      value: settings.contact.phone,
      required: true,
      hint: "قالب درست: ۱۱ رقم و شروع با ۰۹",
    },
    {
      id: "contactEmail",
      label: "ایمیل",
      type: "email",
      value: settings.contact.email,
      required: true,
    },
    {
      id: "contactAddress",
      label: "نشانی مطب",
      value: settings.contact.address,
      span: true,
    },
    {
      id: "instagram",
      label: "اینستاگرام",
      type: "url",
      value: settings.contact.instagram,
    },
    {
      id: "telegram",
      label: "تلگرام",
      type: "url",
      value: settings.contact.telegram,
    },
    {
      id: "whatsapp",
      label: "واتساپ",
      type: "url",
      value: settings.contact.whatsapp,
      span: true,
    },
  ];
  const assetFields: AdminSettingField[] = [
    {
      id: "assetLogo",
      label: "لوگو",
      value: settings.images.logo ?? "",
      span: false,
    },
    {
      id: "assetFavicon",
      label: "فاوآیکون",
      value: settings.images.favicon ?? "",
    },
    {
      id: "assetHero",
      label: "تصویر سربرگ صفحه اصلی",
      value: settings.images.hero ?? "",
    },
    {
      id: "assetAbout",
      label: "تصویر بخش درباره من",
      value: settings.images.portrait ?? "",
    },
    {
      id: "assetOg",
      label: "تصویر اشتراک‌گذاری در شبکه‌های اجتماعی",
      value: settings.images.og ?? "",
      span: true,
    },
  ];
  return (
    <div
      className={`admin-settings-reference ${settingsPaletteClassName} [&_.btn:active]:[transform:translateY(1px)]! [&_:where(button,a):focus-visible]:[outline:2px_solid_var(--brand)]! [&_:where(button,input,textarea,a):focus-visible]:outline-offset-2! [&_:where(input,textarea):focus-visible]:[outline:2px_solid_var(--brand)]`}
    >
      <div className="page-head mb-4 px-1 pt-1 pb-0">
        <p className="eyebrow mb-[.4rem] inline-flex items-center gap-[.4rem] rounded-[999px] bg-[var(--brand-soft)] px-[.7rem] py-1 text-[.75rem] font-semibold text-[var(--brand-ink)]">
          <Icon name="gear-six" /> پیکربندی
        </p>
        <h1 className="m-0 text-2xl leading-normal font-bold sm:text-[1.75rem]">
          تنظیمات سایت
        </h1>
        <p className="lead mt-[.4rem] mr-0 mb-0 ml-0 max-w-[62ch] text-[.9rem] text-[var(--text-2)]">
          پروفایل حرفه‌ای، ساعات کاری، تعرفه جلسه‌ها، اطلاعات تماس و تنظیمات
          امنیتی را از این صفحه مدیریت کنید. فیلدهای نشان‌دار با{" "}
          <span className={requiredClass} aria-hidden="true">
            *
          </span>{" "}
          الزامی هستند.
        </p>
      </div>
      {params.saved === "1" && (
        <p className={feedbackClassName} role="status">
          تغییرات با موفقیت ذخیره شدند.
        </p>
      )}
      {params.error === "invalid" && (
        <p className={feedbackErrorClassName} role="alert">
          اطلاعات واردشده معتبر نیست. فیلدها، ساعت‌ها و نشانی تصاویر را بررسی
          کنید.
        </p>
      )}
      {params.error === "save" && (
        <p className={feedbackErrorClassName} role="alert">
          ذخیره انجام نشد؛ داده‌های پیشین حفظ شده‌اند. دوباره تلاش کنید.
        </p>
      )}
      {params.revoked === "1" && (
        <p className={feedbackClassName} role="status">
          نشست‌های دستگاه‌های دیگر بسته شدند.
        </p>
      )}
      <form
        className="form flex flex-col gap-4"
        action={saveAdminReferenceSettings}
      >
        <Card
          id="sec-profile"
          icon="user-circle"
          title="پروفایل سایت"
          intro="نام، عنوان شغلی و معرفی کوتاه شما در صفحه اصلی و نتایج جست‌وجو"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              field={{
                id: "profileName",
                label: "نام و نام خانوادگی",
                value: settings.profile.name,
                required: true,
              }}
            />
            <Field
              field={{
                id: "profileTitle",
                label: "عنوان شغلی",
                value: settings.profile.title,
                required: true,
              }}
            />
            <div className={`${fieldClass} sm:col-span-2`}>
              <label className={labelClass} htmlFor="profileBio">
                معرفی کوتاه{" "}
                <span className={requiredClass} aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                className={textareaClassName}
                id="profileBio"
                name="profileBio"
                rows={4}
                maxLength={320}
                defaultValue={settings.profile.bio}
                required
              />
              <p className={hintClass}>حداکثر ۳۲۰ نویسه</p>
            </div>
          </div>
        </Card>
        <Card
          id="sec-hours"
          icon="clock"
          title="ساعات کاری"
          intro="روزهای فعال هفته و بازه پذیرش نوبت را مشخص کنید"
        >
          <div className="grid gap-3" id="hoursList">
            {hours.map((item) => (
              <div
                className={`${rowClass} min-[560px]:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]`}
                key={item.key}
              >
                <label
                  className={`day-check ${checkboxInputClassName} flex min-h-11 cursor-pointer items-center gap-[.55rem] text-[.88rem] font-semibold`}
                  htmlFor={`hourOn-${item.key}`}
                >
                  <Checkbox
                    className="mt-[.12rem]"
                    value="on"
                    id={`hourOn-${item.key}`}
                    name={`hourOn-${item.key}`}
                    defaultChecked={item.on}
                  />
                  <span>{item.day}</span>
                </label>
                <div className="rowline-times grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[.4rem]">
                  <PanelSelect
                    id={`hourFrom-${item.key}`}
                    name={`hourFrom-${item.key}`}
                    label={`ساعت شروع ${item.day}`}
                    defaultValue={item.from}
                    options={timeOptions(item.from)}
                    required
                  />
                  <span
                    className="sep text-[.75rem] text-[var(--muted)]"
                    aria-hidden="true"
                  >
                    تا
                  </span>
                  <PanelSelect
                    id={`hourTo-${item.key}`}
                    name={`hourTo-${item.key}`}
                    label={`ساعت پایان ${item.day}`}
                    defaultValue={item.to}
                    options={timeOptions(item.to)}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card
          id="sec-sessions"
          icon="receipt"
          title="قالب‌های جلسه و تعرفه‌ها"
          intro="عنوان، مدت و هزینه هر قالب جلسه بر حسب تومان"
        >
          <div className="grid gap-3" id="sessionsList">
            {services.map((item) => (
              <div
                className={`${rowClass} rowline--session min-[560px]:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)_minmax(0,1fr)]`}
                key={item.slug}
              >
                <div className={fieldClass}>
                  <label
                    className={labelClass}
                    htmlFor={`sessionName-${item.slug}`}
                  >
                    عنوان جلسه
                  </label>
                  <input
                    className={inputClassName}
                    id={`sessionName-${item.slug}`}
                    name={`sessionName-${item.slug}`}
                    type="text"
                    defaultValue={item.name}
                    required
                  />
                </div>
                <div className={fieldClass}>
                  <label
                    className={labelClass}
                    htmlFor={`sessionMin-${item.slug}`}
                  >
                    مدت (دقیقه)
                  </label>
                  <input
                    className={inputClassName}
                    id={`sessionMin-${item.slug}`}
                    name={`sessionMin-${item.slug}`}
                    type="number"
                    inputMode="numeric"
                    min={15}
                    max={240}
                    step={1}
                    defaultValue={item.duration}
                    required
                  />
                </div>
                <div className={fieldClass}>
                  <label
                    className={labelClass}
                    htmlFor={`sessionFee-${item.slug}`}
                  >
                    تعرفه (تومان)
                  </label>
                  <input
                    className={inputClassName}
                    id={`sessionFee-${item.slug}`}
                    name={`sessionFee-${item.slug}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100000000}
                    defaultValue={item.price}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card
          id="sec-contact"
          icon="address-book"
          title="اطلاعات تماس و شبکه‌های اجتماعی"
          intro="راه‌های ارتباطی نمایش‌داده‌شده در فوتر و صفحه تماس"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {contactFields.map((field) => (
              <Field key={field.id} field={field} />
            ))}
          </div>
        </Card>
        <Card
          id="sec-policy"
          icon="scroll"
          title="سیاست لغو نوبت"
          intro="متنی که پیش از تأیید نوبت به مراجع نمایش داده می‌شود"
        >
          <div className={fieldClass}>
            <label className={labelClass} htmlFor="policy">
              متن سیاست لغو{" "}
              <span className={requiredClass} aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              className={textareaClassName}
              id="policy"
              name="policy"
              rows={5}
              maxLength={900}
              defaultValue={settings.cancellation}
              required
            />
            <p className={hintClass}>حداکثر ۹۰۰ نویسه</p>
          </div>
        </Card>
        <Card
          id="sec-assets"
          icon="image-square"
          title="دارایی‌های برند"
          intro="مسیر تصاویر لوگو، فاوآیکون و تصاویر صفحه‌ها"
        >
          <div className="meta-box mb-4 flex items-start gap-2 rounded-[14px] bg-[var(--brand-soft)] p-[.7rem] text-[.82rem]">
            <Icon name="info" />
            <span>
              تصاویر باید در مسیر /assets/images یا /assets/logo موجود باشند؛
              برای تصویر پیش‌فرض، مسیر را خالی بگذارید.
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {assetFields.map((field) => (
              <Field key={field.id} field={field} />
            ))}
          </div>
        </Card>
        <Card
          id="sec-notify"
          icon="bell-ringing"
          title="ترجیحات اعلان"
          intro="انتخاب کنید کدام رویدادها برای شما اطلاع‌رسانی شود"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className={checkClass} htmlFor="notify-email">
              <Checkbox
                className="mt-[.12rem]"
                id="notify-email"
                value="on"
                name="notifyEmail"
                defaultChecked={settings.notifications.email}
              />
              <span>اعلان رزرو نوبت جدید با ایمیل</span>
            </label>
            <label className={checkClass} htmlFor="notify-sms">
              <Checkbox
                className="mt-[.12rem]"
                id="notify-sms"
                disabled
                aria-label="اعلان پیامکی غیرفعال"
              />
              <span>اعلان رزرو نوبت جدید با پیامک (غیرفعال)</span>
            </label>
            <label className={checkClass} htmlFor="notify-reminder">
              <Checkbox
                className="mt-[.12rem]"
                id="notify-reminder"
                value="on"
                name="notifyReminder"
                defaultChecked={settings.notifications.reminder}
              />
              <span>یادآوری نوبت ۲۴ ساعت پیش از جلسه</span>
            </label>
            <label className={checkClass} htmlFor="notify-weekly">
              <Checkbox
                className="mt-[.12rem]"
                id="notify-weekly"
                value="on"
                name="notifyWeekly"
                defaultChecked={settings.notifications.weekly}
              />
              <span>گزارش هفتگی وضعیت نوبت‌ها</span>
            </label>
          </div>
          <p className={hintClass}>
            ترجیحات ذخیره می‌شوند؛ سرویس ارسال اعلان هنوز پیکربندی نشده است.
          </p>
        </Card>
        <Card
          id="sec-security"
          icon="shield-check"
          title="امنیت حساب"
          intro="شماره موبایل ورود و نشست‌های فعال روی دستگاه‌های دیگر"
        >
          <div className="grid gap-4">
            <div className={fieldClass}>
              <label className={labelClass} htmlFor="accountPhone">
                شماره موبایل ورود به پنل
              </label>
              <input
                className={inputClassName}
                id="accountPhone"
                type="tel"
                dir="ltr"
                value={session.user.username ?? ""}
                readOnly
                aria-describedby="accountPhoneHint"
              />
              <p className={hintClass} id="accountPhoneHint">
                ورود با رمز عبور انجام می‌شود. شناسهٔ حساب در این فرم
                قابل‌ویرایش نیست.
              </p>
            </div>
            <hr className="divider w-full [border-top:1px_solid_var(--border)]! [border:0]" />
            <div className="flex flex-wrap items-center gap-3">
              <button
                className={`${buttonClassName} btn-danger bg-[var(--danger-soft)] text-[var(--danger)]`}
                type="submit"
                formAction={revokeOtherAdminSessions}
              >
                <Icon name="devices" />
                خروج از دستگاه‌های دیگر
              </button>
              <a
                href="#admin-password-section"
                className={`${buttonClassName} btn-soft`}
              >
                تغییر رمز عبور
              </a>
            </div>
          </div>
        </Card>
        <div
          className="savebar sticky bottom-[calc(8rem+env(safe-area-inset-bottom,0px))] z-[35] mt-2 lg:bottom-4"
          role="region"
          aria-label="نوار ذخیره تغییرات"
        >
          <div
            className={`savebar-inner glass ${adminGlassClassName} flex flex-wrap items-center gap-[.6rem] rounded-[18px]! px-3 py-[.6rem] max-[390.02px]:items-stretch`}
          >
            <p className="savebar-note m-0 inline-flex items-center gap-[.4rem] text-[.8rem] text-[var(--muted)] max-[390.02px]:w-full">
              <Icon name="floppy-disk" />
              <span>تغییرات را برای اعمال ذخیره کنید</span>
            </p>
            <div className="savebar-actions ms-auto flex gap-2 max-[390.02px]:w-full max-[390.02px]:[&_.btn]:flex-1 max-[390.02px]:[&_.btn]:px-[.3rem]!">
              <button
                className={`${buttonClassName} btn-ghost [border-color:var(--border-strong)]! bg-[var(--surface-solid)] text-[var(--text-2)]`}
                type="reset"
              >
                <Icon name="arrow-counter-clockwise" />
                بازنشانی
              </button>
              <button
                className={`${buttonClassName} btn-primary text-white [background:linear-gradient(110deg,#117f82,#4173a8)] dark:text-[#13262d] dark:[background:linear-gradient(110deg,#78d5c7,#a2c1ee)]`}
                type="submit"
              >
                <Icon name="floppy-disk" />
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
      </form>
      <div
        id="admin-password-section"
        className="mt-6 max-w-[640px] scroll-mt-28"
      >
        <PasswordChangeForm />
      </div>
    </div>
  );
}
