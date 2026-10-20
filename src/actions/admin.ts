"use server";

import { randomUUID } from "node:crypto";
import { Binary, MongoServerError, ObjectId } from "mongodb";
import sharp from "sharp";
import { revalidatePath, revalidateTag } from "next/cache";
import { mongoClient } from "@/db/client";
import { addDays, tehranInstant, validDayKey } from "@/lib/tehran-calendar";
import type { AdminFeedback } from "@/types/admin";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { throttle } from "@/lib/throttle";
import { articleCoverFile } from "@/validations/article-cover";
import { collection } from "@/db/collections";
import {
  status,
  appointmentStatus,
  paymentStatus,
  contactStatusSchema,
  catalogKindSchema,
  slugSchema,
  settingsInput,
  messageBodySchema,
  meetInviteUrl,
  articleInput,
  testimonialExperienceInput,
  serviceInput,
  workshopInput,
  parseAdminId,
  parseAvailability,
  blockedRangeInput,
  blockedIdSchema,
  manualInvoiceInput,
  validArticleCover,
  parsePublicationDate,
} from "@/validations/admin";

const duplicateSlug = (kind: string): AdminFeedback => ({
  error: `این شناسه قبلاً برای ${kind} دیگری استفاده شده است؛ شناسهٔ تازه‌ای انتخاب کنید.`,
  success: "",
});

const refresh = (paths: string[], tags: string[] = []) => {
  for (const path of paths) revalidatePath(path);
  for (const tag of tags) revalidateTag(tag, "max");
};

