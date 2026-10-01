"use server";

import { cookies } from "next/headers";
import { sidebarCookie, sidebarSchema } from "@/lib/admin";
import { routes } from "@/lib/constants";
import { getEnv } from "@/lib/env";
import { runAction } from "../result";
import { requireAdmin } from "../session";

export async function saveSidebar(input: unknown) {
  return runAction(sidebarSchema, input, async (value) => {
    await requireAdmin();
    (await cookies()).set(sidebarCookie, value.isCollapsed ? "collapsed" : "expanded", {
      path: routes.admin, httpOnly: true, secure: new URL(getEnv().NEXT_PUBLIC_SITE_URL).protocol === "https:", sameSite: "lax", maxAge: 60 * 60 * 24 * 365,
    });
    return value;
  });
}
