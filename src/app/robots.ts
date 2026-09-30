import type { MetadataRoute } from "next";
import { routes } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: [routes.admin, routes.account, "/api/", "/auth/", routes.login] },
  };
}
