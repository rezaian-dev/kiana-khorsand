"use client";

import {
  siteDetailClassName,
  siteHeadingClassName,
} from "@/components/shared/public-layout-classes";

import { useActionState, useState } from "react";
import { CircleCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { motionTiming } from "@/lib/motion-tokens";
import type { Model } from "@/types/models";
import { submitAssessment } from "@/actions/assessments";
import type { AssessmentState } from "@/types/assessments";
import { formatNumber } from "@/lib/format";
import { labels } from "@/lib/labels";

const initial: AssessmentState = {
  score: null,
  band: "",
  interpretation: "",
  error: "",
};
export function Quiz({ definition }: { definition: Model["assessments"] }) {
  const [state, action, pending] = useActionState(submitAssessment, initial);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const [answers, setAnswers] = useState<Array<number | null>>(() =>
    Array(definition.questions.length).fill(null),
  );
  const question = definition.questions[index];
  if (!question) return null;
  const completed = answers.every((answer) => answer !== null);
  return (
    <div
      className={`${siteDetailClassName} site-quiz relative overflow-hidden`}
    >
      {state.score !== null ? (
        <section
          className="grid gap-[.9rem] [&>p:last-child]:leading-[2] [&>p:last-child]:text-[var(--site-muted)]"
          aria-live="polite"
        >
          <span className="grid size-12 place-items-center rounded-[14px] bg-[color:color-mix(in_srgb,#389587_13%,var(--site-surface))] text-[#247c75]">
            <CircleCheck size={25} aria-hidden="true" />
          </span>
          <h2 className={`${siteHeadingClassName} mb-0`}>{labels.result}</h2>
          <p className="justify-self-start rounded-[10px] bg-[color:color-mix(in_srgb,#389587_10%,var(--site-surface))] px-[.8rem] py-[.55rem] font-[850] text-[var(--site-ink)]">
            {state.band} · {formatNumber(state.score)}
          </p>
          <p>{state.interpretation}</p>
        </section>
      ) : (
        <>
          <div className="mb-6 grid gap-3">
            <span className="text-[.86rem] font-[850] text-[#216f69] dark:text-[#a6e4d7]">
              پرسش {formatNumber(index + 1)} از{" "}
              {formatNumber(definition.questions.length)}
            </span>
            <span
              className="block h-2 w-full overflow-hidden rounded-full bg-[color:color-mix(in_srgb,#418e86_14%,var(--site-surface))]"
              role="progressbar"
              aria-label="پیشرفت پرسشنامه"
              aria-valuemin={1}
              aria-valuemax={definition.questions.length}
              aria-valuenow={index + 1}
              aria-valuetext={`${formatNumber(index + 1)} از ${formatNumber(definition.questions.length)} پرسش`}
            >
              <motion.span
                className="block h-full rounded-[inherit] [background-image:linear-gradient(90deg,#247c78,#7865a0)]"
                initial={false}
                animate={{
                  width: `${((index + 1) / definition.questions.length) * 100}%`,
                }}
                transition={reduce ? { duration: 0 } : motionTiming.standard}
              />
            </span>
          </div>
          <fieldset className="site-quiz-question m-0 min-w-0 border-0 p-0">
            <legend className="mb-5 max-w-full text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.75] font-[850] text-[var(--site-ink)]">
              {question.prompt}
            </legend>
            {question.options.map((option) => (
              <label
                key={option.value}
                className="my-[.55rem] flex min-h-[58px] cursor-pointer items-center gap-3 rounded-[14px] border border-[color:color-mix(in_srgb,#367e83_15%,var(--site-line))] bg-[var(--site-surface)] px-4 py-[.8rem] text-[.94rem] leading-[1.7] text-[var(--site-ink)] focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-[#2b827c] hover:border-[#358980] hover:bg-[color:color-mix(in_srgb,#468f83_6%,var(--site-surface))] has-checked:border-[#257c75] has-checked:bg-[color:color-mix(in_srgb,#3a9588_12%,var(--site-surface))] has-checked:font-extrabold"
              >
                <input
                  className="m-0 size-[19px] shrink-0 accent-[#247c75]"
                  type="radio"
                  name={`answer-${index}`}
                  checked={answers[index] === option.value}
                  onChange={() =>
                    setAnswers((old) =>
                      old.map((answer, position) =>
                        position === index ? option.value : answer,
                      ),
                    )
                  }
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          <div className="mt-6 flex flex-wrap justify-between gap-[.8rem] max-[560px]:[&>button]:flex-1 max-[560px]:[&>form]:flex-1 max-[560px]:[&>form>button]:w-full">
            {index > 0 && (
              <button
                type="button"
                className="site-button site-button-secondary min-h-[46px] min-w-[110px]"
                onClick={() => setIndex(index - 1)}
              >
                قبلی
              </button>
            )}
            {index < definition.questions.length - 1 ? (
              <button
                type="button"
                className="site-button min-h-[46px] min-w-[110px]"
                disabled={answers[index] === null}
                onClick={() => setIndex(index + 1)}
              >
                بعدی
              </button>
            ) : (
              <form action={action}>
                <input name="slug" type="hidden" value={definition.slug} />
                <input
                  name="answers"
                  type="hidden"
                  value={JSON.stringify(answers)}
                />
                <button
                  type="submit"
                  disabled={!completed || pending}
                  className="site-button min-h-[46px] min-w-[110px]"
                >
                  {pending ? "در حال ثبت…" : "نمایش نتیجه"}
                </button>
              </form>
            )}
          </div>
          {state.error && (
            <p role="alert" className="site-error">
              {state.error}
            </p>
          )}
        </>
      )}
    </div>
  );
}
