"use server";

import { MongoServerError, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { collection } from "@/db/collections";
import { mongoClient } from "@/db/client";
import { getSession, requireAdmin } from "@/lib/session";
import { throttle } from "@/lib/throttle";
import { workshopRequestInput } from "@/validations/community";
import {
  workshopReviewInput,
  workshopReviewStatus,
  enrollmentDecision,
} from "@/validations/workshop-reviews";

export type ReviewFeedback = { ok: boolean; message: string };

export async function submitWorkshopReview(
  slug: string,
  form: FormData,
): Promise<ReviewFeedback> {
  const session = await getSession();
  if (!session)
    return { ok: false, message: "برای ثبت نظر ابتدا وارد حساب شوید." };
  if (!workshopRequestInput.safeParse({ slug }).success)
    return { ok: false, message: "کارگاه معتبر نیست." };
  const input = workshopReviewInput.safeParse(Object.fromEntries(form));
  if (!input.success)
    return {
      ok: false,
      message: "امتیاز و متن نظر (۳۰ تا ۱۰۰۰ نویسه) را بررسی کنید.",
    };
  if (!(await throttle(`workshop-review:${session.user.id}`, 3)))
    return {
      ok: false,
      message: "تعداد نظرهای ارسالی زیاد است؛ کمی بعد تلاش کنید.",
    };
  const now = new Date();
  const [workshop, enrollment] = await Promise.all([
    collection("workshops").findOne({
      slug,
      status: "published",
      endsAt: { $lte: now },
    }),
    collection("enrollments").findOne({
      workshopId: slug,
      userId: session.user.id,
      status: "active",
    }),
  ]);
  if (!workshop || !enrollment?.attendedAt || enrollment.attendedAt > now)
    return {
      ok: false,
      message:
        "ثبت نظر فقط پس از برگزاری کارگاه و تأیید حضور شما امکان‌پذیر است.",
    };
  try {
    await collection("workshopReviews").insertOne({
      workshopId: slug,
      userId: session.user.id,
      name: session.user.name,
      ...input.data,
      status: "pending",
      createdAt: now,
    });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000)
      return {
        ok: false,
        message: "نظر شما برای این کارگاه قبلاً ثبت شده است.",
      };
    throw error;
  }
  revalidatePath(`/workshops/${slug}`);
  revalidatePath("/admin/workshops");
  return {
    ok: true,
    message: "نظر شما برای بررسی ثبت شد و پس از تأیید منتشر می‌شود.",
  };
}

export async function setEnrollmentStatus(form: FormData) {
  await requireAdmin();
  const slug = workshopRequestInput.safeParse({ slug: form.get("slug") });
  const userId = form.get("userId");
  const decision = enrollmentDecision.safeParse(form.get("status"));
  if (
    !slug.success ||
    typeof userId !== "string" ||
    !/^[a-f0-9]{24}$/i.test(userId) ||
    !decision.success
  )
    return;
  if (decision.data === "active") {
    // Lock this workshop document in a MongoDB transaction so concurrent approvals
    // cannot both claim the final seat. The revision is internal bookkeeping.
    const session = mongoClient.startSession();
    try {
      await session.withTransaction(async () => {
        const workshop = await collection("workshops").findOne(
          { slug: slug.data.slug },
          { session },
        );
        if (!workshop) return;
        const lock = await collection("workshops").updateOne(
          { slug: slug.data.slug },
          { $inc: { approvalRevision: 1 } },
          { session },
        );
        if (!lock.matchedCount) return;
        const limit =
          workshop.mode === "online"
            ? Math.min(workshop.capacity ?? 20, 20)
            : (workshop.capacity ?? 1000);
        const otherActive = await collection("enrollments").countDocuments(
          {
            workshopId: slug.data.slug,
            status: "active",
            userId: { $ne: userId },
          },
          { session },
        );
        if (otherActive >= limit) return;
        await collection("enrollments").updateOne(
          { workshopId: slug.data.slug, userId },
          { $set: { status: "active", attendedAt: null } },
          { session },
        );
      });
    } finally {
      await session.endSession();
    }
  } else {
    await collection("enrollments").updateOne(
      { workshopId: slug.data.slug, userId },
      { $set: { status: "cancelled", attendedAt: null } },
    );
  }
  revalidatePath("/admin/workshops");
  revalidatePath("/dashboard");
  revalidatePath(`/workshops/${slug.data.slug}`);
}

export async function markWorkshopAttendance(form: FormData) {
  await requireAdmin();
  const slug = workshopRequestInput.safeParse({ slug: form.get("slug") });
  const userId = form.get("userId");
  if (
    !slug.success ||
    typeof userId !== "string" ||
    !/^[a-f0-9]{24}$/i.test(userId)
  )
    return;
  const now = new Date();
  const workshop = await collection("workshops").findOne({
    slug: slug.data.slug,
    endsAt: { $lte: now },
  });
  if (!workshop) return;
  await collection("enrollments").updateOne(
    {
      workshopId: slug.data.slug,
      userId,
      status: "active",
      attendedAt: { $in: [null] },
    },
    { $set: { attendedAt: now } },
  );
  revalidatePath("/admin/workshops");
  revalidatePath(`/workshops/${slug.data.slug}`);
}

export async function moderateWorkshopReview(form: FormData) {
  await requireAdmin();
  const id = form.get("id");
  const status = workshopReviewStatus.safeParse(form.get("status"));
  if (typeof id !== "string" || !ObjectId.isValid(id) || !status.success)
    return;
  const review = await collection("workshopReviews").findOne({
    _id: new ObjectId(id),
  });
  if (!review) return;
  // Attendance can be revoked; never publish a review that no longer meets the gate.
  if (status.data === "published") {
    const [workshop, enrollment] = await Promise.all([
      collection("workshops").findOne({
        slug: review.workshopId,
        endsAt: { $lte: new Date() },
      }),
      collection("enrollments").findOne({
        workshopId: review.workshopId,
        userId: review.userId,
        status: "active",
      }),
    ]);
    if (!workshop || !enrollment?.attendedAt) return;
  }
  await collection("workshopReviews").updateOne(
    { _id: review._id },
    { $set: { status: status.data } },
  );
  revalidatePath("/admin/workshops");
  revalidatePath(`/workshops/${review.workshopId}`);
}
