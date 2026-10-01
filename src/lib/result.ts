import { z } from "zod";
import { resultCodes } from "./constants";

export type ResultCode = (typeof resultCodes)[keyof typeof resultCodes];
export type Slot = { date: string; slot: string; startsAt: string; endsAt: string; scheduleRevision: number };
export type Receipt = { id: string; revision: number };
export type Failure<Field extends string = string> = {
  isSuccess: false; code: ResultCode; message: string;
  fieldErrors: Partial<Record<Field, string[]>>; alternatives?: Slot[];
};
export type Result<Value, Field extends string = string> = { isSuccess: true; value: Value; message: string } | Failure<Field>;

export function getFields<T>(error: z.ZodError<T>) {
  // Never echo submitted values or an English library exception into Persian UI.
  return z.flattenError(error, (issue) => /[\u0600-\u06ff]/.test(issue.message) ? issue.message : "مقدار این بخش معتبر نیست؛ آن را بررسی کنید.").fieldErrors;
}

export function getInvalid<T>(error: z.ZodError<T>): Failure<Extract<keyof T, string>> {
  return { isSuccess: false, code: resultCodes.invalid, message: "فیلدهای مشخص‌شده را بررسی کنید.", fieldErrors: getFields(error) };
}
