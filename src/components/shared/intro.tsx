import { siteContainerClassName } from "@/components/shared/public-layout-classes";
import Image from "next/image";
import {
  BookOpenText,
  HeartHandshake,
  Route,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { SiteBreadcrumb } from "@/components/shared/site-breadcrumb";

type Story = "journal" | "fees" | "path" | "gather";
const stories: Record<
  Story,
  { image: string; eyebrow: string; note: string; Icon: LucideIcon }
> = {
  journal: {
    image: "/assets/images/intro-journal.jpg",
    eyebrow: "یادداشت‌هایی برای روشن‌تر دیدن",
    note: "جایی برای خواندن و مکث کردن",
    Icon: BookOpenText,
  },
  fees: {
    image: "/assets/images/intro-fees.jpg",
    eyebrow: "پیش از شروع، با آگاهی انتخاب کنید",
    note: "شفاف، روشن و قابل‌پیگیری",
    Icon: ShieldCheck,
  },
  path: {
    image: "/assets/images/intro-path.jpg",
    eyebrow: "راهی که با گفت‌وگو شروع می‌شود",
    note: "قدم بعدی را با هم پیدا می‌کنیم",
    Icon: Route,
  },
  gather: {
    image: "/assets/images/intro-gather.jpg",
    eyebrow: "در کنار هم، بی‌قضاوت",
    note: "فرصتی برای گفت‌وگوی واقعی",
    Icon: HeartHandshake,
  },
};

// Editorial geometry lives with the shared Server Component; selectors no longer
// depend on the page's CSS import order. Breakpoints match the original 760/480px.
const skin = {
  layout: `${siteContainerClassName} site-intro-layout relative grid grid-cols-[minmax(0,1.04fr)_minmax(0,.96fr)] items-center gap-[clamp(1.6rem,5vw,5rem)] max-[760.02px]:grid-cols-1 max-[480.02px]:gap-[1.3rem]`,
  copy: "site-intro-copy min-w-0 py-[.4rem]",
  breadcrumb: "mb-[clamp(1.35rem,3vw,2rem)]! flex! w-fit!",
  eyebrow:
    "site-intro-eyebrow inline-flex min-h-9 items-center gap-[.55rem] rounded-[999px] border border-[color:color-mix(in_srgb,var(--intro-tint)_25%,var(--site-line))] bg-[color:color-mix(in_srgb,var(--intro-tint)_9%,var(--site-surface))] px-[.8rem] py-[.35rem] text-[.8rem] font-extrabold text-[color:color-mix(in_srgb,var(--intro-tint)_58%,var(--site-ink))] dark:text-[#e0f4ee] [&_svg]:flex-none",
  title:
    "mt-[.9rem] max-w-[22ch] text-[clamp(2rem,4.15vw,3.55rem)] leading-[1.47] font-black tracking-[-.035em] text-balance max-[760.02px]:max-w-[25ch] max-[480.02px]:text-[clamp(1.9rem,8vw,2.35rem)]",
  description:
    "mt-[1.1rem] max-w-[54ch] text-[clamp(.93rem,1.3vw,1.06rem)] leading-[2] text-[var(--site-muted)] max-[480.02px]:text-[.9rem]",
  actions: "site-intro-actions mt-[1.65rem] flex flex-wrap gap-3",
  rule: "site-intro-rule mt-6 block h-[3px] w-[68px] rounded-[3px] [background:linear-gradient(90deg,var(--intro-tint),color-mix(in_srgb,var(--site-violet)_60%,var(--intro-tint)))]",
  art: "site-intro-art relative min-w-0 p-[.65rem_.65rem_1.05rem_1.05rem] before:pointer-events-none before:absolute before:[inset:0_.8rem_.5rem_0] before:rounded-[132px_32px_32px_32px] before:border before:border-[color:color-mix(in_srgb,var(--intro-tint)_23%,var(--site-line))] before:[transform:rotate(-3deg)] before:content-[''] max-[760.02px]:mx-auto max-[760.02px]:w-full max-[760.02px]:max-w-[560px] max-[760.02px]:before:rounded-[84px_23px_23px_23px] max-[480.02px]:p-[.35rem_.4rem_1rem_.7rem]",
  photo:
    "site-intro-photo relative h-[clamp(285px,29vw,415px)] overflow-hidden rounded-[132px_30px_30px_30px] border-[6px] border-solid border-[color:color-mix(in_srgb,var(--site-surface)_86%,transparent)] [box-shadow:0_30px_56px_-38px_color-mix(in_srgb,var(--intro-tint)_58%,#27394b)] max-[760.02px]:h-[clamp(205px,54vw,310px)] max-[760.02px]:rounded-[84px_23px_23px_23px] max-[480.02px]:h-[200px]",
  image:
    "site-intro-image h-full w-full max-w-full rounded-none object-cover object-center [box-shadow:none] [outline:0] [outline-offset:-8px] [aspect-ratio:auto]",
  caption:
    "site-intro-caption absolute bottom-0 start-0 flex min-h-14 max-w-[calc(100%-1rem)] items-center gap-[.65rem] rounded-[15px] border border-[color:color-mix(in_srgb,var(--site-line)_80%,white)] bg-[var(--site-surface)] px-[.85rem] py-[.55rem] text-[.83rem] font-extrabold text-[var(--site-ink)] [box-shadow:0_14px_32px_-22px_#132e3a] max-[480.02px]:min-h-[49px] max-[480.02px]:text-[.75rem]",
  captionIcon:
    "site-intro-caption-icon grid size-9 flex-none place-items-center rounded-[11px] bg-[color:color-mix(in_srgb,var(--intro-tint)_15%,var(--site-surface))] text-[color:color-mix(in_srgb,var(--intro-tint)_80%,var(--site-ink))] dark:text-[#cceee7] max-[480.02px]:size-[31px]",
} as const;

const storyTint = {
  journal: "[--intro-tint:#9476aa]",
  fees: "[--intro-tint:#238e89]",
  path: "[--intro-tint:#4c9e85]",
  gather: "[--intro-tint:#ad7592]",
} as const satisfies Record<Story, string>;

const rootSkin =
  "relative isolate overflow-hidden px-0 pt-[clamp(2.2rem,4.8vw,4.2rem)] pb-[clamp(2.6rem,4.8vw,4.1rem)] [background:radial-gradient(circle_at_91%_12%,color-mix(in_srgb,var(--intro-tint)_11%,transparent),transparent_37%),radial-gradient(circle_at_9%_87%,color-mix(in_srgb,var(--site-violet)_12%,transparent),transparent_38%),linear-gradient(155deg,var(--site-canvas),color-mix(in_srgb,var(--site-surface)_68%,var(--site-canvas)))] before:pointer-events-none before:absolute before:top-[-13rem] before:start-[-12rem] before:end-[-9%] before:bottom-[-43%] before:-z-1 before:aspect-square before:size-[29rem] before:rounded-[50%] before:border before:border-[color:color-mix(in_srgb,var(--c-teal)_13%,transparent)] before:[box-shadow:0_0_0_25px_color-mix(in_srgb,var(--c-teal)_3%,transparent),0_0_0_78px_color-mix(in_srgb,var(--c-plum)_3%,transparent)] before:content-[''] max-[620.02px]:before:top-[-11rem] max-[620.02px]:before:start-[-10rem] max-[620.02px]:before:size-[20rem] max-[480.02px]:pt-[1.8rem] max-[480.02px]:pb-[2.1rem]";

export function Intro({
  title,
  description,
  image,
  children,
  parent,
  story = "path",
}: {
  title: string;
  description?: string;
  image?: string | null;
  children?: React.ReactNode;
  parent?: { label: string; href: string };
  story?: Story;
}) {
  const visual = stories[story];
  return (
    <section
      className={`site-intro site-intro-editorial ${storyTint[story]} ${rootSkin}`}
    >
      <div className={skin.layout}>
        <div className={skin.copy}>
          <SiteBreadcrumb
            current={title}
            parent={parent}
            className={skin.breadcrumb}
          />
          <div className={skin.eyebrow}>
            <visual.Icon size={17} aria-hidden="true" />
            {visual.eyebrow}
          </div>
          <h1 className={skin.title}>{title}</h1>
          {description && <p className={skin.description}>{description}</p>}
          {children && <div className={skin.actions}>{children}</div>}
          <span className={skin.rule} aria-hidden="true" />
        </div>
        <div className={skin.art}>
          <div className={skin.photo}>
            <Image
              src={image || visual.image}
              unoptimized={Boolean(image?.startsWith("/api/article-covers/"))}
              width={740}
              height={500}
              sizes="(max-width: 760px) 100vw, 43vw"
              priority
              alt=""
              className={skin.image}
            />
          </div>
          <div className={skin.caption}>
            <span className={skin.captionIcon}>
              <visual.Icon size={18} aria-hidden="true" />
            </span>
            <span>{visual.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
