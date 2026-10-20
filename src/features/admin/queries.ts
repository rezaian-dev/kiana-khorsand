import "server-only";
import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/session";
import { collection } from "@/db/collections";
import {
  appointment,
  contact,
  message,
  payment,
  user,
  service,
  article,
  workshop,
  testimonial,
  availability,
  settings,
} from "@/validations/models";

export async function adminAppointments() {
  await requireAdmin();
  return (
    await collection("appointments")
      .find({})
      .sort({ startsAt: -1 })
      .limit(100)
      .toArray()
  ).map((doc) => ({ id: String(doc._id), ...appointment.parse(doc) }));
}
export async function adminCalendarAppointments(from: Date, to: Date) {
  await requireAdmin();
  return (
    await collection("appointments")
      .find({ startsAt: { $gte: from, $lt: to } })
      .sort({ startsAt: 1 })
      .limit(2000)
      .toArray()
  ).map((doc) => ({ id: String(doc._id), ...appointment.parse(doc) }));
}
export async function adminPendingAppointments() {
  await requireAdmin();
  return (
    await collection("appointments")
      .find({ status: "pending" })
      .sort({ startsAt: 1 })
      .limit(12)
      .toArray()
  ).map((doc) => ({ id: String(doc._id), ...appointment.parse(doc) }));
}
export async function adminUsers() {
  await requireAdmin();
  return (
    await collection("users")
      .find(
        {},
        {
          projection: { name: 1, username: 1, email: 1, role: 1, createdAt: 1 },
        },
      )
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray()
  ).map((doc) => ({ id: String(doc._id), ...user.parse(doc) }));
}
export async function adminClient(id: string) {
  await requireAdmin();
  if (!ObjectId.isValid(id)) return null;
  const doc = await collection("users").findOne(
    { _id: new ObjectId(id) },
    { projection: { name: 1, username: 1, email: 1, role: 1, createdAt: 1 } },
  );
  if (!doc) return null;
  return { id: String(doc._id), ...user.parse(doc) };
}
export async function adminPayments() {
  await requireAdmin();
  return (
    await collection("payments").find({}).sort({ _id: -1 }).limit(100).toArray()
  ).map((doc) => ({ id: String(doc._id), ...payment.parse(doc) }));
}
export async function adminContacts() {
  await requireAdmin();
  return (
    await collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray()
  ).map((doc) => ({ id: String(doc._id), ...contact.parse(doc) }));
}
export async function adminMessages() {
  await requireAdmin();
  return (
    await collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray()
  ).map((doc) => ({ id: String(doc._id), ...message.parse(doc) }));
}
export async function adminServices() {
  await requireAdmin();
  return (
    await collection("services")
      .find({})
      .sort({ price: 1 })
      .limit(100)
      .toArray()
  ).map((doc) => ({ id: String(doc._id), ...service.parse(doc) }));
}
export async function adminArticles() {
  await requireAdmin();
  return (
    await collection("articles")
      .find({})
      .sort({ updatedAt: -1 })
      .limit(100)
      .toArray()
  ).map((doc) => ({ id: String(doc._id), ...article.parse(doc) }));
}
export async function adminArticle(slug: string) {
  await requireAdmin();
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  const doc = await collection("articles").findOne({ slug });
  return doc ? article.parse(doc) : null;
}
export async function adminWorkshops(page = 1, q = "") {
  await requireAdmin();
  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const filter = safe
    ? {
        $or: [
          { title: { $regex: safe, $options: "i" } },
          { slug: { $regex: safe, $options: "i" } },
        ],
      }
    : {};
  const total = await collection("workshops").countDocuments(filter);
  const pages = Math.max(1, Math.ceil(total / 20));
  const current = Math.min(Math.max(1, page), pages);
  const docs = await collection("workshops")
    .find(filter)
    .sort({ startsAt: 1, slug: 1 })
    .skip((current - 1) * 20)
    .limit(20)
    .toArray();
  return {
    workshops: docs.map((doc) => ({
      id: String(doc._id),
      ...workshop.parse(doc),
    })),
    page: current,
    pages,
    total,
  };
}
export async function adminTestimonials() {
  await requireAdmin();
  return (
    await collection("testimonials")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray()
  ).map((doc) => ({ id: String(doc._id), ...testimonial.parse(doc) }));
}
export async function adminAvailability() {
  await requireAdmin();
  return (
    await collection("availability").find({}).sort({ weekday: 1 }).toArray()
  ).map((doc) => ({ id: String(doc._id), ...availability.parse(doc) }));
}
export async function adminSettings() {
  await requireAdmin();
  const doc = await collection("settings").findOne({ _id: "site" });
  return doc ? settings.parse(doc) : null;
}

export async function adminClientHistory(userId: string) {
  await requireAdmin();
  const [appointments, payments] = await Promise.all([
    collection("appointments")
      .find({ userId })
      .sort({ startsAt: -1 })
      .limit(100)
      .toArray(),
    collection("payments")
      .find({ userId })
      .sort({ paidAt: -1 })
      .limit(100)
      .toArray(),
  ]);
  return {
    appointments: appointments.map((doc) => ({
      id: String(doc._id),
      ...appointment.parse(doc),
    })),
    payments: payments.map((doc) => ({
      id: String(doc._id),
      ...payment.parse(doc),
    })),
  };
}
