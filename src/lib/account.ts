import { z } from "zod";
import { authClient } from "./auth-client";
import { getMessage, passwordChangeSchema, profileSchema, signInSchema, signUpSchema } from "./auth";
import { resultCodes } from "./constants";
import { getInvalid, type Failure, type Result } from "./result";

const errorSchema = z.object({ status: z.number().optional(), code: z.string().optional(), fieldErrors: z.record(z.string(), z.array(z.string())).optional() });

function readFailure(error: unknown): Failure {
  const parsed = errorSchema.safeParse(error);
  const value = parsed.success ? parsed.data : null;
  const code = value?.status === 429 ? resultCodes.limited : value?.status === 401 ? resultCodes.unauthorized : value?.status === 403 ? resultCodes.forbidden : (value?.status === 400 || value?.status === 422) ? resultCodes.invalid : resultCodes.unavailable;
  return { isSuccess: false, code, message: value ? getMessage(value) : "نتیجهٔ درخواست تأیید نشد؛ اتصال و وضعیت حساب را پیش از تکرار بررسی کنید.", fieldErrors: value?.fieldErrors ?? (value?.code === "INVALID_PASSWORD" ? { currentPassword: ["رمز فعلی درست نیست."] } : {}) };
}

async function sendAccount<S extends z.ZodType>(schema: S, input: unknown, operation: (value: z.output<S>) => Promise<{ error: unknown }>, isLogin = false): Promise<Result<null, Extract<keyof z.output<S>, string>>> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return getInvalid(parsed.error);
  try {
    const response = await operation(parsed.data);
    if (response.error) return readFailure(response.error);
    if (isLogin) {
      const verified = await authClient.getSession();
      if (verified.error || !verified.data?.user) return { ...readFailure(verified.error), message: "نشست تأیید نشد؛ اتصال یا تنظیمات کوکی را بررسی کنید." };
    }
    // Do not return native password/session tokens to form state.
    return { isSuccess: true, value: null, message: "درخواست تأیید شد." };
  } catch { return readFailure(null); }
}

export async function createAccount(input: unknown) {
  return sendAccount(signUpSchema, input, (value) => authClient.signUp.email(value), true);
}
export async function loginAccount(input: unknown) {
  return sendAccount(signInSchema, input, (value) => authClient.signIn.email(value), true);
}
export async function updateProfile(input: unknown) {
  // The validated object includes phone. The native SDK forwards additional
  // body fields; the server whitelist/phone validator remains authoritative.
  return sendAccount(profileSchema, input, (value) => authClient.updateUser(value));
}
export async function changePassword(input: unknown) {
  return sendAccount(passwordChangeSchema, input, (value) => authClient.changePassword({ ...value, revokeOtherSessions: true }));
}
export async function logoutAccount(): Promise<Result<null>> {
  try {
    const response = await authClient.signOut();
    return response.error ? readFailure(response.error) : { isSuccess: true, value: null, message: "از حساب خارج شدید." };
  } catch { return readFailure(null); }
}
