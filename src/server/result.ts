import "server-only";
import { MongoServerError } from "mongodb";
import { z } from "zod";
import { AccessError } from "./session";
import { resultCodes } from "../lib/constants";
import { getInvalid, type Failure, type Result, type ResultCode, type Slot } from "../lib/result";

export class MutationError extends Error {
  constructor(readonly code: ResultCode, message: string, readonly fieldErrors: Record<string, string[]> = {}, readonly alternatives?: Slot[]) {
    super(message); this.name = "MutationError";
  }
}

export function getFailure(error: unknown): Failure {
  if (error instanceof AccessError) return { isSuccess: false, code: error.code, message: error.message, fieldErrors: {} };
  if (error instanceof MutationError) return { isSuccess: false, code: error.code, message: error.message, fieldErrors: error.fieldErrors, ...(error.alternatives ? { alternatives: error.alternatives } : {}) };
  if (error instanceof z.ZodError) return getInvalid(error);
  if (error instanceof MongoServerError && error.code === 11000) return { isSuccess: false, code: resultCodes.conflict, message: "این مقدار قبلاً ثبت شده است؛ نسخهٔ تازه را بررسی کنید.", fieldErrors: {} };
  return { isSuccess: false, code: resultCodes.unavailable, message: "نتیجهٔ درخواست تأیید نشد؛ پیش از تکرار، وضعیت تازه را بررسی کنید.", fieldErrors: {} };
}

export async function runAction<S extends z.ZodType, Value>(schema: S, input: unknown, operation: (value: z.output<S>) => Promise<Value>): Promise<Result<Value, Extract<keyof z.output<S>, string>>> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return getInvalid(parsed.error);
  try { return { isSuccess: true, value: await operation(parsed.data), message: "تغییرات ثبت شد." }; }
  catch (error) { return getFailure(error); }
}


export function requireWrite(result: { acknowledged: boolean }) {
  if (!result.acknowledged) throw new MutationError(resultCodes.unavailable, "تأیید ذخیره از پایگاه‌داده دریافت نشد؛ پیش از تکرار، وضعیت تازه را بررسی کنید.");
}
