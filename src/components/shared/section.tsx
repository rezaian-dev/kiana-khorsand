import {
  siteCardClassName,
  siteContainerClassName,
  siteGridClassName,
  siteHeadingClassName,
} from "@/components/shared/site-styles";
import { ScrollReveal } from "@/components/motion/reveal";
import Image from "next/image";
import { Prose } from "./prose";
import type { SectionData } from "@/types/models";

export function Section({
  section,
  index,
  hideFirstHeading = false,
}: {
  section: SectionData;
  index: number;
  hideFirstHeading?: boolean;
}) {
  const fragments = section.body
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter(Boolean)
    .filter(
      (text) =>
        text !== `## ${section.title}` &&
        text !== `# ${section.title}` &&
        !/^[-•]\s*(خانه|\/)$/.test(text),
    );
  const groups: { heading: string; body: string[] }[] = [];
  const opening: string[] = [];
  for (const fragment of fragments) {
    if (fragment.startsWith("### "))
      groups.push({ heading: fragment.slice(4), body: [] });
    else if (groups.length) groups[groups.length - 1].body.push(fragment);
    else opening.push(fragment);
  }
  const list = opening.filter((fragment) => fragment.startsWith("- "));
  const preface = opening.filter((fragment) => !fragment.startsWith("- "));
  const withArt = Boolean(section.image || groups.length);
  return (
    <section
      className={`site-section editorial-section relative isolate border-t border-[color-mix(in_srgb,var(--site-line)_68%,transparent)] py-[clamp(2.75rem,5vw,5rem)]! max-[600px]:py-10! ${
        index % 2
          ? "bg-[color-mix(in_srgb,var(--c-teal)_3%,var(--site-canvas))] bg-[radial-gradient(ellipse_at_91%_16%,color-mix(in_srgb,#5d9f9a_8%,transparent),transparent_40%),radial-gradient(ellipse_at_7%_85%,color-mix(in_srgb,var(--site-violet)_7%,transparent),transparent_44%)]"
          : ""
      }`}
    >
      <div className={`${siteContainerClassName} relative`}>
        {!withArt && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-e-[clamp(1rem,4vw,4rem)] top-1/2 hidden aspect-square w-[min(28vw,330px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--c-teal)_13%,var(--site-surface))_0_19%,transparent_19.5%),repeating-radial-gradient(circle_at_50%_50%,transparent_0_24px,color-mix(in_srgb,var(--c-teal)_13%,transparent)_25px_26px,transparent_27px_47px)] min-[960px]:block"
          />
        )}
        <ScrollReveal
          className={`site-section-inner grid items-start! gap-[clamp(1.5rem,5vw,4rem)] ${
            section.image
              ? "grid-cols-[minmax(0,1fr)_minmax(220px,.75fr)] max-[767.02px]:grid-cols-1"
              : "grid-cols-1"
          }`}
        >
          <div
            className={`site-section-copy relative min-w-0 flex-1 border-s-2 border-[color-mix(in_srgb,var(--c-teal)_32%,var(--site-line))] ps-[clamp(1.15rem,2.2vw,2rem)] max-[600px]:ps-[1.05rem] ${
              section.image ? "" : "max-w-[80ch]"
            }`}
          >
            <div
              className="mb-[clamp(1rem,2.5vw,1.4rem)] flex w-fit items-center gap-[.8rem] text-[.88rem] leading-none font-extrabold tracking-[.06em] text-[#176c65] dark:text-(--c-teal)"
              aria-hidden="true"
            >
              <span>
                {new Intl.NumberFormat("fa-IR", {
                  minimumIntegerDigits: 2,
                }).format(index + 1)}
              </span>
              <span className="block h-[2px] w-[2.3rem] bg-current opacity-55" />
            </div>
            <h2
              className={
                index === 0 && hideFirstHeading
                  ? "sr-only"
                  : `${siteHeadingClassName} mb-4! max-w-[31ch]! text-[clamp(1.4rem,2.35vw,2.05rem)]! leading-[1.55]! text-balance`
              }
            >
              {section.title}
            </h2>
            {preface.length > 0 && (
              <Prose
                body={preface.join("\n\n")}
                className={`text-[clamp(.99rem,1.15vw,1.06rem)] leading-[2.05]! text-(--site-muted) [&>p:first-child]:mt-0 ${
                  index === 0 ? "text-[clamp(1.04rem,1.35vw,1.14rem)]!" : ""
                }`}
              />
            )}
            {list.length > 0 && (
              <ul className="site-pills mt-[1.4rem]! flex list-none flex-wrap gap-[.6rem]! p-0">
                {list.map((item) => (
                  <li
                    className="inline-flex min-h-[2.6rem] items-center gap-[.55rem] rounded-[999px] border border-[color-mix(in_srgb,var(--c-teal)_18%,var(--site-line))]! bg-[color-mix(in_srgb,var(--c-teal)_4%,var(--site-surface))]! px-[.85rem]! py-[.45rem]! text-[.93rem] leading-[1.6] font-[650] wrap-break-word text-(--site-ink) before:size-[.38rem] before:shrink-0 before:rounded-full before:bg-(--c-teal) before:content-['']"
                    key={item}
                  >
                    {item.slice(2)}
                  </li>
                ))}
              </ul>
            )}
            {section.items.length > 0 && (
              <ul className="site-points mt-[1.4rem]! grid list-none! grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-[.7rem]! p-0!">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="relative min-w-0 rounded-[14px] border border-(--site-line) bg-(--site-surface) py-[.8rem] ps-8 pe-4 leading-[1.8] wrap-break-word before:absolute before:inset-s-[.95rem] before:top-6 before:size-[.42rem] before:rounded-full before:bg-(--c-teal) before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {section.image && (
            <Image
              src={section.image}
              width={520}
              height={420}
              alt={section.title}
              className="site-section-image aspect-5/4 h-auto max-h-[390px]! w-full rounded-[75px_22px_75px_22px]! border-[5px] border-(--site-surface) object-cover shadow-(--shadow-soft) max-[600px]:max-h-[280px]! max-[600px]:rounded-[55px_18px_55px_18px]!"
            />
          )}
        </ScrollReveal>
        {groups.length > 0 && (
          <ScrollReveal
            className={`${siteGridClassName} site-section-cards mt-[clamp(1.5rem,3vw,2.5rem)]! grid-cols-3! gap-4! py-0! max-[850px]:grid-cols-2! max-[600px]:grid-cols-1!`}
          >
            {groups.map((group, position) => (
              <article
                className={`${siteCardClassName} relative gap-[.55rem]! overflow-hidden border-[color-mix(in_srgb,var(--c-teal)_13%,var(--site-line))]! bg-(--site-surface)! p-[clamp(1.15rem,2.4vw,1.7rem)]! transition-none! before:absolute before:inset-y-[1.35rem] before:inset-s-0 before:w-[3px] before:rounded-[5px] before:content-[''] ${
                  position % 3 === 1
                    ? "before:bg-(--c-violet)"
                    : position % 3 === 2
                      ? "before:bg-(--c-plum)"
                      : "before:bg-(--c-teal)"
                }`}
                key={group.heading}
              >
                <h3 className="mb-1! text-[clamp(1.06rem,1.4vw,1.22rem)]! leading-[1.6]! text-balance">
                  {group.heading}
                </h3>
                <Prose
                  body={group.body.join("\n\n")}
                  className="text-[.96rem] leading-[1.9]!"
                />
              </article>
            ))}
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
