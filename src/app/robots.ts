import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-urls";

/** The demo panels and auth flows are not crawlable even when their pages are accessible. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/dashboard",
        "/login",
        "/register",
        "/book-confirmed",
        "/book/done",
        "/forgot-password",
        "/api/",
        "/error",
        "/404",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
