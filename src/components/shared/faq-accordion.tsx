"use client";

import { publicCardClassName } from "@/components/layout/public-styles";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

/**
 * The accordion appears twice: bare on the home strip, framed on the FAQ page.
 * One flag picks the skin; the shared behaviour lives in the base string.
 */
const triggerClass = (home: boolean) =>
  `group faq-accordion-trigger flex w-full cursor-pointer items-center justify-between gap-4 text-start text-(--fg) motion-safe:transition-colors motion-safe:duration-220 ${
    home
      ? "faq-trigger min-h-14 border-0 bg-none py-[.35rem] text-base leading-[inherit] font-bold hover:text-(--c-teal)! data-[state=open]:text-(--c-teal)!"
      : "site-faq-trigger min-h-16 px-[1.1rem] py-[.7rem] leading-[1.8] font-[750] hover:text-[#176c65] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-(--c-teal) data-[state=open]:text-[#176c65] max-[600px]:min-h-[62px] max-[600px]:px-[.9rem] dark:hover:text-[#8de0d2] dark:data-[state=open]:text-[#8de0d2]"
  }`;

const chevronClass = (home: boolean) =>
  `faq-accordion-chevron shrink-0 group-data-[state=open]:rotate-180 motion-safe:transition-transform motion-safe:duration-360 motion-safe:ease-[cubic-bezier(.22,1,.36,1)] ${
    home
      ? ""
      : "size-[33px] rounded-[10px] bg-[color-mix(in_srgb,var(--c-teal)_8%,var(--site-surface))] p-[7px] text-(--site-ink)"
  }`;

const answerClass = (home: boolean) =>
  home
    ? "text-muted px-0 pt-3 pb-[.3rem] text-sm leading-8 break-words"
    : "max-w-[70ch] px-[1.1rem] pt-[.1rem] pb-[1.2rem] leading-8 break-words text-(--site-muted)";

export function FaqAccordion({
  items,
  home = false,
}: {
  items: { question: string; answer: string }[];
  home?: boolean;
}) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      dir="rtl"
      className={
        home ? "faq-accordion grid gap-3" : "faq-accordion grid gap-[.7rem]"
      }
    >
      {items.map((item, index) => (
        <Accordion.Item
          key={item.question}
          value={`faq-${index}`}
          className={
            home
              ? `faq-item ${publicCardClassName} p-5!`
              : "site-faq m-0 rounded-[16px] border border-(--site-line) bg-(--site-surface) p-0 shadow-[0_8px_28px_-25px_color-mix(in_srgb,var(--c-indigo)_45%,transparent)] data-[state=open]:border-[color-mix(in_srgb,var(--c-teal)_35%,var(--site-line))] data-[state=open]:shadow-[0_15px_35px_-29px_color-mix(in_srgb,var(--c-teal)_43%,transparent)] motion-safe:transition-[border-color,box-shadow] motion-safe:duration-200"
          }
        >
          <Accordion.Header className="faq-accordion-heading m-0 font-[inherit]">
            <Accordion.Trigger className={triggerClass(home)}>
              <span className="wrap-break-word">{item.question}</span>
              <ChevronDown
                className={chevronClass(home)}
                size={19}
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="faq-accordion-content data-[state=open]:animate-faq-open data-[state=closed]:animate-faq-close overflow-hidden motion-reduce:animate-none!">
            <div className={answerClass(home)}>{item.answer}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
