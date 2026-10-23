import {
  fieldPolishClassName,
  publicCardClassName,
  publicRainbowCardClassName,
  publicButtonPrimaryClassName,
  publicBlobClassName,
  publicEditorialHeroClassName,
  publicTileToneClassName,
  publicTileToneClasses,
  publicIconTileClassName,
  publicIconTileBaseClassName,
  publicIconTileSizedClassName,
  publicIconTileShadowClassName,
  publicEyebrowClassName,
  publicH1ClassName,
  publicH3ClassName,
  publicLeadClassName,
  publicGradTextClassName,
  publicContainerClassName,
  publicHeroSectionClassName,
  publicSectionClassName,
} from "@/components/layout/public-styles";
import { MotionLink } from "@/components/motion/motion-link";

import { ScrollReveal } from "@/components/motion/reveal";
import Image from "next/image";
import { SiteBreadcrumb } from "@/components/shared/site-breadcrumb";
import { getSettings } from "@/features/settings/queries";
import { getRules } from "@/features/booking/queries";
import { ContactForm } from "@/features/contact/ui/contact-form";
import { MotionCard } from "@/components/motion/motion-card";
import { publicMetadata } from "@/lib/public-metadata";

export const revalidate = 86400;
export const metadata = publicMetadata({
  title: "تماس و پرسش درباره مشاوره | کیانا خرسند",
  description:
    "راه‌های تماس، ساعات پاسخ‌دهی و فرم ارسال پرسش درباره مشاوره با کیانا خرسند.",
  path: "/contact",
  image: "/assets/images/intro-gather.jpg",
});

const days = [
  { key: "sat", label: "شنبه" },
  { key: "sun", label: "یکشنبه" },
  { key: "mon", label: "دوشنبه" },
  { key: "tue", label: "سه‌شنبه" },
  { key: "wed", label: "چهارشنبه" },
  { key: "thu", label: "پنجشنبه" },
  { key: "fri", label: "جمعه" },
] as const;
const persianTime = (time: string) =>
  time.replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
