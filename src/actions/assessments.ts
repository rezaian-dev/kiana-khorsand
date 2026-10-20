"use server";

import { parseAssessmentSubmission } from "@/validations/assessments";

import type { AssessmentState } from "@/types/assessments";

import { collection } from "@/db/collections";
import { assessment } from "@/validations/models";
import { getSession } from "@/lib/session";
import { throttle } from "@/lib/throttle";

export async function submitAssessment(
  _previous: AssessmentState,
  form: FormData,
): Promise<AssessmentState> {
  const fallback: AssessmentState = {
    score: null,
    band: "",
    interpretation: "",
    error: "لطفاً همه پاسخ‌ها را بررسی کنید.",
  };
  const parsed = parseAssessmentSubmission(form);
  if (!parsed?.success) return fallback;
  const allowed = await throttle("assessment", 30);
  if (!allowed)
    return {
      ...fallback,
      error: "تعداد درخواست‌ها بیش از حد مجاز است؛ بعداً دوباره تلاش کنید.",
    };
  const session = await getSession();
  const doc = await collection("assessments").findOne({
    slug: parsed.data.slug,
    status: "published",
  });
  if (!doc) return fallback;
  const definition = assessment.parse(doc);
  if (
    definition.questions.length !== parsed.data.answers.length ||
    definition.questions.some(
      (question, index) =>
        !question.options.some(
          (option) => option.value === parsed.data.answers[index],
        ),
    )
  )
    return fallback;
  const score = parsed.data.answers.reduce((total, value) => total + value, 0);
  const band = definition.bands.find(
    (item) => score >= item.min && score <= item.max,
  );
  if (!band) return fallback;
  await collection("results").insertOne({
    userId: session?.user.id ?? null,
    assessmentId: definition.slug,
    answers: parsed.data.answers,
    score,
    band: band.label,
    createdAt: new Date(),
  });
  return {
    score,
    band: band.label,
    interpretation: band.interpretation,
    error: "",
  };
}