export async function setAppointmentStatus(form: FormData) {
  await requireAdmin();
  const key = parseAdminId(form);
  const value = appointmentStatus.safeParse(form.get("status"));
  if (!key || !value.success) return;
  await collection("appointments").updateOne(
    { _id: key, status: { $in: ["pending", "confirmed"] } },
    { $set: { status: value.data } },
  );
  refresh(["/admin/calendar", "/admin", "/dashboard/appointments", "/book"]);
}
export async function setContactStatus(form: FormData) {
  await requireAdmin();
  const key = parseAdminId(form);
  const value = contactStatusSchema.safeParse(form.get("status"));
  if (!key || !value.success) return;
  await collection("contacts").updateOne(
    { _id: key },
    { $set: { status: value.data } },
  );
  refresh(["/admin/inbox", "/admin"]);
}
export async function setCatalogStatus(form: FormData) {
  await requireAdmin();
  const kind = catalogKindSchema.safeParse(form.get("kind"));
  const item = slugSchema.safeParse(form.get("slug"));
  const value = status.safeParse(form.get("status"));
  if (!kind.success || !item.success || !value.success) return;
  switch (kind.data) {
    case "services":
      await collection("services").updateOne(
        { slug: item.data },
        { $set: { status: value.data } },
      );
      break;
    case "articles":
      await collection("articles").updateOne(
        { slug: item.data },
        { $set: { status: value.data, updatedAt: new Date() } },
      );
      break;
    case "workshops":
      await collection("workshops").updateOne(
        { slug: item.data },
        { $set: { status: value.data } },
      );
      break;
    case "testimonials":
      await collection("testimonials").updateOne(
        { slug: item.data },
        { $set: { status: value.data } },
      );
      break;
  }
  const paths = {
    services: ["/admin/services", "/fees", "/book", "/"],
    articles: ["/admin/articles", "/articles", "/"],
    workshops: ["/admin/workshops", "/workshops", "/"],
    testimonials: ["/admin/testimonials", "/testimonials", "/"],
  };
  const tags = {
    services: ["services"],
    articles: ["articles"],
    workshops: ["workshops"],
    testimonials: ["testimonials"],
  };
  refresh(paths[kind.data], tags[kind.data]);
}
export async function setTestimonialExperience(form: FormData) {
  await requireAdmin();
  const parsed = testimonialExperienceInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) return;
  await collection("testimonials").updateOne(
    { slug: parsed.data.slug },
    { $set: { experience: parsed.data.experience } },
  );
  refresh(["/admin/testimonials", "/testimonials", "/"], ["testimonials"]);
}
export async function saveSettings(form: FormData) {
  await requireAdmin();
  const parsed = settingsInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) return;
  const { cancellation, ...contact } = parsed.data;
  await collection("settings").updateOne(
    { _id: "site" },
    {
      $set: {
        cancellation,
        ...Object.fromEntries(
          Object.entries(contact).map(([key, value]) => [
            `contact.${key}`,
            value,
          ]),
        ),
      },
    },
  );
  refresh(["/admin/settings", "/contact", "/cancellation", "/"], ["settings"]);
}
export async function saveAvailability(form: FormData) {
  await requireAdmin();
  const parsed = parseAvailability(form);
  if (!parsed) return;
  await collection("availability").updateOne(
    { key: parsed.key },
    {
      $set: { slots: parsed.slots },
      $setOnInsert: {
        key: parsed.key,
        weekday: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
          parsed.key,
        ),
        start: "09:00",
        end: "17:00",
        blocks: [],
      },
    },
    { upsert: true },
  );
  refresh(["/admin/availability", "/book", "/contact"], ["availability"]);
}
export async function addBlockedRange(
  _previous: AdminFeedback,
  form: FormData,
): Promise<AdminFeedback> {
  await requireAdmin();
  const parsed = blockedRangeInput.safeParse(Object.fromEntries(form));
  if (
    !parsed.success ||
    !validDayKey(parsed.data.from) ||
    !validDayKey(parsed.data.to)
  )
    return {
      error: "تاریخ شروع، پایان و علت تعطیلی را بررسی کنید.",
      success: "",
    };
  const from = tehranInstant(parsed.data.from);
  const to = tehranInstant(addDays(parsed.data.to, 1));
  if (from >= to || to.getTime() - from.getTime() > 181 * 86400000)
    return { error: "بازه باید به‌ترتیب و حداکثر ۱۸۰ روز باشد.", success: "" };
  const block = { id: randomUUID(), from, to, reason: parsed.data.reason };
  const keys = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;
  const session = mongoClient.startSession();
  try {
    await session.withTransaction(async () => {
      for (const key of keys) {
        await collection("availability").updateOne(
          { key },
          {
            $push: { blocks: block },
            $setOnInsert: {
              key,
              weekday: [
                "sun",
                "mon",
                "tue",
                "wed",
                "thu",
                "fri",
                "sat",
              ].indexOf(key),
              start: "09:00",
              end: "17:00",
              slots: [],
            },
          },
          { upsert: true, session },
        );
      }
    });
  } catch {
    return { error: "ثبت تعطیلی انجام نشد؛ دوباره تلاش کنید.", success: "" };
  } finally {
    await session.endSession();
  }
  refresh(
    ["/admin/availability", "/admin/calendar", "/book"],
    ["availability"],
  );
  return {
    error: "",
    success:
      "بازهٔ بسته ثبت شد. نوبت‌های قبلی به‌طور خودکار لغو نمی‌شوند؛ تقویم را بررسی کنید.",
  };
}
export async function removeBlockedRange(form: FormData) {
  await requireAdmin();
  const id = blockedIdSchema.safeParse(form.get("id"));
  if (!id.success) return;
  await collection("availability").updateMany(
    {},
    { $pull: { blocks: { id: id.data } } },
  );
  refresh(
    ["/admin/availability", "/admin/calendar", "/book"],
    ["availability"],
  );
}

export async function markClientRead(form: FormData) {
  await requireAdmin();
  const key = parseAdminId(form);
  if (!key || !(await collection("threads").findOne({ _id: key }))) return;
  await collection("messages").updateMany(
    { threadId: String(key), sender: "client", readAt: null },
    { $set: { readAt: new Date() } },
  );
  revalidatePath("/admin/inbox");
}

