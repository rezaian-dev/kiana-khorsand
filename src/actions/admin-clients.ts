"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/session";
import { accountProvisioning } from "@/lib/admin-account";
import { collection } from "@/db/collections";
import { db } from "@/db/client";
import { parseNewClient } from "@/validations/admin-client";
import type { AdminFeedback } from "@/types/admin";

export async function createClientAccount(
  _previous: AdminFeedback,
  form: FormData,
): Promise<AdminFeedback> {
  await requireAdmin();
  const result = parseNewClient(form);
  if (!result.success)
    return {
      error:
        "نام، شماره، رمز حداقل ۱۲ کاراکتری، تکرار رمز و تأیید مجوز را بررسی کنید.",
      success: "",
    };
  const { name, phone, password } = result.data;
  const exists = await collection("users").findOne(
    { username: phone },
    { projection: { _id: 1 } },
  );
  if (exists)
    return { error: "حسابی با این شماره از قبل وجود دارد.", success: "" };
  let id: string;
  try {
    const created = await accountProvisioning.api.signUpEmail({
      body: {
        name,
        username: phone,
        email: `${phone}@accounts.kianakhorsand.invalid`,
        password,
      },
    });
    if (!created?.user?.id) throw new Error("Account not created");
    id = created.user.id;
  } catch {
    return {
      error: "ایجاد حساب انجام نشد؛ شماره یا وضعیت اتصال را بررسی کنید.",
      success: "",
    };
  }
  // A provisioning sign-up creates an unused session internally; no cookie is sent
  // to the admin, and we revoke that unused session as defense in depth.
  try {
    await db.collection("sessions").deleteMany({ userId: new ObjectId(id) });
  } catch {
    /* No bearer token escaped this server action. */
  }
  revalidatePath("/admin/clients");
  revalidatePath("/admin");
  return {
    error: "",
    success:
      "حساب مراجع ایجاد شد. اطلاعات ورود را فقط از مسیر امن به خود مراجع برسانید.",
    id,
  };
}
