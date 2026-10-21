"use server";

import { bookingInput } from "@/validations/booking";

import type { BookingState } from "@/types/booking";

import { MongoServerError } from "mongodb";
import { collection } from "@/db/collections";
import { requireUser } from "@/lib/session";
import { throttle } from "@/lib/throttle";
import { getSlots } from "@/features/booking/queries";

// OWNER-DECISION: per-user pending cap — 3 pending appointments max (F9)
const BOOKING_PENDING_CAP = 3;
export async function createBooking(
  _previous: BookingState,
  data: FormData,
): Promise<BookingState> {
  const session = await requireUser();
  const parsed = bookingInput.safeParse(Object.fromEntries(data.entries()));
  if (!parsed.success)
    return { error: "اطلاعات رزرو را بررسی و دوباره تلاش کنید.", id: "" };
  if (!(await throttle("booking", 12)))
    return { error: "تعداد درخواست‌های امروز بیش از حد مجاز است.", id: "" };
  const pendingCount = await collection("appointments").countDocuments({
    userId: session.user.id,
    status: "pending",
  });
  if (pendingCount >= BOOKING_PENDING_CAP) {
    return { error: `حداکثر ${BOOKING_PENDING_CAP} نوبت در انتظار می‌توانید داشته باشید.`, id: "" };
  }
  const service = await collection("services").findOne({
    slug: parsed.data.serviceId,
    status: "published",
  });
  if (!service) return { error: "این خدمت در دسترس نیست.", id: "" };
  const available = await getSlots();
  if (!available.some((item) => item.startsAt === parsed.data.startsAt))
    return {
      error: "این زمان دیگر در دسترس نیست. زمان دیگری انتخاب کنید.",
      id: "",
    };
  const startsAt = new Date(parsed.data.startsAt);
  try {
    const inserted = await collection("appointments").insertOne({
      userId: session.user.id,
      serviceId: service.slug,
      startsAt,
      endsAt: new Date(startsAt.getTime() + service.duration * 60000),
      status: "pending",
      price: service.price,
      note: parsed.data.note,
      createdAt: new Date(),
    });
    return { error: "", id: inserted.insertedId.toHexString() };
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000)
      return {
        error: "این زمان همین حالا رزرو شد. زمان دیگری انتخاب کنید.",
        id: "",
      };
    throw error;
  }
}
