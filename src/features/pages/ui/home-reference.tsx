import {
  publicSpotClassName,
  publicCardClassName,
  publicRainbowCardClassName,
  publicButtonPrimaryClassName,
  publicButtonSoftClassName,
  publicArchedPortraitClassName,
  publicBlobClassName,
  publicPortraitCanvasClassName,
  publicEditorialHeroClassName,
  publicEditorialOrnamentClassName,
  publicHeroPortraitFrameClassName,
  publicTileToneClasses,
  publicIconTileClassName,
  publicIconTileSizedClassName,
  publicChipClassName,
  publicEyebrowClassName,
  publicH1ClassName,
  publicH2ClassName,
  publicH3ClassName,
  publicLeadClassName,
  publicContainerClassName,
  publicHeroSectionClassName,
  publicSectionClassName,
} from "@/components/layout/public-styles";
import {
  ctaPhotoClassName,
  ctaGlassClassName,
} from "@/components/shared/cta-photo-styles";
import { ScrollReveal } from "@/components/motion/reveal";
import { MotionLink } from "@/components/motion/motion-link";
import Image from "next/image";
import { MessageCircleHeart, Waypoints } from "lucide-react";
import Link from "next/link";
import {
  HeroReveal,
  PortraitFloat,
  FloatingTicket,
  SectionReveal,
} from "./hero-visuals";
import {
  ReferenceApproach,
  ReferenceAreas,
  ReferenceFaq,
  ReferenceFees,
} from "./home-reference-sections";
import { HomeSlider } from "./home-slider";
import type { listAreas } from "@/features/areas/queries";
import type { listServices } from "@/features/services/queries";
import type { listArticles } from "@/features/articles/queries";
import type { listWorkshops } from "@/features/workshops/queries";
import type { listTestimonials } from "@/features/testimonials/queries";
import type { listFaqs } from "@/features/faqs/queries";

/** A line of the reference strip. */
const referenceRowClassName =
  "home-section-head flex items-end justify-between gap-5 max-[620.02px]:flex-col max-[620.02px]:items-start";

