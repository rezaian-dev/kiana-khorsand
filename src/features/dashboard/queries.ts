import "server-only";
import { collection } from "@/db/collections";
import {
  appointment,
  payment,
  note,
  result,
  message,
  enrollment,
} from "@/validations/models";

/** The caller must be authenticated. Never accept a userId from a query string or form. */
export async function listMyAppointments(userId: string) {
  const docs = await collection("appointments")
    .find({ userId })
    .sort({ startsAt: -1 })
    .limit(50)
    .toArray();
  return docs.map((doc) => ({
    id: String(doc._id),
    ...appointment.parse(doc),
  }));
}
export async function listMyPayments(userId: string) {
  const docs = await collection("payments")
    .find({ userId })
    .sort({ _id: -1 })
    .limit(50)
    .toArray();
  return docs.map((doc) => ({ id: String(doc._id), ...payment.parse(doc) }));
}
export async function listMyNotes(userId: string) {
  const docs = await collection("notes")
    .find({ userId })
    .sort({ pinned: -1, updatedAt: -1 })
    .limit(50)
    .toArray();
  return docs.map((doc) => ({ id: String(doc._id), ...note.parse(doc) }));
}
export async function listMyResults(userId: string) {
  const docs = await collection("results")
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();
  return docs.map((doc) => ({ id: String(doc._id), ...result.parse(doc) }));
}
export async function listMyMessages(userId: string) {
  const docs = await collection("messages")
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();
  return docs
    .reverse()
    .map((doc) => ({ id: String(doc._id), ...message.parse(doc) }));
}
export async function listMyEnrollments(userId: string) {
  const docs = await collection("enrollments")
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();
  return docs.map((doc) => ({ id: String(doc._id), ...enrollment.parse(doc) }));
}
