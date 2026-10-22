"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { collection } from "@/db/collections";
import { db } from "@/db/client";
import { getSession } from "@/lib/session";
import type { UserActionResult } from "./types";

/**
 * Mutations for the user directory: promote, demote, delete.
 *
 * Every action repeats the authorisation check itself instead of trusting the page
 * that rendered the button, and returns a message instead of throwing so the client
 * can show a toast without a full-page error:
 * OWASP ASVS V4 (access control is enforced per request):
 * https://owasp.org/www-project-application-security-verification-standard/
 */

const DENIED: UserActionResult = {
  ok: false,
  message: "دسترسی مدیریت لازم است.",
};

async function currentAdminId() {
  const session = await getSession();
  return session?.user.role === "admin" ? session.user.id : null;
}

const isLastAdmin = async () => (await collection("users").countDocuments({ role: "admin" })) <= 1;

function refresh() {
  revalidatePath("/admin/users");
  revalidatePath("/admin/clients");
  revalidatePath("/admin");
}

export async function setUserRole(
  userId: string,
  role: "user" | "admin",
): Promise<UserActionResult> {
  const adminId = await currentAdminId();
  if (!adminId) return DENIED;
  if (role !== "admin" && role !== "user") return { ok: false, message: "نقش نامعتبر است." };
  if (!ObjectId.isValid(userId)) return { ok: false, message: "کاربر یافت نشد." };
  if (userId === adminId)
    return {
      ok: false,
      message: "نقش حساب خودتان را از همین‌جا تغییر ندهید.",
    };

  const target = await collection("users").findOne(
    { _id: new ObjectId(userId) },
    { projection: { role: 1 } },
  );
  if (!target) return { ok: false, message: "کاربر یافت نشد." };
  if (target.role === role) return { ok: true, message: "نقش این حساب از قبل همین بود." };
  if (target.role === "admin" && (await isLastAdmin()))
    return { ok: false, message: "دست‌کم یک مدیر باید در سایت بماند." };

  await collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { role, updatedAt: new Date() } },
  );
  refresh();

  return {
    ok: true,
    message: role === "admin" ? "کاربر به مدیر ارتقا یافت." : "مدیر به کاربر عادی تبدیل شد.",
  };
}

export async function deleteUserAccount(userId: string): Promise<UserActionResult> {
  const adminId = await currentAdminId();
  if (!adminId) return DENIED;
  if (!ObjectId.isValid(userId)) return { ok: false, message: "کاربر یافت نشد." };
  if (userId === adminId)
    return { ok: false, message: "حساب خودتان را از این صفحه حذف نکنید." };

  const _id = new ObjectId(userId);
  const target = await collection("users").findOne({ _id }, { projection: { role: 1 } });
  if (!target) return { ok: false, message: "کاربر یافت نشد." };
  if (target.role === "admin" && (await isLastAdmin()))
    return { ok: false, message: "آخرین مدیر سایت را نمی‌توان حذف کرد." };

  // Better Auth keeps credentials and sessions in sibling collections; removing the
  // user without them would leave orphaned sessions able to authenticate.
  // Raw collections: Better Auth stores `userId` as an ObjectId, while the app-level
  // schema types it as a string for reads.
  await Promise.all([
    db.collection("sessions").deleteMany({ userId: _id }),
    db.collection("accounts").deleteMany({ userId: _id }),
  ]);
  await collection("users").deleteOne({ _id });
  refresh();

  return { ok: true, message: "حساب کاربر حذف شد." };
}
