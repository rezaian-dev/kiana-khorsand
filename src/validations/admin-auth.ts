import type { AuthState } from "@/types/auth";
import { normalizePhone } from "./auth";

/**
 * Credentials for the administrator entrance (`/admin/login`).
 *
 * Same shape as the public form — a phone number and a password — but validated
 * separately so the two flows can diverge without one leaking into the other.
 */
export type AdminCredentials = {
  phone: string;
  password: string;
  fields: AuthState["fields"];
};

const PHONE = /^09\d{9}$/;

export function parseAdminCredentials(form: FormData): AdminCredentials {
  const phone = normalizePhone(String(form.get("phone") ?? ""));
  const password = String(form.get("password") ?? "");
  const fields: AuthState["fields"] = {};

  if (!PHONE.test(phone)) fields.phone = "شماره را به‌شکل ۰۹XXXXXXXXX وارد کنید.";
  if (password.length < 8) fields.password = "رمز عبور را کامل وارد کنید.";

  return { phone, password, fields };
}
