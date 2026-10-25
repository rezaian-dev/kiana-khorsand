import {
  publicButtonPrimaryClassName,
  publicBlobClassName,
  publicGlassClassName,
  publicH2ClassName,
  publicLeadClassName,
  publicContainerClassName,
} from "@/components/layout/public-styles";
import { BrandMark } from "@/components/shared/brand-mark";

import Link from "next/link";
import { MotionLink } from "@/components/motion/motion-link";
import { FooterSocialLink } from "@/components/layout/footer-social-link";
import { MotionAnchor } from "@/components/motion/motion-link";
import { getSettings } from "@/features/settings/queries";
import { listAreas } from "@/features/areas/queries";

const quick = [
  ["/", "خانه"],
  ["/about", "درباره من"],
  ["/areas", "حوزه‌های کار"],
  ["/approach", "روش کار"],
  ["/fees", "تعرفه‌ها"],
  ["/articles", "مقاله‌ها"],
  ["/workshops", "کارگاه‌ها"],
  ["/faq", "سؤال‌های پرتکرار"],
  ["/contact", "تماس"],
] as const;

export async function Footer() {
  const [settings, areas] = await Promise.all([getSettings(), listAreas()]);
  const contact = settings?.contact;
  return (
    <>
      <footer className="relative">
        <div className="accent-hairline h-px [background-image:var(--grad-sunset)] opacity-[.55]" />
        <div className={`${publicGlassClassName} relative overflow-hidden`}>
          <div
            className={`${publicBlobClassName} inset-s-10 -top-20 size-56 bg-(--c-teal)`}
            aria-hidden="true"
          />
          <div
            className={`${publicContainerClassName} relative py-12 md:py-16`}
          >
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[52ch] min-w-0">
                <h2 className={publicH2ClassName}>رزرو وقت مشاوره</h2>
                <p className={`${publicLeadClassName} mt-3`}>
                  اگر مطمئن نیستی از کجا شروع کنی، یک گفت‌وگوی کوتاه کافی است تا
                  مسیر روشن‌تر شود.
                </p>
              </div>
              <MotionAnchor
                href="/book"
                className={`${publicButtonPrimaryClassName} w-full md:w-auto`}
              >
                <i
                  className="ph-duotone ph-calendar-check"
                  aria-hidden="true"
                />
                انتخاب زمان جلسه
              </MotionAnchor>
            </div>
          </div>
        </div>
        <div className="accent-hairline-soft h-px [background-image:var(--grad-sunset)] opacity-[.28]" />
        <div className="relative bg-(--surface)">
          <div className={`${publicContainerClassName} py-14`}>
            <div className="grid-footer grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="min-w-0">
                <Link href="/" className="flex items-center gap-2.5">
                  <BrandMark
                    size={32}
                    className="size-8 flex-none rounded-xl object-cover"
                  />
                  <span className="text-base font-extrabold">کیانا خرسند</span>
                </Link>
                <p className="text-muted mt-4 text-sm/7">
                  روان‌شناس بالینی؛ همراه بزرگسالان، زوج‌ها و خانواده‌ها در مسیر
                  آرام‌تر شدن و روشن‌تر دیدن.
                </p>
                <ul className="mt-5 flex items-center gap-2.5">
                  {(["instagram", "telegram", "whatsapp"] as const).map(
                    (key) =>
                      contact?.[key] && (
                        <li key={key}>
                          <FooterSocialLink name={key} href={contact[key]} />
                        </li>
                      ),
                  )}
                </ul>
              </div>
              <nav className="min-w-0" aria-label="دسترسی سریع">
                <h3 className="text-sm font-extrabold">دسترسی سریع</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {quick.map(([href, label]) => (
                    <li key={href}>
                      <MotionLink
                        className="footer-link text-sm text-(--muted) no-underline hover:text-(--fg)"
                        href={href}
                      >
                        {label}
                      </MotionLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav className="min-w-0" aria-label="حوزه‌های کار">
                <h3 className="text-sm font-extrabold">حوزه‌های کار</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {areas.slice(0, 5).map((area) => (
                    <li key={area.slug}>
                      <MotionLink
                        className="footer-link text-sm text-(--muted) no-underline hover:text-(--fg)"
                        href={`/areas/${area.slug}`}
                      >
                        {area.title}
                      </MotionLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold">تماس و ساعات کاری</h3>
                <ul className="text-muted mt-4 flex flex-col gap-3 text-sm">
                  {contact?.phone && (
                    <li>
                      <i
                        className="ph-duotone ph-phone text-accent-indigo text-(--c-indigo)"
                        aria-hidden="true"
                      />{" "}
                      <a href={`tel:${contact.phone}`} dir="ltr">
                        {contact.phone}
                      </a>
                    </li>
                  )}
                  {contact?.email && (
                    <li>
                      <i
                        className="ph-duotone ph-envelope-simple text-accent-violet text-(--c-violet)"
                        aria-hidden="true"
                      />{" "}
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </li>
                  )}
                  {contact?.address && (
                    <li>
                      <i
                        className="ph-duotone ph-map-pin text-accent-plum text-(--c-plum)"
                        aria-hidden="true"
                      />{" "}
                      {contact.address}
                    </li>
                  )}
                  <li>
                    <i
                      className="ph-duotone ph-clock text-accent-amber text-(--c-amber)"
                      aria-hidden="true"
                    />{" "}
                    شنبه تا چهارشنبه، ۱۰:۰۰ تا ۱۹:۰۰
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="accent-hairline-soft h-px [background-image:var(--grad-sunset)] opacity-[.28]" />
          <div className={`${publicContainerClassName} py-6`}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-muted text-xs">
                ©{" "}
                {new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(
                  new Date().getFullYear(),
                )}{" "}
                کیانا خرسند — همه‌ی حقوق محفوظ است.
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
                <li>
                  <MotionLink
                    href="/privacy"
                    className="footer-legal text-(--muted) no-underline hover:text-(--fg)"
                  >
                    حریم خصوصی
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="/terms"
                    className="footer-legal text-(--muted) no-underline hover:text-(--fg)"
                  >
                    شرایط استفاده
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="/cancellation"
                    className="footer-legal text-(--muted) no-underline hover:text-(--fg)"
                  >
                    شرایط لغو
                  </MotionLink>
                </li>
              </ul>
              <a
                href="#main"
                aria-label="بازگشت به بالای صفحه"
                className="grid size-11 place-items-center rounded-full border border-(--line) bg-(--surface) text-(--muted) shadow-sm transition-colors hover:border-(--c-teal) hover:text-(--c-teal) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--c-teal)"
              >
                <i className="ph-bold ph-arrow-up" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
