import type { MetadataRoute } from "next";
import { getEnv } from "@/lib/env";
import { routes } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    sitemap: `${getEnv().NEXT_PUBLIC_SITE_URL}${routes.sitemap}`,
    rules: { userAgent: "*", allow: "/", disallow: [routes.admin, routes.account, "/api/", "/auth/", routes.login] },
  };
}
