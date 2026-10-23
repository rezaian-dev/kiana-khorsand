import {
  publicSpotClassName,
  publicCardClassName,
  publicRainbowCardClassName,
  publicButtonPrimaryClassName,
  publicButtonSoftClassName,
  publicBlobClassName,
  publicPortraitCanvasClassName,
  publicEditorialHeroClassName,
  publicEditorialOrnamentClassName,
  publicHeroPortraitFrameClassName,
  publicGlassClassName,
  publicTileToneClasses,
  publicTileToneClassName,
  publicIconTileClassName,
  publicIconTileSizedClassName,
  publicChipClassName,
  publicEyebrowClassName,
  publicH1ClassName,
  publicH2ClassName,
  publicH3ClassName,
  publicLeadClassName,
  publicGradTextClassName,
  publicContainerClassName,
  publicHeroSectionClassName,
  publicSectionClassName,
} from "@/components/layout/public-styles";
import {
  ctaPhotoClassName,
  ctaGlassClassName,
} from "@/components/shared/cta-photo-styles";
import { ScrollReveal } from "@/components/motion/reveal";
import Image from "next/image";
import Link from "next/link";
import { SiteBreadcrumb } from "@/components/shared/site-breadcrumb";
import { AboutTimeline } from "./about-timeline";

const values = [
  {
    icon: "hand-heart",
    tone: "violet",
    title: "احترام به سرعت خودت",
    body: "هیچ‌کس مجبور نیست سریع بهبود پیدا کند. با آهنگی پیش می‌رویم که برای تو قابل تحمل و قابل ادامه باشد.",
  },
  {
    icon: "chats-circle",
    tone: "teal",
    title: "شفاف و بدون ابهام",
    body: "رویکرد، تعداد جلسه‌ها، هزینه و انتظارات از همان ابتدا روشن است. اگر چیزی در مسیر عوض شد، با هم بازبینی می‌کنیم.",
  },
  {
    icon: "shield-check",
    tone: "plum",
    title: "حفظ حرمت و رازداری",
    body: "چیزی که در جلسه گفته می‌شود، همان‌جا می‌ماند. رازداری یک اصل حرفه‌ای است، نه یک تعارف.",
  },
];
const firstSession = [
  {
    icon: "chats-circle",
    tone: "indigo",
    title: "با هم آشنا می‌شویم",
    body: "چند دقیقه درباره‌ی خودت، دلیل آمدنت و توقعی که از جلسه داری حرف می‌زنیم.",
  },
  {
    icon: "magnifying-glass",
    tone: "violet",
    title: "مسیر را روشن می‌کنیم",
    body: "با هم بررسی می‌کنیم که چه چیزی بیشتر آزارت می‌دهد و کجا می‌توانیم از آن شروع کنیم.",
  },
  {
    icon: "calendar-check",
    tone: "teal",
    title: "تصمیم با خودت است",
    body: "در انتها تصمیم می‌گیری که ادامه بدهیم یا نه. هیچ فشاری برای تعهد بلندمدت نیست.",
  },
];
function Icon({ name }: { name: string }) {
  return <i className={`ph-duotone ph-${name}`} aria-hidden="true" />;
}
export function AboutReference({
  image,
  name,
  title,
}: {
  image: string;
  name: string;
  title: string;
}) {
  return (
    <div className="reference-about">
      <section
        className={`${publicHeroSectionClassName} ${publicEditorialHeroClassName} ${publicEditorialOrnamentClassName} about-editorial-hero relative pb-14 md:pb-20`}
      >
        <div
          className={`${publicBlobClassName} -start-20 -top-16 h-72 w-72 bg-[var(--c-violet)]`}
          aria-hidden="true"
        />
        <div
          className={`${publicBlobClassName} -end-24 top-24 h-80 w-80 bg-[var(--c-plum)]`}
          aria-hidden="true"
        />
        <div className={`${publicContainerClassName} relative`}>
          <SiteBreadcrumb current="درباره من" />
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="min-w-0">
              <p className={publicEyebrowClassName}>درباره من</p>
              <h1 className={`${publicH1ClassName} mt-5`}>
                کنار تو می‌مانم تا{" "}
                <span className={publicGradTextClassName}>راه خودت</span> را
                پیدا کنی
              </h1>
              <p className={`${publicLeadClassName} mt-6 max-w-[52ch]`}>
                من {name} هستم؛ {title}. سال‌هاست در اتاق درمان کنار بزرگسالان،
                زوج‌ها و خانواده‌ها نشسته‌ام و یاد گرفته‌ام که هیچ مسیری شبیه
                دیگری نیست. کاری که می‌کنم این است که با دقت گوش بدهم، سؤال‌های
                درست بپرسم و در آن لحظه‌هایی که راه پیدا نیست، کنارت بمانم.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/book"
                  className={`${publicButtonPrimaryClassName} w-full sm:w-auto`}
                >
                  <Icon name="calendar-check" />
                  رزرو وقت مشاوره
                </Link>
                <Link
                  href="/approach"
                  className={`${publicButtonSoftClassName} w-full sm:w-auto`}
                >
                  <Icon name="compass" />
                  روش کار من
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                <li>
                  <span className={publicChipClassName}>
                    <i
                      className="ph-duotone ph-brain text-accent-violet text-[1.05rem] [color:var(--c-violet)]"
                      aria-hidden="true"
                    />
                    درمان شناختی‌رفتاری
                  </span>
                </li>
                <li>
                  <span className={publicChipClassName}>
                    <i
                      className="ph-duotone ph-compass text-accent-indigo text-[1.05rem] [color:var(--c-indigo)]"
                      aria-hidden="true"
                    />
                    پذیرش و تعهد
                  </span>
                </li>
                <li>
                  <span className={publicChipClassName}>
                    <i
                      className="ph-duotone ph-users-three text-accent-plum text-[1.05rem] [color:var(--c-plum)]"
                      aria-hidden="true"
                    />
                    زوج و خانواده
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
              <div
                className={`${publicPortraitCanvasClassName} border-line relative aspect-[4/5] overflow-hidden rounded-[42px] border ${publicHeroPortraitFrameClassName}`}
              >
                <Image
                  src={image}
                  alt="تصویر هنری مرتبط با فضای مشاوره؛ عکس واقعی درمانگر نیست"
                  width={880}
                  height={1100}
                  priority
                  className="absolute inset-0 h-full w-full rounded-[42px] object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/40 ring-inset" />
              </div>
              <div
                className={`${publicGlassClassName} absolute start-0 -bottom-5 flex max-w-[220px] items-center gap-3 rounded-3xl p-3.5 shadow-[var(--shadow-lift)] sm:-start-6`}
              >
                <span
                  className={`${publicIconTileSizedClassName} tile-teal h-11 w-11 text-[1.25rem] ${publicTileToneClasses.teal}`}
                >
                  <Icon name="hand-heart" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-extrabold">
                    گوش دادن واقعی
                  </span>
                  <span className="text-muted block text-xs leading-6">
                    بدون قضاوت و بدون نصیحت
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${publicSectionClassName}`}
        aria-labelledby="values-title"
      >
        <div className={`${publicContainerClassName}`}>
          <div className="max-w-[62ch]">
            <p className={publicEyebrowClassName}>ارزش‌های من در کار</p>
            <h2 className={`${publicH2ClassName} mt-4`} id="values-title">
              چیزهایی که در اتاق درمان برایم مهم است
            </h2>
          </div>
          <ScrollReveal className="grid-cards mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => (
              <article
                className={`${publicCardClassName} ${publicSpotClassName} group`}
                key={item.title}
              >
                <span
                  className={`${publicIconTileClassName} tile-${item.tone} ${publicTileToneClassName(item.tone)}`}
                >
                  <Icon name={item.icon} />
                </span>
                <h3 className={`${publicH3ClassName} mt-5`}>{item.title}</h3>
                <p className="text-muted mt-3 text-sm leading-7">{item.body}</p>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>
      <section
        className={`${publicSectionClassName}`}
        aria-labelledby="journey-title"
      >
        <div
          className={`${publicBlobClassName} -start-24 -bottom-10 h-72 w-72 bg-[var(--c-teal)]`}
          aria-hidden="true"
        />
        <div className={`${publicContainerClassName} relative`}>
          <ScrollReveal className="grid-2col grid grid-cols-1 gap-5 md:grid-cols-2 md:items-start">
            <div className="max-w-[46ch]">
              <p className={publicEyebrowClassName}>مسیر حرفه‌ای</p>
              <h2 className={`${publicH2ClassName} mt-4`} id="journey-title">
                چطور به اینجا رسیدم
              </h2>
              <p className={`${publicLeadClassName} mt-4`}>
                مسیر من از یک سؤال ساده شروع شد: چرا بعضی حرف‌ها را فقط وقتی
                می‌توانیم بزنیم که کسی بدون قضاوت گوش می‌دهد؟ سال‌ها تحصیل و کار
                در حوزه‌ی بالینی، این سؤال را برایم جدی‌تر کرد.
              </p>
            </div>
            <AboutTimeline />
          </ScrollReveal>
        </div>
      </section>
      <section
        className={`${publicSectionClassName}`}
        aria-labelledby="expect-title"
      >
        <div className={`${publicContainerClassName}`}>
          <div className="max-w-[62ch]">
            <p className={publicEyebrowClassName}>
              در جلسه‌ی اول چه اتفاقی می‌افتد؟
            </p>
            <h2 className={`${publicH2ClassName} mt-4`} id="expect-title">
              بدون تشریفات، بدون فشار
            </h2>
            <p className={`${publicLeadClassName} mt-4`}>
              جلسه‌ی اول دقیقاً همان‌جایی است که باید راحت باشی. ما با هم آشنا
              می‌شویم، درباره‌ی آنچه آزارت می‌دهد حرف می‌زنیم، و در انتها بازه‌ی
              تقریبی مسیر را با هم مرور می‌کنیم. تصمیم نهایی برای ادامه، همیشه
              با خودت است.
            </p>
          </div>
          <ScrollReveal className="grid-3col mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {firstSession.map((item) => (
              <article
                className={`${publicRainbowCardClassName} ${publicSpotClassName} group`}
                key={item.title}
              >
                <span
                  className={`${publicIconTileClassName} tile-${item.tone} ${publicTileToneClassName(item.tone)}`}
                >
                  <Icon name={item.icon} />
                </span>
                <h3 className={`${publicH3ClassName} mt-5`}>{item.title}</h3>
                <p className="text-muted mt-3 text-sm leading-7">{item.body}</p>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>
      <section
        className={`${publicSectionClassName} pt-0!`}
        aria-labelledby="final-cta-title"
      >
        <div className={`${publicContainerClassName}`}>
          <ScrollReveal
            className={`${ctaPhotoClassName} border-line relative overflow-hidden rounded-[28px] border p-8 text-center sm:rounded-[32px] sm:p-12`}
          >
            <div className={ctaGlassClassName}>
              <span
                className={`${publicIconTileSizedClassName} tile-violet mx-auto h-14 w-14 text-[1.75rem] ${publicTileToneClasses.violet}`}
              >
                <Icon name="hand-heart" />
              </span>
              <h2 className={`${publicH2ClassName} mt-6`} id="final-cta-title">
                قدم اول را با هم برداریم
              </h2>
              <p className={`${publicLeadClassName} mt-4`}>
                اگر مطمئن نیستی از کجا شروع کنی، یک گفت‌وگوی کوتاه کافی است تا
                مسیر روشن‌تر شود.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className={`${publicButtonPrimaryClassName} w-full sm:w-auto`}
                >
                  <Icon name="calendar-check" />
                  رزرو وقت مشاوره
                </Link>
                <Link
                  href="/contact"
                  className={`${publicButtonSoftClassName} w-full sm:w-auto`}
                >
                  تماس و پرسش
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
