import { formatNumber } from "@/lib/format";
import Link from "next/link";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/reveal";
import { SectionReveal } from "./hero-visuals";
import {
  publicBlobClassName,
  publicButtonPrimaryClassName,
  publicButtonSoftClassName,
  publicCardClassName,
  publicChipClassName,
  publicContainerClassName,
  publicEyebrowClassName,
  publicH2ClassName,
  publicH3ClassName,
  publicIconTileArtClassName,
  publicIconTileBaseClassName,
  publicLeadClassName,
  publicRainbowCardClassName,
  publicSectionClassName,
  publicSpotClassName,
  publicTileToneClassName,
} from "@/components/layout/public-styles";
import {
  artCornerClassName,
  artIconTileClassName,
  artSurfaceClassName,
} from "@/components/shared/art-card-styles";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { cn } from "@/lib/utils";
import type { listAreas } from "@/features/areas/queries";
import type { listServices } from "@/features/services/queries";
import type { listFaqs } from "@/features/faqs/queries";

const approach = [
  { icon: "ph-brain", tone: "violet", label: "درمان شناختی‌رفتاری (CBT)" },
  { icon: "ph-compass", tone: "indigo", label: "پذیرش و تعهد (ACT)" },
  {
    icon: "ph-users-three",
    tone: "plum",
    label: "زوج‌درمانی و مشاوره خانواده",
  },
  { icon: "ph-flower-lotus", tone: "teal", label: "ذهن‌آگاهی و تنظیم هیجان" },
  {
    icon: "ph-chats-circle",
    tone: "amber",
    label: "مصاحبه‌ی بالینی و ارزیابی",
  },
  { icon: "ph-seal-check", tone: "rose", label: "کار با بزرگسالان" },
];
// Keep the semantic hook for diagnostics; color utilities must be statically
// discoverable by Tailwind. The rose hook previously inherited its color.
const approachAccentColor = {
  violet: "[color:var(--c-violet)]",
  indigo: "[color:var(--c-indigo)]",
  plum: "[color:var(--c-plum)]",
  teal: "[color:var(--c-teal)]",
  amber: "[color:var(--c-amber)]",
  rose: "",
} as const;
const areaIcons = [
  "ph-waves",
  "ph-cloud",
  "ph-users-three",
  "ph-sparkle",
  "ph-flower",
];
const tones = ["rose", "indigo", "plum", "teal", "amber"];

/** Eyebrow/heading block on one side, the "see all" link on the other. */
const referenceRowClassName =
  "home-section-head flex items-end justify-between gap-5 max-[620.02px]:flex-col max-[620.02px]:items-start";

/**
 * The section skeleton the areas and fees strips share: an optional colour blob,
 * eyebrow + heading + lede on one side, a soft "see all" link on the other, and a
 * revealed grid as the body.
 */
export function ReferenceSection({
  id,
  eyebrow,
  title,
  lede,
  href,
  linkLabel,
  gridId,
  gridClassName,
  blob,
  eyebrowClassName,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  href: string;
  linkLabel: string;
  gridId: string;
  gridClassName: string;
  /** Areas uses a dimmer eyebrow; everything else keeps the stock one. */
  eyebrowClassName?: string;
  blob?: string;
  children: ReactNode;
}) {
  return (
    <section className={publicSectionClassName} aria-labelledby={id}>
      {blob && (
        <div
          className={`${publicBlobClassName} ${blob} size-72`}
          aria-hidden="true"
        />
      )}
      <div className={`${publicContainerClassName} relative`}>
        <SectionReveal className={referenceRowClassName}>
          <div className="max-w-[62ch]">
            <p className={cn(publicEyebrowClassName, eyebrowClassName)}>
              {eyebrow}
            </p>
            <h2 id={id} className={`${publicH2ClassName} mt-4`}>
              {title}
            </h2>
            <p className={`${publicLeadClassName} mt-4`}>{lede}</p>
          </div>
          <Link
            href={href}
            className={`${publicButtonSoftClassName} home-section-link flex-none`}
          >
            {linkLabel}
            <i className="ph-bold ph-arrow-left" aria-hidden="true" />
          </Link>
        </SectionReveal>
        <ScrollReveal id={gridId} className={gridClassName}>
          {children}
        </ScrollReveal>
      </div>
    </section>
  );
}