export function HomeReference({
  image,
  areas,
  services,
  articles,
  workshops,
  testimonials,
  faqs,
}: {
  image?: string | null;
  areas: Awaited<ReturnType<typeof listAreas>>;
  services: Awaited<ReturnType<typeof listServices>>;
  articles: Awaited<ReturnType<typeof listArticles>>;
  workshops: Awaited<ReturnType<typeof listWorkshops>>;
  testimonials: Awaited<ReturnType<typeof listTestimonials>>;
  faqs: Awaited<ReturnType<typeof listFaqs>>;
}) {
  return (
    <>
      <section
        className={`${publicHeroSectionClassName} ${publicEditorialHeroClassName} ${publicEditorialOrnamentClassName} home-editorial-hero relative pb-14 md:pb-24`}
      >
        <div
          className={`${publicBlobClassName} -inset-s-20 -top-16 size-72 bg-(--c-violet)`}
          aria-hidden="true"
        ></div>
        <div
          className={`${publicBlobClassName} -inset-e-24 top-24 size-80 bg-(--c-plum)`}
          aria-hidden="true"
        ></div>
        <div
          className={`${publicBlobClassName} inset-s-1/3 bottom-0 size-64 bg-(--c-amber)`}
          aria-hidden="true"
        ></div>
        <div className={`${publicContainerClassName} relative`}>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="min-w-0">
              <p className={publicEyebrowClassName}>
                روان‌شناس بالینی · آنلاین و حضوری
              </p>
              <HeroReveal delay={0.05} mode="text">
                <h1 className={`${publicH1ClassName} mt-5`}>
                  {" "}
                  <span className="inline-block">جایی</span>{" "}
                  <span className="inline-block">امن</span>{" "}
                  <span className="inline-block">برای</span>{" "}
                  <span className="inline-block">حرف‌زدن،</span>{" "}
                  <span className="inline-block">فهمیدن</span>{" "}
                  <span className="inline-block">و</span>{" "}
                  <span className="home-hero-keyword box-decoration-clone text-[#146478] [background:linear-gradient(90deg,#8b6cae,#50b5a9)_bottom/100%_.11em_no-repeat] dark:text-[#96e6db]">
                    تغییر
                  </span>{" "}
                </h1>
              </HeroReveal>
              <p className={`${publicLeadClassName} mt-6 max-w-[52ch]`}>
                {" "}
                من کیانا خرسند هستم؛ روان‌شناس بالینی. اگر اضطراب، دلخوری‌های
                رابطه یا سنگینی روزها امانت را بریده، اینجا می‌توانیم با هم و
                بدون قضاوت، قدم‌به‌قدم مسیر را پیدا کنیم.{" "}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MotionLink
                  href="/book"
                  effect="lift"
                  className={`${publicButtonPrimaryClassName} w-full sm:w-auto`}
                >
                  {" "}
                  <i
                    className="ph-duotone ph-calendar-check text-[1.2rem]"
                    aria-hidden="true"
                  ></i>{" "}
                  رزرو وقت مشاوره{" "}
                </MotionLink>
                <MotionLink
                  href="/approach"
                  effect="lift"
                  className={`${publicButtonSoftClassName} w-full sm:w-auto`}
                >
                  {" "}
                  <i
                    className="ph-duotone ph-compass text-[1.2rem]"
                    aria-hidden="true"
                  ></i>{" "}
                  آشنایی با روش کار من{" "}
                </MotionLink>
              </div>
              <p className="text-muted mt-4 text-sm/7">
                {" "}
                اولین گفت‌وگو فقط برای آشنایی است؛ ببینیم راحت هستی یا نه.{" "}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                <li>
                  <span className={publicChipClassName}>
                    <i
                      className="ph-duotone ph-video-camera text-accent-violet text-[1.05rem] text-(--c-violet)"
                      aria-hidden="true"
                    ></i>
                    آنلاین و حضوری
                  </span>
                </li>
                <li>
                  <span className={publicChipClassName}>
                    <i
                      className="ph-duotone ph-clock text-accent-indigo text-[1.05rem] text-(--c-indigo)"
                      aria-hidden="true"
                    ></i>
                    جلسه‌ی ۵۰ دقیقه‌ای
                  </span>
                </li>
                <li>
                  <span className={publicChipClassName}>
                    <i
                      className="ph-duotone ph-sparkle text-accent-amber text-[1.05rem] text-(--c-amber)"
                      aria-hidden="true"
                    ></i>
                    رزرو آنلاین در چند دقیقه
                  </span>
                </li>
              </ul>
            </div>
            <HeroReveal
              delay={0.14}
              className="relative mx-auto w-full max-w-[440px] lg:max-w-none"
            >
              <PortraitFloat
                className={`${publicPortraitCanvasClassName} border-line home-hero-photo relative aspect-4/5 overflow-hidden ${publicArchedPortraitClassName} border shadow-(--shadow-lift) ${publicHeroPortraitFrameClassName}`}
              >
                {image && (
                  <Image
                    src={image}
                    width={880}
                    height={1100}
                    alt="تصویر هنری فضای مشاوره، نه عکس واقعی درمانگر"
                    preload
                    sizes="(max-width: 480px) 90vw, (max-width: 1023px) 440px, (max-width: 1440px) 40vw, 560px"
                    className={`${publicArchedPortraitClassName} absolute inset-0 size-full object-cover`}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 rounded-[42px] ring-1 ring-white/40 ring-inset"></div>
              </PortraitFloat>
              <FloatingTicket
                className="home-photo-check home-photo-check-bottom inset-s-[-.8rem] bottom-[7%] bg-[color-mix(in_srgb,var(--site-surface)_95%,#f3eaf6)]!"
                tone="violet"
                delay={0.35}
                floatY={6}
              >
                <span className="home-ticket-icon grid size-[38px] shrink-0 place-items-center rounded-[13px] bg-[linear-gradient(140deg,#7c648f,#407e9a)] text-white shadow-[0_7px_15px_-7px_#1b5c82] max-[480.02px]:size-[30px] max-[480.02px]:rounded-[10px] max-[480.02px]:[&_svg]:size-[17px]">
                  <MessageCircleHeart size={20} strokeWidth={1.9} />
                </span>
                <span className="home-ticket-copy grid gap-[.06rem] leading-[1.35] whitespace-nowrap">
                  <strong className="text-[.83rem] font-extrabold max-[480.02px]:text-[.7rem]">
                    گفت‌وگوی امن
                  </strong>
                  <small className="text-[.69rem] font-[650] text-(--site-muted) max-[480.02px]:text-[.61rem]">
                    بدون قضاوت
                  </small>
                </span>
              </FloatingTicket>
              <FloatingTicket
                className="home-photo-check home-photo-check-top inset-e-[-.8rem] top-[9%]"
                delay={0.15}
              >
                <span className="home-ticket-icon grid size-[38px] shrink-0 place-items-center rounded-[13px] bg-[linear-gradient(140deg,#177c80,#315a9c)] text-white shadow-[0_7px_15px_-7px_#1b5c82] max-[480.02px]:size-[30px] max-[480.02px]:rounded-[10px] max-[480.02px]:[&_svg]:size-[17px]">
                  <Waypoints size={20} strokeWidth={1.9} />
                </span>
                <span className="home-ticket-copy grid gap-[.06rem] leading-[1.35] whitespace-nowrap">
                  <strong className="text-[.83rem] font-extrabold max-[480.02px]:text-[.7rem]">
                    همراه مسیرت
                  </strong>
                  <small className="text-[.69rem] font-[650] text-(--site-muted) max-[480.02px]:text-[.61rem]">
                    قدم‌به‌قدم
                  </small>
                </span>
              </FloatingTicket>
            </HeroReveal>
          </div>
        </div>
      </section>
      <section className="relative pb-4" aria-labelledby="approach-strip-title">
        <div className={`${publicContainerClassName}`}>
          <h2 id="approach-strip-title" className="sr-only">
            رویکردهای درمانی
          </h2>
          <div className="accent-hairline mb-6 h-px [background-image:var(--grad-sunset)] opacity-[.55]"></div>
          <ul
            id="approachStrip"
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {<ReferenceApproach />}
          </ul>
        </div>
      </section>
      <section
        className={`${publicSectionClassName}`}
        aria-labelledby="areas-title"
      >
        <div
          className={`${publicBlobClassName} -inset-s-24 top-10 size-72 bg-(--c-violet)`}
          aria-hidden="true"
        ></div>
        <div className={`${publicContainerClassName} relative`}>
          <SectionReveal className={referenceRowClassName}>
            <div className="max-w-[62ch]">
              <p
                className={`${publicEyebrowClassName} text-[#45425c]! dark:text-(--muted)!`}
              >
                حوزه‌های کار
              </p>
              <h2 id="areas-title" className={`${publicH2ClassName} mt-4`}>
                روی چه چیزهایی با هم کار می‌کنیم
              </h2>
              <p className={`${publicLeadClassName} mt-4`}>
                {" "}
                هر مسیر شکل خودش را دارد. این‌ها رایج‌ترین موضوع‌هایی هستند که
                مراجعان با آن‌ها می‌آیند؛ اگر موضوع تو در این فهرست نیست، باز هم
                می‌توانیم درباره‌اش حرف بزنیم.{" "}
              </p>
            </div>
            <Link
              href="/areas"
              className={`${publicButtonSoftClassName} home-section-link flex-none`}
            >
              همهٔ حوزه‌های کار{" "}
              <i className="ph-bold ph-arrow-left" aria-hidden="true" />
            </Link>
          </SectionReveal>
          <ScrollReveal
            id="areasGrid"
            className="grid-cards mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {<ReferenceAreas areas={areas} />}
          </ScrollReveal>
        </div>
      </section>
      <section
        className={`${publicSectionClassName}`}
        aria-labelledby="how-title"
      >
        <div className={`${publicContainerClassName}`}>
          <div className="max-w-[62ch]">
            <p className={publicEyebrowClassName}>مسیر جلسه‌ها</p>
            <h2 id="how-title" className={`${publicH2ClassName} mt-4`}>
              از رزرو تا اولین قدم، شفاف و ساده
            </h2>
          </div>
          <ol className="grid-3col mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <li
              className={`${publicCardClassName} ${publicSpotClassName} group`}
            >
              {" "}
              <span
                className={`${publicIconTileClassName} tile-indigo ${publicTileToneClasses.indigo}`}
              >
                <i
                  className="ph-duotone ph-calendar-check"
                  aria-hidden="true"
                ></i>
              </span>{" "}
              <p className="text-muted mt-5 text-xs font-extrabold tracking-widest">
                گام یک
              </p>{" "}
              <h3 className={`${publicH3ClassName} mt-2`}>انتخاب وقت</h3>{" "}
              <p className="text-muted mt-3 text-sm/7">
                {" "}
                قالب جلسه و زمان مناسب را از تقویم انتخاب می‌کنی. چند سؤال کوتاه
                هم می‌پرسم تا جلسه با آمادگی شروع شود.{" "}
              </p>{" "}
            </li>
            <li
              className={`${publicCardClassName} ${publicSpotClassName} group`}
            >
              {" "}
              <span
                className={`${publicIconTileClassName} tile-violet ${publicTileToneClasses.violet}`}
              >
                <i
                  className="ph-duotone ph-chats-circle"
                  aria-hidden="true"
                ></i>
              </span>{" "}
              <p className="text-muted mt-5 text-xs font-extrabold tracking-widest">
                گام دو
              </p>{" "}
              <h3 className={`${publicH3ClassName} mt-2`}>جلسه‌ی اول</h3>{" "}
              <p className="text-muted mt-3 text-sm/7">
                {" "}
                با هم آشنا می‌شویم، درباره‌ی آنچه آزارت می‌دهد حرف می‌زنیم و
                هدف‌های واقع‌بینانه‌ای برای مسیر تعیین می‌کنیم.{" "}
              </p>{" "}
            </li>
            <li
              className={`${publicCardClassName} ${publicSpotClassName} group`}
            >
              {" "}
              <span
                className={`${publicIconTileClassName} tile-teal ${publicTileToneClasses.teal}`}
              >
                <i className="ph-duotone ph-waves" aria-hidden="true"></i>
              </span>{" "}
              <p className="text-muted mt-5 text-xs font-extrabold tracking-widest">
                گام سه
              </p>{" "}
              <h3 className={`${publicH3ClassName} mt-2`}>ادامه‌ی مسیر</h3>{" "}
              <p className="text-muted mt-3 text-sm/7">
                {" "}
                با فاصله‌ی منظم پیش می‌رویم، تمرین‌های کوچک بین جلسه‌ها را مرور
                می‌کنیم و هر چند وقت یک‌بار مسیر را بازبینی می‌کنیم.{" "}
              </p>{" "}
            </li>
          </ol>
        </div>
      </section>
      <section
        className={`${publicSectionClassName}`}
        aria-labelledby="benefits-title"
      >
        <div
          className={`${publicBlobClassName} -inset-e-24 -bottom-16 size-80 bg-(--c-teal)`}
          aria-hidden="true"
        ></div>
        <div className={`${publicContainerClassName} relative`}>
          <div className="max-w-[62ch]">
            <p className={publicEyebrowClassName}>تجربه‌ی جلسه</p>
            <h2 id="benefits-title" className={`${publicH2ClassName} mt-4`}>
              چیزی که در این مسیر تجربه می‌کنی
            </h2>
          </div>
          <ScrollReveal className="grid-bento mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <article
              className={`${publicRainbowCardClassName} ${publicSpotClassName} group span-2 lg:col-span-2`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <span
                  className={`${publicIconTileSizedClassName} tile-plum size-14 text-[1.75rem] ${publicTileToneClasses.plum}`}
                >
                  <i className="ph-duotone ph-heart" aria-hidden="true"></i>
                </span>
                <div className="min-w-0">
                  <h3 className={publicH3ClassName}>
                    فضایی که در آن شنیده می‌شوی
                  </h3>
                  <p className="text-muted mt-3 text-sm/7">
                    {" "}
                    بدون سرزنش، بدون عجله و بدون نصیحت‌های آماده. اول باید
                    بفهمیم چه چیزی برایت سخت است، بعد با هم راه‌های عملی پیدا
                    می‌کنیم.{" "}
                  </p>
                </div>
              </div>
            </article>
            <article
              className={`${publicCardClassName} ${publicSpotClassName} group`}
            >
              <span
                className={`${publicIconTileClassName} tile-teal ${publicTileToneClasses.teal}`}
              >
                <i
                  className="ph-duotone ph-video-camera"
                  aria-hidden="true"
                ></i>
              </span>
              <h3 className={`${publicH3ClassName} mt-5`}>آنلاین یا حضوری</h3>
              <p className="text-muted mt-3 text-sm/7">
                هر قالبی که راحت‌تری؛ از خانه یا در مطب.
              </p>
            </article>
            <article
              className={`${publicCardClassName} ${publicSpotClassName} group`}
            >
              <span
                className={`${publicIconTileClassName} tile-amber ${publicTileToneClasses.amber}`}
              >
                <i className="ph-duotone ph-lightbulb" aria-hidden="true"></i>
              </span>
              <h3 className={`${publicH3ClassName} mt-5`}>
                تمرین‌های کوچک و واقعی
              </h3>
              <p className="text-muted mt-3 text-sm/7">
                کارهای کوتاه و شدنی بین جلسه‌ها، نه لیست‌های طولانی.
              </p>
            </article>
            <article
              className={`${publicRainbowCardClassName} ${publicSpotClassName} group span-2 lg:col-span-2`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <span
                  className={`${publicIconTileSizedClassName} tile-rose size-14 text-[1.75rem] ${publicTileToneClasses.rose}`}
                >
                  <i
                    className="ph-duotone ph-note-pencil"
                    aria-hidden="true"
                  ></i>
                </span>
                <div className="min-w-0">
                  <h3 className={publicH3ClassName}>
                    مسیر روشن و قابل بازبینی
                  </h3>
                  <p className="text-muted mt-3 text-sm/7">
                    {" "}
                    در جلسه‌ی اول مشخص می‌کنیم روی چه چیزی کار می‌کنیم و از کجا
                    می‌فهمیم که مسیر درست پیش می‌رود. هر زمان لازم باشد، هدف‌ها
                    را با هم بازنویسی می‌کنیم.{" "}
                  </p>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>
      {<HomeSlider kind="testimonials" reviews={testimonials} />}
      {<HomeSlider kind="articles" articles={articles} />}
      {<HomeSlider kind="workshops" workshops={workshops} />}
      <section
        className={`${publicSectionClassName}`}
        aria-labelledby="fees-title"
      >
        <div
          className={`${publicBlobClassName} -inset-e-24 -top-10 size-72 bg-(--c-plum)`}
          aria-hidden="true"
        ></div>
        <div className={`${publicContainerClassName} relative`}>
          <SectionReveal className={referenceRowClassName}>
            <div className="max-w-[62ch]">
              <p className={publicEyebrowClassName}>قالب و تعرفه</p>
              <h2 id="fees-title" className={`${publicH2ClassName} mt-4`}>
                جلسه‌ها و هزینه‌ها
              </h2>
              <p className={`${publicLeadClassName} mt-4`}>
                {" "}
                مدت هر جلسه و مبلغ آن از قبل روشن است؛ بدون هزینه‌ی پنهان.{" "}
              </p>
            </div>
            <Link
              href="/fees"
              className={`${publicButtonSoftClassName} home-section-link flex-none`}
            >
              جزئیات تعرفه‌ها{" "}
              <i className="ph-bold ph-arrow-left" aria-hidden="true" />
            </Link>
          </SectionReveal>
          <ScrollReveal
            id="feesGrid"
            className="grid-cards-wide mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3"
          >
            {<ReferenceFees services={services} />}
          </ScrollReveal>
        </div>
      </section>
      <section
        className={`${publicSectionClassName}`}
        aria-labelledby="faq-title"
      >
        <div className={`${publicContainerClassName}`}>
          <div className="grid-faq grid grid-cols-1 gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
            <div className="max-w-[46ch]">
              <p className={publicEyebrowClassName}>سؤال‌های پرتکرار</p>
              <h2 id="faq-title" className={`${publicH2ClassName} mt-4`}>
                چیزهایی که پیش از شروع خوب است بدانی
              </h2>
              <p className={`${publicLeadClassName} mt-4`}>
                {" "}
                اگر پاسخ سوالت را اینجا پیدا نکردی، در صفحه‌ی تماس بنویس؛ خودم
                جواب می‌دهم.{" "}
              </p>
              <Link
                href="/contact"
                className={`${publicButtonSoftClassName} mt-6`}
              >
                {" "}
                <i
                  className="ph-duotone ph-chats-circle text-[1.15rem]"
                  aria-hidden="true"
                ></i>{" "}
                پرسیدن سؤال{" "}
              </Link>
            </div>
            <div id="faqList" className="flex flex-col gap-3">
              {<ReferenceFaq faqs={faqs} />}
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${publicSectionClassName} pt-0!`}
        aria-labelledby="final-cta-title"
      >
        <div className={`${publicContainerClassName}`}>
          <div
            className={`${ctaPhotoClassName} border-line relative overflow-hidden rounded-[28px] border p-8 text-center sm:rounded-[32px] sm:p-12 md:p-16`}
          >
            <div
              className={`${publicBlobClassName} inset-s-1/4 -top-16 size-56 bg-(--c-violet)`}
              aria-hidden="true"
            ></div>
            <div className={ctaGlassClassName}>
              <span
                className={`${publicIconTileSizedClassName} tile-violet mx-auto size-14 text-[1.75rem] ${publicTileToneClasses.violet}`}
              >
                {" "}
                <i
                  className="ph-duotone ph-hand-heart"
                  aria-hidden="true"
                ></i>{" "}
              </span>
              <h2 id="final-cta-title" className={`${publicH2ClassName} mt-6`}>
                قدم اول را با هم برداریم
              </h2>
              <p className={`${publicLeadClassName} mt-4`}>
                {" "}
                لازم نیست از قبل بدانی چه می‌خواهی بگویی. یک گفت‌وگوی ساده کافی
                است تا ببینی این مسیر برایت درست است یا نه.{" "}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <MotionLink
                  href="/book"
                  effect="lift"
                  className={`${publicButtonPrimaryClassName} w-full sm:w-auto`}
                >
                  {" "}
                  <i
                    className="ph-duotone ph-calendar-check text-[1.2rem]"
                    aria-hidden="true"
                  ></i>{" "}
                  رزرو وقت مشاوره{" "}
                </MotionLink>
                <MotionLink
                  href="/contact"
                  effect="lift"
                  className={`${publicButtonSoftClassName} w-full sm:w-auto`}
                >
                  تماس و پرسش
                </MotionLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
