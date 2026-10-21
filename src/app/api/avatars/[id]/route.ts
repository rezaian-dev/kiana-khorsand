import { Binary } from "mongodb";
import { collection } from "@/db/collections";
import { getSession } from "@/lib/session";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^[a-f0-9]{24}$/i.test(id)) return new Response(null, { status: 404 });
  // F11: require session; allow owner or admin, except therapist public profile
  const session = await getSession();
  const isOwner = session?.user?.id === id;
  const isAdmin = session?.user?.role === "admin";
  // Therapist public image is identified by settings profile; if ambiguous, we still require auth
  // For now, only owner/admin can fetch; public therapist image served via /api/article-covers, not here
  if (!session || (!isOwner && !isAdmin)) {
    return new Response(null, { status: 401 });
  }
  const record = await collection("avatars").findOne({ userId: id });
  if (!record || !(record.image instanceof Binary))
    return new Response(null, { status: 404 });
  return new Response(new Uint8Array(record.image.value()), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "private, max-age=60",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
