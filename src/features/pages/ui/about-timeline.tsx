import * as m from "motion/react-client";
import { motionTiming, sectionEntrance } from "@/lib/motion-tokens";
import {
  GraduationCap,
  HeartPulse,
  UsersRound,
  MonitorSmartphone,
} from "lucide-react";

const milestones = [
  {
    icon: GraduationCap,
    title: "تحصیل در روان‌شناسی بالینی",
    body: "پایه‌ی نظری و بالینی؛ یادگیری این که هر مداخله، چه زمانی به کار می‌آید.",
    label: "پایه و یادگیری",
    tone: "indigo",
  },
  {
    icon: HeartPulse,
    title: "کار با بزرگسالان در حوزه‌ی اضطراب و افسردگی",
    body: "سال‌ها تجربه‌ی جلسه‌های فردی؛ یاد گرفتن این که هر اضطرابی، صورت متفاوتی دارد.",
    label: "گوش‌دادن و همراهی",
    tone: "teal",
  },
  {
    icon: UsersRound,
    title: "تخصص در مشاوره‌ی زوج و خانواده",
    body: "کار با رابطه‌ها؛ جایی که فهمیدن، مقدم بر حل کردن است.",
    label: "رابطه و خانواده",
    tone: "rose",
  },
  {
    icon: MonitorSmartphone,
    title: "همکاری با مراجعان در قالب آنلاین و حضوری",
    body: "امروز هم آنلاین و هم حضوری در خدمت مراجعان هستم، با همان دقت و همان آرامش.",
    label: "امروز و ادامهٔ راه",
    tone: "amber",
  },
] as const;

const milestoneTone = {
  indigo: "[--milestone:var(--c-indigo)]",
  teal: "[--milestone:var(--c-teal)]",
  rose: "[--milestone:var(--c-rose)]",
  amber: "[--milestone:var(--c-amber)]",
} as const;

const journeyLineClassName =
  "pointer-events-none absolute inset-y-[1.3rem] start-[22px] w-[3px] rounded-[99px] max-[400.02px]:start-4";
const milestoneCardClassName =
  "about-milestone-card relative isolate rounded-[24px] border transition-[border-color,box-shadow,background-color] duration-[250ms] ease-[ease] motion-reduce:[transition:none]! border-[var(--line)] bg-[color:color-mix(in_srgb,var(--milestone)_3%,var(--surface))] p-[clamp(1rem,2.5vw,1.55rem)] [box-shadow:var(--shadow-soft)] before:absolute before:inset-y-[1.2rem] before:start-0 before:w-1 before:rounded-[4px_0_0_4px] before:bg-[var(--milestone)] before:content-[''] group-hover/milestone:border-[color:color-mix(in_srgb,var(--milestone)_42%,var(--line))] group-hover/milestone:bg-[color:color-mix(in_srgb,var(--milestone)_6%,var(--surface))] group-hover/milestone:[box-shadow:var(--shadow-lift)]";

const labelTone = {
  indigo: "text-[#4e4289] dark:text-[#c8baff]",
  teal: "text-[#086b61] dark:text-[#8de0d2]",
  rose: "text-[#9c334e] dark:text-[#ffb5c6]",
  amber: "text-[#80531e] dark:text-[#f5cb86]",
} as const;

export function AboutTimeline() {
  return (
    <div className="about-journey-shell relative min-w-0">
      <span
        className={`about-journey-track ${journeyLineClassName} bg-[color-mix(in_srgb,var(--c-indigo)_22%,var(--line))]`}
        aria-hidden="true"
      />
      <span
        className={`about-journey-progress ${journeyLineClassName} origin-top bg-[linear-gradient(180deg,var(--c-indigo),var(--c-teal),var(--c-rose),var(--c-amber))] [box-shadow:0_0_16px_color-mix(in_srgb,var(--c-teal)_40%,transparent)]`}
        aria-hidden="true"
      />
      <ol
        className="about-journey-timeline m-0 grid list-none gap-4 p-0"
        aria-label="مسیر حرفه‌ای"
      >
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          return (
            <m.li
              className={`about-milestone group/milestone relative min-w-0 ps-16 max-[400.02px]:ps-[3.2rem] ${milestoneTone[milestone.tone]} motion-reduce:transform-none! motion-reduce:opacity-100!`}
              key={milestone.title}
              initial="initial"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={sectionEntrance}
              transition={{ ...motionTiming.standard, delay: index * 0.06 }}
            >
              <span
                className="about-milestone-node absolute inset-s-[14px] top-[2.2rem] z-1 size-[19px] rounded-[50%] border-4 border-(--milestone) bg-(--surface) [box-shadow:0_0_0_6px_color-mix(in_srgb,var(--milestone)_14%,transparent)] max-[400.02px]:inset-s-2"
                aria-hidden="true"
              />
              <div className={milestoneCardClassName}>
                <div className="about-milestone-heading flex items-center justify-between gap-4">
                  <span
                    className="about-milestone-icon grid size-[46px] place-items-center rounded-[15px] bg-[color-mix(in_srgb,var(--milestone)_13%,var(--surface))] text-(--milestone) motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:translate-y-[-3px]"
                    aria-hidden="true"
                  >
                    <Icon size={23} strokeWidth={1.85} />
                  </span>
                  <span
                    className="about-milestone-index text-[1.1rem] font-black text-(--milestone) tabular-nums"
                    aria-hidden="true"
                  >
                    {new Intl.NumberFormat("fa-IR", {
                      minimumIntegerDigits: 2,
                    }).format(index + 1)}
                  </span>
                </div>
                <p
                  className={`mt-[.85rem] text-[.78rem] font-[850] ${labelTone[milestone.tone]}`}
                >
                  {milestone.label}
                </p>
                <h3 className="mt-[.35rem] text-[clamp(1.02rem,1.9vw,1.22rem)] leading-[1.6] font-[850]">
                  {milestone.title}
                </h3>
                <p className="about-milestone-body mt-[.6rem] text-[.9rem] leading-[1.95] text-(--muted)">
                  {milestone.body}
                </p>
              </div>
            </m.li>
          );
        })}
      </ol>
    </div>
  );
}
