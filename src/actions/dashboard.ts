"use server";

import {
  noteSchema,
  messageSchema,
  profileNameSchema,
  parseNoteId,
} from "@/validations/dashboard";

import type { PanelState } from "@/types/dashboard";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/session";
import { collection } from "@/db/collections";
import { throttle } from "@/lib/throttle";

export async function createNote(
  _state: PanelState,
  form: FormData,
): Promise<PanelState> {
  const session = await requireUser();
  const value = noteSchema.safeParse({
    title: form.get("title"),
    body: form.get("body"),
  });
  if (!value.success)
    return { error: "عنوان و متن یادداشت را کامل کنید.", success: false };
  if (!(await throttle(`notes:${session.user.id}`, 30)))
    return {
      error: "تعداد درخواست‌ها زیاد است؛ بعداً دوباره تلاش کنید.",
      success: false,
    };
  const userId = session.user.id;
  if ((await collection("notes").countDocuments({ userId })) >= 100)
    return { error: "ظرفیت یادداشت‌های حساب تکمیل شده است.", success: false };
  const now = new Date();
  await collection("notes").insertOne({
    userId,
    ...value.data,
    tags: [],
    pinned: false,
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/dashboard/notes");
  return { error: "", success: true };
}

export async function deleteNote(form: FormData) {
  const session = await requireUser();
  const id = parseNoteId(form.get("id"));
  if (!id) return;
  await collection("notes").deleteOne({
    _id: id,
    userId: session.user.id,
  });
  revalidatePath("/dashboard/notes");
}

/** Keep old encrypted notes owner-accessible after retiring the video room. */
export async function deleteLegacyMeetingNote(form: FormData) {
  const session = await requireUser();
  const id = parseNoteId(form.get("id"));
  if (!id) return;
  await collection("meetingNotes").deleteOne({
    _id: id,
    userId: session.user.id,
  });
  revalidatePath("/dashboard/notes");
}

export async function markSupportRead() {
  const session = await requireUser();
  await collection("messages").updateMany(
    {
      userId: session.user.id,
      sender: { $in: ["support", "clinician", "system"] },
      readAt: null,
    },
    { $set: { readAt: new Date() } },
  );
  revalidatePath("/dashboard/messages");
  revalidatePath("/dashboard");
}

export async function sendMessage(
  _state: PanelState,
  form: FormData,
): Promise<PanelState> {
  const session = await requireUser();
  const rawBody = form.get("body");
  const draft = typeof rawBody === "string" ? rawBody.slice(0, 2000) : "";
  const parsed = messageSchema.safeParse(rawBody);
  if (!parsed.success)
    return {
      error: "پیام باید بین ۲ تا ۲۰۰۰ نویسه باشد.",
      success: false,
      draft,
    };
  if (!(await throttle(`message:${session.user.id}`, 15)))
    return {
      error: "تعداد درخواست‌ها زیاد است؛ بعداً دوباره تلاش کنید.",
      success: false,
      draft,
    };
  const userId = session.user.id;
  let thread = await collection("threads").findOne({ userId });
  if (!thread) {
    const now = new Date();
    try {
      await collection("threads").insertOne({
        userId,
        createdAt: now,
        updatedAt: now,
      });
    } catch {
      /* Another request may have created the thread; look it up again. */
    }
    thread = await collection("threads").findOne({ userId });
  }
  if (!thread)
    return {
      error: "امکان ثبت پیام وجود ندارد؛ دوباره تلاش کنید.",
      success: false,
      draft,
    };
  const now = new Date();
  await collection("messages").insertOne({
    threadId: String(thread._id),
    userId,
    sender: "client",
    body: parsed.data,
    readAt: null,
    createdAt: now,
  });
  await collection("threads").updateOne(
    { _id: thread._id, userId },
    { $set: { updatedAt: now } },
  );
  revalidatePath("/dashboard/messages");
  return { error: "", success: true };
}

export async function updateProfile(
  _state: PanelState,
  form: FormData,
): Promise<PanelState> {
  await requireUser();
  const parsed = profileNameSchema.safeParse(form.get("name"));
  if (!parsed.success)
    return { error: "نام باید بین ۳ تا ۱۲۰ نویسه باشد.", success: false };
  try {
    await auth.api.updateUser({
      headers: await headers(),
      body: { name: parsed.data },
    });
  } catch {
    return {
      error: "ویرایش حساب انجام نشد؛ دوباره تلاش کنید.",
      success: false,
    };
  }
  revalidatePath("/dashboard/settings");
  return { error: "", success: true };
}
