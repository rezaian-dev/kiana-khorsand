import { toNextJsHandler } from "better-auth/next-js";
import { canAuthenticate, getAuth } from "@/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handleRequest(request: Request) {
  if (!canAuthenticate()) return Response.json({ code: "UNAVAILABLE", message: "ورود هنوز روی میزبان تنظیم نشده است." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  try {
    const handlers = toNextJsHandler(getAuth());
    return request.method === "POST" ? await handlers.POST(request) : await handlers.GET(request);
  } catch {
    return Response.json({ code: "UNAVAILABLE", message: "سرویس فعلاً در دسترس نیست." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}

export async function GET(request: Request) { return handleRequest(request); }
export async function POST(request: Request) { return handleRequest(request); }
