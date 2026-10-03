import type { NextConfig } from "next";
import { getEnv } from "./src/lib/env.ts";

const env = getEnv();
const siteHost = new URL(env.NEXT_PUBLIC_SITE_URL).hostname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingExcludes: { "*": ["./design-reference/**/*", "./verification/**/*", "./reports/**/*"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "https" }],
        headers: [{ key: "Strict-Transport-Security", value: "max-age=31536000" }],
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: siteHost }],
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        ],
      },
    ];
  },
};

export default nextConfig;