export async function replyToThread(
  _previous: AdminFeedback,
  form: FormData,
): Promise<AdminFeedback> {
  await requireAdmin();
  const key = parseAdminId(form);
  const parsed = messageBodySchema.safeParse(form.get("body"));
  const rawUrl = String(form.get("meetUrl") || "").trim();
  const draft = {
    body:
      typeof form.get("body") === "string"
        ? String(form.get("body")).slice(0, 2000)
        : "",
    meetUrl: rawUrl.slice(0, 500),
  };
  const invite = rawUrl ? meetInviteUrl.safeParse(rawUrl) : null;
  if (!parsed.success)
    return {
      error: "متن پاسخ باید بین ۲ تا ۲۰۰۰ نویسه باشد.",
      success: "",
      draft,
    };
  if (rawUrl && !invite?.success)
    return {
      error:
        "فقط لینک معتبر https://meet.google.com/xxx-xxxx-xxx پذیرفته می‌شود.",
      success: "",
      draft,
    };
  let thread = key ? await collection("threads").findOne({ _id: key }) : null;
  if (!key) {
    const targetId = String(form.get("userId") || "");
    if (
      !ObjectId.isValid(targetId) ||
      !(await collection("users").findOne({
        _id: new ObjectId(targetId),
        role: "user",
      }))
    )
      return { error: "حساب کاربر معتبر نیست.", success: "", draft };
    const now = new Date();
    try {
      await collection("threads").updateOne(
        { userId: targetId },
        { $setOnInsert: { userId: targetId, createdAt: now, updatedAt: now } },
        { upsert: true },
      );
    } catch (error) {
      if (!(error instanceof MongoServerError && error.code === 11000))
        throw error;
    }
    thread = await collection("threads").findOne({ userId: targetId });
  }
  if (!thread) return { error: "تیکت پیدا نشد.", success: "", draft };
  if (!(await throttle(`support-reply:${thread.userId}`, 40)))
    return {
      error: "برای این حساب تعداد پاسخ‌ها بیش از حد مجاز است.",
      success: "",
      draft,
    };
  const now = new Date();
  await collection("messages").insertOne({
    threadId: String(thread._id),
    userId: thread.userId,
    sender: "support",
    body: parsed.data,
    ...(invite?.success ? { meetUrl: invite.data } : {}),
    readAt: null,
    createdAt: now,
  });
  await collection("threads").updateOne(
    { _id: thread._id },
    { $set: { updatedAt: now } },
  );
  refresh(["/admin/inbox", "/dashboard/messages"]);
  return { error: "", success: "پاسخ برای کاربر در تیکت و اعلان‌ها ارسال شد." };
}
export async function saveArticle(
  _previous: AdminFeedback,
  form: FormData,
): Promise<AdminFeedback> {
  const { user } = await requireAdmin();
  const parsed = articleInput.safeParse(Object.fromEntries(form));
  if (!parsed.success)
    return {
      error: "عنوان، متن، دسته، برچسب‌ها و نشانی مقاله را بررسی کنید.",
      success: "",
    };
  const { slug: key, publishedAt, cover, tags, ...fields } = parsed.data;
  const intent = form.get("intent");
  if (intent !== "create" && intent !== "edit")
    return { error: "نوع عملیات مقاله معتبر نیست.", success: "" };
  const existing = await collection("articles").findOne({ slug: key });
  if (intent === "create" && existing) return duplicateSlug("مقاله");
  if (intent === "edit" && !existing)
    return { error: "مقاله پیدا نشد؛ صفحه را تازه‌سازی کنید.", success: "" };
  if (!validArticleCover(cover, existing?.cover))
    return { error: "تصویر انتخابی معتبر نیست.", success: "" };
  const date = parsePublicationDate(publishedAt);
  if (date === undefined)
    return { error: "تاریخ انتشار معتبر نیست.", success: "" };
  const normalizedTags = [
    ...new Set(
      tags
        .split(/[,،\n]+/)
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ];
  if (
    normalizedTags.length > 8 ||
    normalizedTags.some((tag) => tag.length > 30)
  )
    return {
      error: "حداکثر ۸ برچسب با طول حداکثر ۳۰ نویسه وارد کنید.",
      success: "",
    };
  const upload = form.get("coverUpload");
  let webp: Buffer | null = null;
  if (upload instanceof File && upload.size > 0) {
    const file = articleCoverFile.safeParse(upload);
    if (!file.success)
      return {
        error: "برای کاور، تصویر JPG، PNG یا WebP تا ۲ مگابایت انتخاب کنید.",
        success: "",
      };
    if (!(await throttle(`article-cover:${user.id}`, 12)))
      return {
        error:
          "تعداد بارگذاری کاور امروز بیش از حد مجاز است؛ بعداً دوباره تلاش کنید.",
        success: "",
      };
    try {
      const processor = sharp(Buffer.from(await file.data.arrayBuffer()), {
        limitInputPixels: 20_000_000,
        failOn: "error",
      });
      const info = await processor.metadata();
      if (
        !info.width ||
        !info.height ||
        info.width < 500 ||
        info.height < 280 ||
        !["jpeg", "png", "webp"].includes(info.format)
      )
        return {
          error: "ابعاد کاور باید دست‌کم ۵۰۰ در ۲۸۰ پیکسل باشد.",
          success: "",
        };
      webp = await processor
        .rotate()
        .resize(1600, 900, { fit: "cover", position: "attention" })
        .webp({ quality: 79, effort: 4 })
        .toBuffer();
      if (webp.length > 450_000)
        return {
          error:
            "تصویر پس از پردازش نیز بیش از حد بزرگ است؛ تصویر ساده‌تری انتخاب کنید.",
          success: "",
        };
    } catch {
      return {
        error: "تصویر خوانده نشد؛ یک فایل تصویری سالم انتخاب کنید.",
        success: "",
      };
    }
  }
  const savedCover = webp
    ? `/api/article-covers/${key}?v=${Date.now()}`
    : cover || null;
  const changes = {
    ...fields,
    tags: normalizedTags,
    cover: savedCover,
    publishedAt:
      date ??
      existing?.publishedAt ??
      (fields.status === "published" ? new Date() : null),
    updatedAt: new Date(),
  };
  if (intent === "create") {
    try {
      // insertOne plus the unique slug index also protects concurrent creations.
      await collection("articles").insertOne({ slug: key, ...changes });
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000)
        return duplicateSlug("مقاله");
      throw error;
    }
  } else {
    const result = await collection("articles").updateOne(
      { slug: key },
      { $set: changes },
    );
    if (!result.matchedCount)
      return { error: "مقاله پیدا نشد؛ صفحه را تازه‌سازی کنید.", success: "" };
  }
  if (webp) {
    await collection("articleCovers").updateOne(
      { slug: key },
      { $set: { image: new Binary(webp), updatedAt: new Date() } },
      { upsert: true },
    );
  }
  refresh(
    [
      "/admin/articles",
      "/admin/article-editor",
      "/articles",
      `/articles/${key}`,
      "/",
    ],
    ["articles"],
  );
  redirect(`/admin/article-editor?slug=${key}`);
}

