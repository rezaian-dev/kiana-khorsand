import "server-only";
import { ObjectId } from "mongodb";
import { safeAvatarUrl } from "@/lib/avatar-url";
import { collection } from "@/db/collections";
import { requireAdmin } from "@/lib/session";

export async function publishedWorkshopReviews(slug: string) {
  const now = new Date();
  const workshop = await collection("workshops").findOne({
    slug,
    status: "published",
    endsAt: { $lte: now },
  });
  if (!workshop) return [];
  const reviews = await collection("workshopReviews")
    .find({ workshopId: slug, status: "published" })
    .sort({ createdAt: -1 })
    .limit(60)
    .toArray();
  if (!reviews.length) return [];
  const attendees = await collection("enrollments")
    .find({
      workshopId: slug,
      userId: { $in: reviews.map((r) => r.userId) },
      status: "active",
      attendedAt: { $type: "date" },
    })
    .toArray();
  const accepted = new Set(attendees.map((e) => e.userId));
  const ids = [...accepted]
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id));
  const users = await collection("users")
    .find({ _id: { $in: ids } })
    .toArray();
  const images = new Map(
    users.map((user) => [
      String(user._id),
      safeAvatarUrl(user.image, String(user._id)),
    ]),
  );
  return reviews
    .filter((r) => accepted.has(r.userId))
    .map((r) => ({
      id: String(r._id),
      name: r.name,
      rating: r.rating,
      body: r.body,
      createdAt: r.createdAt.toISOString(),
      image: images.get(r.userId) || null,
    }));
}

export async function workshopCommunityAdmin(workshopIds: string[]) {
  await requireAdmin();
  const [enrollments, reviews] = await Promise.all([
    collection("enrollments")
      .find({ workshopId: { $in: workshopIds } })
      .sort({ createdAt: -1 })
      .toArray(),
    collection("workshopReviews")
      .find({ workshopId: { $in: workshopIds } })
      .sort({ createdAt: -1 })
      .toArray(),
  ]);
  const ids = [...new Set(enrollments.map((e) => e.userId))]
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id));
  const users = await collection("users")
    .find({ _id: { $in: ids } })
    .toArray();
  const names = new Map(users.map((user) => [String(user._id), user.name]));
  return {
    enrollments: enrollments.map((e) => ({
      id: String(e._id),
      userId: e.userId,
      workshopId: e.workshopId,
      name: names.get(e.userId) || "حساب نامشخص",
      status: e.status,
      attendedAt: e.attendedAt?.toISOString() || null,
      createdAt: e.createdAt.toISOString(),
      priceAtRequest: e.priceAtRequest ?? null,
      discountPercentAtRequest: e.discountPercentAtRequest ?? null,
    })),
    reviews: reviews.map((r) => ({
      id: String(r._id),
      workshopId: r.workshopId,
      name: r.name,
      body: r.body,
      rating: r.rating,
      status: r.status,
    })),
  };
}