export function ReferenceApproach() {
  return approach.map((item) => (
    <li key={item.label}>
      <span className={publicChipClassName}>
        <i
          className={`ph-duotone ${item.icon} text-accent-${item.tone} ${approachAccentColor[item.tone as keyof typeof approachAccentColor]}`}
          aria-hidden="true"
        />
        {item.label}
      </span>
    </li>
  ));
}
export function ReferenceAreas({
  areas,
}: {
  areas: Awaited<ReturnType<typeof listAreas>>;
}) {
  return areas.slice(0, 6).map((area, index) => (
    <Link
      href={`/areas/${area.slug}`}
      className={`${publicRainbowCardClassName} ${publicSpotClassName} group item-col art-area-card flex min-w-0 flex-col ${artCornerClassName} ${artSurfaceClassName}`}
      key={area.slug}
    >
      <span
        className={`${publicIconTileArtClassName} tile-${tones[index % tones.length]} ${publicTileToneClassName(tones[index % tones.length])} ${artIconTileClassName}`}
      >
        <i
          className={`ph-duotone ${areaIcons[index % areaIcons.length]}`}
          aria-hidden="true"
        />
      </span>
      <h3 className={`${publicH3ClassName} mt-5 wrap-break-word`}>
        {area.title}
      </h3>
      <p className="text-muted mt-3 line-clamp-2 text-sm/7 wrap-break-word">
        {area.description}
      </p>
      <span className="text-fg mt-5 inline-flex grow items-center gap-1.5 text-sm font-bold">
        بیشتر بخوانید
        <i className="ph-bold ph-arrow-left" aria-hidden="true" />
      </span>
    </Link>
  ));
}
export function ReferenceFees({
  services,
}: {
  services: Awaited<ReturnType<typeof listServices>>;
}) {
  return services.slice(0, 3).map((service, index) => (
    <article
      key={service.slug}
      className={`${index === 1 ? publicRainbowCardClassName : publicCardClassName} ${publicSpotClassName} group item-col art-fee-card relative flex min-w-0 flex-col ${artCornerClassName} ${artSurfaceClassName}`}
    >
      {index === 1 && (
        <span className="accent-bar absolute inset-s-6 -top-3 rounded-full [background-image:var(--grad-sunset)] px-3 py-1 text-[.6875rem] font-extrabold text-white">
          پیشنهاد من
        </span>
      )}
      <span
        className={`${publicIconTileBaseClassName} tile-${["violet", "teal", "plum"][index]} ${publicTileToneClassName(["violet", "teal", "plum"][index])} size-14 text-[1.75rem] ${artIconTileClassName}`}
      >
        <i className="ph-duotone ph-chats-circle" aria-hidden="true" />
      </span>
      <h3 className={`${publicH3ClassName} mt-5 wrap-break-word`}>
        {service.name}
      </h3>
      <p className="text-muted mt-2 text-xs font-extrabold tracking-wide">
        {service.duration} دقیقه
      </p>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold wrap-break-word">
          {formatNumber(service.price)}
        </span>
        <span className="text-muted text-sm">تومان</span>
      </p>
      <p className="text-muted mt-4 text-sm/7 wrap-break-word">
        {service.features[0]}
      </p>
      <ul className="mt-5 flex flex-col gap-2.5">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="text-muted flex items-start gap-2 text-sm"
          >
            <i
              className="ph-bold ph-check-circle text-accent-teal mt-0.5 text-[1.05rem] text-(--c-teal)"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Link href="/book" className={`${publicButtonPrimaryClassName} w-full`}>
          انتخاب زمان جلسه
        </Link>
      </div>
    </article>
  ));
}
export function ReferenceFaq({
  faqs,
}: {
  faqs: Awaited<ReturnType<typeof listFaqs>>;
}) {
  const items = faqs.flatMap((group) => group.questions).slice(0, 6);
  return <FaqAccordion items={items} home />;
}