export async function saveService(form: FormData) {
  await requireAdmin();
  const parsed = serviceInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) return;
  const { slug: key, features, ...fields } = parsed.data;
  await collection("services").updateOne(
    { slug: key },
    {
      $set: {
        ...fields,
        features: features
          .split(/\n+/)
          .map((x) => x.trim())
          .filter(Boolean),
      },
      $setOnInsert: { slug: key, status: "draft" },
    },
    { upsert: true },
  );
  refresh(["/admin/services", "/fees", "/book", "/"], ["services"]);
}
export async function saveWorkshop(
  _previous: AdminFeedback,
  form: FormData,
): Promise<AdminFeedback> {
  await requireAdmin();
  const parsed = workshopInput.safeParse(Object.fromEntries(form));
  if (!parsed.success)
    return {
      error: "عنوان، توضیحات، قیمت، ظرفیت و درصد تخفیف را بررسی کنید.",
      success: "",
    };
  const {
    slug: key,
    day,
    startTime,
    endTime,
    discountPercent,
    discountFrom,
    discountTo,
    ...fields
  } = parsed.data;
  const intent = form.get("intent");
  if (intent !== "create" && intent !== "edit")
    return { error: "نوع عملیات کارگاه معتبر نیست.", success: "" };
  const scheduled = day !== "";
  const discounted = discountPercent > 0;
  if (
    discounted &&
    (fields.price === 0 ||
      !validDayKey(discountFrom) ||
      !validDayKey(discountTo) ||
      discountFrom > discountTo ||
      new Date(`${discountTo}T00:00:00Z`).getTime() -
        new Date(`${discountFrom}T00:00:00Z`).getTime() >
        366 * 86400000)
  )
    return {
      error:
        "بازهٔ تخفیف باید معتبر و حداکثر ۳۶۶ روز باشد؛ قیمت کارگاه نیز باید مثبت باشد.",
      success: "",
    };
  if (
    scheduled &&
    (!validDayKey(day) ||
      !/^(?:0\d|1\d|2[0-3]):(?:00|30)$/.test(startTime) ||
      !/^(?:0\d|1\d|2[0-3]):(?:00|30)$/.test(endTime) ||
      startTime >= endTime)
  )
    return {
      error: "روز برگزاری یا ساعت‌های شروع و پایان معتبر نیستند.",
      success: "",
    };
  if (fields.mode === "online" && fields.capacity > 20)
    return { error: "ظرفیت کارگاه آنلاین حداکثر ۲۰ نفر است.", success: "" };
  if (intent === "edit") {
    const active = await collection("enrollments").countDocuments({
      workshopId: key,
      status: "active",
    });
    if (active > fields.capacity)
      return {
        error: "ظرفیت از تعداد ثبت‌نام‌های تأییدشده کمتر است.",
        success: "",
      };
  }
  const startsAt = scheduled ? tehranInstant(day, startTime) : null;
  const endsAt = scheduled ? tehranInstant(day, endTime) : null;
  const changes = {
    ...fields,
    startsAt,
    endsAt,
    discount: discounted
      ? {
          percent: discountPercent,
          startsAt: tehranInstant(discountFrom),
          endsAt: tehranInstant(addDays(discountTo, 1)),
        }
      : null,
  };
  if (intent === "create") {
    try {
      await collection("workshops").insertOne({
        slug: key,
        ...changes,
        status: "draft",
        cover: null,
      });
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000)
        return duplicateSlug("کارگاه");
      throw error;
    }
  } else {
    const result = await collection("workshops").updateOne(
      { slug: key },
      { $set: changes },
    );
    if (!result.matchedCount)
      return { error: "کارگاه پیدا نشد؛ صفحه را تازه‌سازی کنید.", success: "" };
  }
  refresh(
    ["/admin/workshops", "/workshops", `/workshops/${key}`, "/"],
    ["workshops"],
  );
  return {
    error: "",
    success: "تغییرات کارگاه با موفقیت ذخیره شد.",
  };
}
export async function createManualInvoice(
  _previous: AdminFeedback,
  form: FormData,
): Promise<AdminFeedback> {
  await requireAdmin();
  const parsed = manualInvoiceInput.safeParse(Object.fromEntries(form));
  if (!parsed.success)
    return { error: "مراجع، مبلغ و شرح فاکتور را بررسی کنید.", success: "" };
  const person = await collection("users").findOne({
    _id: new ObjectId(parsed.data.userId),
  });
  if (!person || person.role === "admin")
    return { error: "حساب مراجع معتبر نیست.", success: "" };
  const invoice = `INV-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  try {
    await collection("payments").insertOne({
      userId: String(person._id),
      appointmentId: null,
      invoice,
      amount: parsed.data.amount,
      description: parsed.data.description,
      issuedAt: new Date(),
      status: "pending",
      paidAt: null,
      method: "none",
    });
  } catch {
    return { error: "ثبت فاکتور انجام نشد؛ دوباره تلاش کنید.", success: "" };
  }
  refresh(["/admin/payments", "/dashboard/payments", "/admin/client"]);
  return {
    error: "",
    success: `فاکتور ${invoice} با وضعیت «در انتظار» ثبت شد؛ پرداختی انجام نشده است.`,
  };
}
export async function createAppointmentInvoice(form: FormData) {
  await requireAdmin();
  const id = parseAdminId(form);
  if (!id) return;
  const appointment = await collection("appointments").findOne({ _id: id });
  if (!appointment || !["confirmed", "completed"].includes(appointment.status))
    return;
  await collection("payments").updateOne(
    { appointmentId: String(id) },
    {
      $setOnInsert: {
        appointmentId: String(id),
        userId: appointment.userId,
        invoice: `INV-${String(id).slice(-10).toUpperCase()}`,
        amount: appointment.price,
        status: "pending",
        paidAt: null,
        method: "none",
      },
    },
    { upsert: true },
  );
  refresh(["/admin/payments", "/dashboard/payments"]);
}

export async function setPaymentStatus(form: FormData) {
  await requireAdmin();
  const key = parseAdminId(form);
  const value = paymentStatus.safeParse(form.get("status"));
  if (!key || !value.success) return;
  await collection("payments").updateOne(
    { _id: key },
    {
      $set: {
        status: value.data,
        paidAt: value.data === "paid" ? new Date() : null,
        method: value.data === "paid" ? "manual" : "none",
      },
    },
  );
  refresh(["/admin/payments", "/dashboard/payments"]);
}
