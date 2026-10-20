import { z } from "zod";
import { assessment } from "@/validations/models";

export const assessmentsInput = z.object({
  slug: assessment.shape.slug,
  answers: z.array(z.number().int().min(0).max(10)),
});

export function parseAssessmentSubmission(form: FormData) {
  try {
    const answers: unknown = JSON.parse(String(form.get("answers")));
    return assessmentsInput.safeParse({ slug: form.get("slug"), answers });
  } catch {
    return null;
  }
}
