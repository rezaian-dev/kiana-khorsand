import { Binary } from "mongodb";
import { collection } from "@/db/collections";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^[a-f0-9]{24}$/i.test(id)) return new Response(null, { status: 404 });
  const record = await collection("avatars").findOne({ userId: id });
  if (!record || !(record.image instanceof Binary))
    return new Response(null, { status: 404 });
  return new Response(new Uint8Array(record.image.value()), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=60",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
