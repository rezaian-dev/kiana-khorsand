import {
  siteContainerClassName,
  siteDetailClassName,
} from "@/components/shared/public-layout-classes";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { getSession } from "@/lib/session";
import { listServices } from "@/features/services/queries";
import { getSlots } from "@/features/booking/queries";
import { BookingForm } from "@/features/booking/ui/booking-form";
import { SiteBreadcrumb } from "@/components/shared/site-breadcrumb";
import { labels } from "@/lib/labels";
import { formatNumber } from "@/lib/format";
import { publicMetadata } from "@/lib/public-metadata";

export const metadata = publicMetadata({
  title: labels.book,
  description:
    "درخواست زمان مشاوره را ثبت کنید؛ وضعیت نوبت پس از بررسی اعلام می‌شود.",
  path: "/book",
  image: "/assets/images/booking-atmosphere.jpg",
});
export default async function Page() {
  const [session, services, slots] = await Promise.all([
    getSession(),
    listServices(),
    getSlots(),
  ]);
  return (
    <>
      <section
        className="booking-hero relative isolate overflow-hidden bg-[radial-gradient(circle_at_8%_84%,rgb(181_216_205_/_28%),transparent_32%),radial-gradient(circle_at_84%_4%,rgb(190_179_218_/_24%),transparent_35%),linear-gradient(150deg,var(--site-canvas),color-mix(in_srgb,var(--site-surface)_75%,#eaf3ef))] py-[clamp(2.5rem,5vw,4.7rem)] [padding-bottom:clamp(2.7rem,5vw,4rem)] before:pointer-events-none before:absolute before:inset-0 before:-z-[1] before:bg-[repeating-radial-gradient(circle_at_105%_-15%,transparent_0_38px,rgb(48_120_125_/_6%)_39px_40px,transparent_41px_70px)] before:opacity-45 max-[480.02px]:pt-8 max-[480.02px]:pb-[2.3rem]"
        aria-labelledby="booking-title"
      >
        <div
          className={`${siteContainerClassName} booking-hero-inner grid grid-cols-[minmax(0,1fr)_minmax(0,0.93fr)] items-center gap-[clamp(2rem,6vw,6rem)] max-[760.02px]:grid-cols-1 max-[480.02px]:gap-6`}
        >
          <div className="booking-hero-copy min-w-0">
            <SiteBreadcrumb
              current={labels.book}
              className="mb-[1.8rem]! max-[480.02px]:mb-[1.2rem]!"
            />
            <p className="booking-hero-eyebrow inline-flex rounded-[999px] bg-[color:color-mix(in_srgb,#6b649f_11%,var(--site-surface))] px-[0.9rem] py-[0.45rem] text-[0.82rem] font-extrabold text-[#514784] dark:text-[#ded5ff]">
              یک قدم آرام، برای خودتان
            </p>
            <h1
              id="booking-title"
              className="mt-4 max-w-[18ch] text-[clamp(2.15rem,4.3vw,4.1rem)] leading-[1.4] font-black tracking-[-0.035em] text-balance"
            >
              جایی برای مکث؛{" "}
              <span className="text-[#187b77] dark:text-[#90e4d6]">
                زمانی برای گفت‌وگو
              </span>
            </h1>
            <p className="booking-hero-lead mt-[1.15rem] max-w-[49ch] text-[clamp(0.92rem,1.15vw,1.05rem)] leading-[2] text-[var(--site-muted)]">
              خدمت دلخواهتان را انتخاب کنید و از میان روزهای آزاد تقویم شمسی،
              زمانی مناسب بردارید. درخواست شما بعد از بررسی تأیید می‌شود.
            </p>
            <div
              className="booking-hero-features mt-[1.7rem] flex flex-wrap gap-[0.6rem]"
              aria-label="ویژگی‌های رزرو"
            >
              <span className="inline-flex min-h-[42px] items-center gap-2 rounded-[999px] border border-[color:color-mix(in_srgb,var(--site-violet)_15%,var(--site-line))] bg-[color:color-mix(in_srgb,var(--site-surface)_88%,transparent)] px-[0.85rem] py-[0.35rem] text-[0.83rem] font-bold">
                <CalendarDays
                  className="text-[#277d7b]"
                  size={18}
                  aria-hidden="true"
                />{" "}
                تقویم شمسی
              </span>
              <span className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[color:color-mix(in_srgb,var(--site-violet)_15%,var(--site-line))] bg-[color:color-mix(in_srgb,var(--site-surface)_88%,transparent)] px-[0.85rem] py-[0.35rem] text-[0.83rem] font-bold">
                <ShieldCheck
                  className="text-[#277d7b]"
                  size={18}
                  aria-hidden="true"
                />{" "}
                ثبت امن درخواست
              </span>
            </div>
          </div>
          <div className="booking-hero-photo relative h-[clamp(280px,31vw,445px)] min-w-0 overflow-hidden rounded-[145px_32px_32px_32px] border-[6px] border-[color:color-mix(in_srgb,var(--site-surface)_90%,transparent)] [box-shadow:0_34px_70px_-38px_rgb(38_63_68_/_36%)] max-[760.02px]:h-[clamp(210px,50vw,310px)] max-[760.02px]:rounded-[90px_24px_24px_24px] max-[480.02px]:h-[190px]">
            <Image
              className="h-full w-full object-cover object-[8%_center]"
              src="/assets/images/booking-atmosphere.jpg"
              alt=""
              width={688}
              height={500}
              priority
              sizes="(max-width: 760px) 100vw, 44vw"
            />
            <div className="booking-hero-note absolute [inset-inline-start:1.2rem] bottom-[1.2rem] flex max-w-[calc(100%-2.4rem)] items-center gap-[0.65rem] rounded-[17px] border border-[rgb(255_255_255_/_85%)] bg-[rgb(255_255_255_/_93%)] px-[0.9rem] py-[0.6rem] text-[#223d41] [box-shadow:0_12px_34px_-22px_rgb(11_40_48_/_40%)] max-[480.02px]:[inset-inline-start:0.7rem] max-[480.02px]:bottom-[0.7rem] max-[480.02px]:px-[0.6rem] max-[480.02px]:py-[0.35rem]">
              <span className="booking-hero-note-icon grid size-10 flex-none place-items-center rounded-[13px] bg-[#e2f0e9] text-[#247772]">
                <HeartHandshake size={22} aria-hidden="true" />
              </span>
              <span className="grid gap-[0.12rem]">
                <strong className="text-[0.84rem]">وقت‌های آزاد</strong>
                <small className="text-[0.73rem] text-[#536869]">
                  {slots.length
                    ? `${formatNumber(slots.length)} زمان در ۲۱ روز آینده`
                    : "به‌زودی زمان‌های تازه"}
                </small>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="booking-atmosphere relative isolate pt-[clamp(2.5rem,5vw,4.2rem)] pb-[clamp(4rem,8vw,7rem)] [background:radial-gradient(circle_at_6%_80%,rgb(175_208_211_/_22%),transparent_35%),radial-gradient(circle_at_92%_12%,rgb(205_187_217_/_18%),transparent_40%),var(--site-canvas)]!"
        aria-label="انتخاب وقت مشاوره"
      >
        <div
          className={`booking-layout mx-auto grid w-[min(1200px,calc(100%-2rem))] grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] [align-items:start] gap-[clamp(1.2rem,4vw,3.6rem)] max-[760.02px]:grid-cols-1 [&>.site-detail]:m-0! [&>.site-detail]:w-full! [&>.site-detail]:rounded-[30px_30px_30px_9px]! [&>.site-detail]:border-[color:color-mix(in_srgb,var(--c-teal)_18%,var(--site-line))]! [&>.site-detail]:bg-[var(--site-surface)]! [&>.site-detail]:[box-shadow:0_24px_54px_-37px_rgb(22_78_84_/_24%)]! max-[760.02px]:[&>.site-detail]:order-1 ${session ? "" : "items-center!"}`}
        >
          <aside className="booking-aside sticky top-28 min-w-0 rounded-[28px] border border-[color:color-mix(in_srgb,var(--site-violet)_13%,var(--site-line))] bg-[var(--site-surface)] p-[clamp(1.35rem,3vw,2.5rem)] [box-shadow:0_22px_50px_-42px_rgb(33_64_71_/_40%)] max-[760.02px]:static max-[760.02px]:order-2">
            <span className="booking-aside-kicker text-[0.78rem] font-extrabold text-[#247b77] dark:text-[#a8e2d7]">
              مسیر کوتاه رزرو
            </span>
            <h2 className="mt-[0.7rem] text-[clamp(1.45rem,2.4vw,2rem)] leading-[1.5]">
              قدم‌به‌قدم، با خیال آسوده
            </h2>
            <p className="mt-3 leading-[1.9] text-[var(--site-muted)]">
              برای انتخاب زمان عجله‌ای نیست. درخواست شما ثبت می‌شود و وضعیت آن
              را در حساب خود خواهید دید.
            </p>
            <ol className="booking-steps relative mt-[1.55rem] grid list-none gap-[0.9rem] [counter-reset:booking] before:absolute before:[inset-inline-start:17px] before:top-[19px] before:bottom-[18px] before:w-px before:bg-[linear-gradient(#398c88,#aeb7d7)] max-[760.02px]:grid-cols-3 max-[760.02px]:before:hidden max-[480.02px]:grid-cols-1 max-[480.02px]:gap-2">
              <li className="relative flex items-center gap-[0.85rem] text-[0.91rem] leading-[1.7] font-[750] before:grid before:size-[35px] before:flex-none before:place-items-center before:rounded-[50%] before:border-[3px] before:border-[var(--site-surface)] before:bg-[linear-gradient(120deg,#257c81,#6c64a9)] before:text-white before:[box-shadow:0_3px_10px_rgb(35_76_80_/_15%)] before:content-[counter(booking)] before:[counter-increment:booking]">
                انتخاب خدمت مورد نیاز
              </li>
              <li className="relative flex items-center gap-[0.85rem] text-[0.91rem] leading-[1.7] font-[750] before:grid before:size-[35px] before:flex-none before:place-items-center before:rounded-[50%] before:border-[3px] before:border-[var(--site-surface)] before:bg-[linear-gradient(120deg,#257c81,#6c64a9)] before:text-white before:[box-shadow:0_3px_10px_rgb(35_76_80_/_15%)] before:content-[counter(booking)] before:[counter-increment:booking]">
                انتخاب روز و ساعت آزاد
              </li>
              <li className="relative flex items-center gap-[0.85rem] text-[0.91rem] leading-[1.7] font-[750] before:grid before:size-[35px] before:flex-none before:place-items-center before:rounded-[50%] before:border-[3px] before:border-[var(--site-surface)] before:bg-[linear-gradient(120deg,#257c81,#6c64a9)] before:text-white before:[box-shadow:0_3px_10px_rgb(35_76_80_/_15%)] before:content-[counter(booking)] before:[counter-increment:booking]">
                بررسی و تأیید درخواست
              </li>
            </ol>
            <div className="booking-aside-reminder mt-[1.7rem] flex items-start gap-[0.7rem] rounded-[15px] bg-[color:color-mix(in_srgb,#4f9c91_8%,var(--site-surface))] px-4 py-[0.9rem] text-[0.8rem] leading-[1.85] text-[var(--site-muted)]">
              <ShieldCheck
                className="flex-none text-[#247b77]"
                size={20}
                aria-hidden="true"
              />
              <span>انتخاب وقت به‌معنای تأیید نهایی نوبت یا پرداخت نیست.</span>
            </div>
          </aside>
          {session ? (
            <BookingForm
              services={services}
              slots={slots}
              name={session.user.name}
              phone={session.user.username || ""}
            />
          ) : (
            <div
              className={`${siteDetailClassName} booking-guest grid gap-4 p-[clamp(2rem,4vw,3rem)]!`}
            >
              <span className="booking-guest-icon grid size-16 place-items-center rounded-[18px] bg-[color:color-mix(in_srgb,var(--site-violet)_13%,var(--site-surface))] text-[var(--site-violet)]">
                <LockKeyhole size={28} aria-hidden="true" />
              </span>
              <h3 className="text-[clamp(1.2rem,2vw,1.65rem)]">
                برای شروع، وارد حساب خود شوید
              </h3>
              <p className="max-w-[42ch] leading-[2] text-[var(--site-muted)]">
                پس از ورود می‌توانید روز و ساعت آزاد را از تقویم انتخاب کنید و
                درخواست رزرو را در حساب خود پیگیری کنید.
              </p>
              <Link
                href="/login"
                className="site-button mt-2 [justify-self:start] max-[480.02px]:[justify-self:stretch]"
              >
                {labels.login} و انتخاب زمان
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