function Icon({ name }: { name: string }) {
  return <i className={`ph-duotone ph-${name}`} aria-hidden="true" />;
}
export default async function Page() {
  const [settings, rules] = await Promise.all([getSettings(), getRules()]);
  const contact = settings?.contact;
  const channels = [
    contact?.phone && {
      icon: "phone",
      tone: "teal",
      label: "تلفن تماس",
      value: contact.phone,
      href: `tel:${contact.phone}`,
    },
    contact?.email && {
      icon: "envelope-simple",
      tone: "indigo",
      label: "ایمیل",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact?.address && {
      icon: "map-pin",
      tone: "rose",
      label: "نشانی",
      value: contact.address,
      href: "",
    },
  ].filter(
    (
      item,
    ): item is {
      icon: string;
      tone: string;
      label: string;
      value: string;
      href: string;
    } => Boolean(item),
  );
  return (
    <div className={`reference-contact ${fieldPolishClassName}`}>
      <section
        className={`${publicHeroSectionClassName} ${publicEditorialHeroClassName} contact-editorial-hero relative pb-10 md:pb-14`}
      >
        <div
          className={`${publicBlobClassName} -start-20 -top-16 h-72 w-72 bg-[var(--c-teal)]`}
          aria-hidden="true"
        />
        <div
          className={`${publicBlobClassName} -end-24 top-16 h-80 w-80 bg-[var(--c-amber)]`}
          aria-hidden="true"
        />
        <div className={`${publicContainerClassName} relative`}>
          <SiteBreadcrumb current="تماس و پرسش" />
          <div className="contact-hero-layout mt-[0.65rem] grid grid-cols-1 items-center gap-[clamp(1.5rem,5vw,5rem)] min-[761px]:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)]">
            <div className="contact-hero-copy max-w-[62ch] min-w-0">
              <p className={publicEyebrowClassName}>تماس و پرسش</p>
              <h1 className={`${publicH1ClassName} mt-5`}>
                هر سؤالی داری،{" "}
                <span className={publicGradTextClassName}>بنویس</span>
              </h1>
              <p className={`${publicLeadClassName} mt-6 leading-[2]`}>
                اگر دربارهٔ شیوهٔ مشاوره یا رزرو پرسشی داری، اینجا راه‌های
                ارتباط و ارسال پیام را پیدا می‌کنی. برای شرایط فوری، از خدمات
                اورژانس کمک بگیر.
              </p>
            </div>
            <div className="contact-hero-art relative h-[clamp(270px,28vw,390px)] overflow-hidden rounded-[115px_28px_28px_28px] border-[6px] border-[color:color-mix(in_srgb,var(--site-surface)_90%,transparent)] [box-shadow:0_28px_55px_-32px_#375a5a68] max-[760.02px]:h-[clamp(205px,52vw,300px)] max-[760.02px]:rounded-[84px_23px_23px_23px]">
              <Image
                src="/assets/images/intro-gather.jpg"
                width={740}
                height={500}
                sizes="(max-width: 760px) 100vw, 43vw"
                alt=""
                priority
                className="size-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${publicSectionClassName} pt-0!`}
        aria-labelledby="contact-title"
      >
        <div className={`${publicContainerClassName}`}>
          <ScrollReveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <h2 className={publicH3ClassName} id="contact-title">
                راه‌های ارتباطی
              </h2>
              <div id="contactCards" className="mt-6 grid gap-3">
                {channels.map((item) => (
                  <MotionCard
                    key={item.label}
                    className="flex min-w-0 gap-4 rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]"
                  >
                    <span
                      className={`${publicIconTileBaseClassName} ${publicIconTileShadowClassName} tile-${item.tone} ${publicTileToneClassName(item.tone)} size-[46px] shrink-0 rounded-[14px] text-[1.35rem]`}
                    >
                      <Icon name={item.icon} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[var(--muted)]">
                        {item.label}
                      </p>
                      <p className="mt-[.2rem] text-base font-extrabold break-words text-[var(--fg)]">
                        {item.href ? (
                          <a
                            href={item.href}
                            dir={item.label === "نشانی" ? undefined : "ltr"}
                            className="hover:text-[var(--c-teal)] hover:underline hover:underline-offset-[.2em]"
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </p>
                    </div>
                  </MotionCard>
                ))}
              </div>
              <div className={`${publicCardClassName} mt-6`}>
                <div className="flex items-center gap-3">
                  <span
                    className={`${publicIconTileClassName} tile-amber ${publicTileToneClasses.amber}`}
                  >
                    <Icon name="clock" />
                  </span>
                  <h3 className={publicH3ClassName}>ساعات پاسخ‌دهی</h3>
                </div>
                <div className="mt-4" id="hoursList">
                  {days.map((day) => {
                    const rule = rules.find((item) => item.key === day.key);
                    const open = Boolean(rule?.slots.length);
                    return (
                      <div
                        className="flex justify-between gap-4 border-b border-dashed border-[var(--line)] py-[.65rem] text-sm last:border-b-0"
                        key={day.key}
                      >
                        <span className="font-bold text-[var(--muted)]">
                          {day.label}
                        </span>
                        <span
                          className={`text-start font-bold [unicode-bidi:isolate] ${open ? "text-[var(--fg)]" : "text-[var(--c-rose)]"}`}
                          dir={open ? "ltr" : undefined}
                        >
                          {open
                            ? `${persianTime(rule!.start)} – ${persianTime(rule!.end)}`
                            : "تعطیل"}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  در موارد خطر فوری، لطفاً با اورژانس اجتماعی ۱۲۳ یا خدمات
                  فوریت‌های محل زندگی خود تماس بگیر.
                </p>
              </div>
              <div className={`${publicRainbowCardClassName} mt-6`}>
                <span
                  className={`${publicIconTileClassName} tile-teal ${publicTileToneClasses.teal}`}
                >
                  <Icon name="calendar-check" />
                </span>
                <h3 className={`${publicH3ClassName} mt-5`}>
                  اگر ترجیح می‌دهی مستقیم وقت بگیری
                </h3>
                <p className="text-muted mt-3 text-sm leading-7">
                  اگر سؤال خاصی نداری و آماده‌ای شروع کنی، می‌توانی بدون تماس،
                  وقت مشاوره رزرو کنی.
                </p>
                <MotionLink
                  className={`${publicButtonPrimaryClassName} mt-5 w-full`}
                  href="/book"
                >
                  <Icon name="calendar-check" />
                  رزرو وقت مشاوره
                </MotionLink>
              </div>
            </div>
            <div className="min-w-0">
              <div className={publicRainbowCardClassName} id="formCard">
                <div className="flex items-center gap-3">
                  <span
                    className={`${publicIconTileSizedClassName} tile-indigo h-12 w-12 text-[1.35rem] ${publicTileToneClasses.indigo}`}
                  >
                    <Icon name="paper-plane-tilt" />
                  </span>
                  <div className="min-w-0">
                    <h2 className={publicH3ClassName}>پیام کوتاه</h2>
                    <p className="text-muted mt-2 text-sm leading-7">
                      اگر سؤالت کوتاه است یا می‌خواهی قبل از رزرو مطمئن شوی،
                      همین‌جا بنویس.
                    </p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
