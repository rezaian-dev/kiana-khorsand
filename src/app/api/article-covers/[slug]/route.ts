import { Binary } from "mongodb";
import { collection } from "@/db/collections";
import { getSession } from "@/lib/session";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!/^[a-z0-9-]{1,80}$/.test(slug))
    return new Response(null, { status: 404 });
  const article = await collection("articles").findOne(
    { slug },
    { projection: { status: 1, cover: 1 } },
  );
  if (!article || !article.cover?.startsWith(`/api/article-covers/${slug}?v=`))
    return new Response(null, { status: 404 });
  if (article.status !== "published") {
    const session = await getSession();
    if (session?.user.role !== "admin")
      return new Response(null, { status: 404 });
  }
  const cover = await collection("articleCovers").findOne({ slug });
  if (!cover || !(cover.image instanceof Binary))
    return new Response(null, { status: 404 });
  return new Response(new Uint8Array(cover.image.value()), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control":
        article.status === "published"
          ? "public, max-age=60"
          : "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
