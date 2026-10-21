import type { NextConfig } from "next";

const historicPages = [
  "404",
  "about",
  "admin/article-editor",
  "admin/articles",
  "admin/availability",
  "admin/calendar",
  "admin/client",
  "admin/clients",
  "admin/inbox",
  "admin/index",
  "admin/payments",
  "admin/services",
  "admin/settings",
  "admin/testimonials",
  "admin/workshops",
  "approach",
  "area",
  "areas",
  "article",
  "articles",
  "assessment",
  "assessments",
  "book",
  "book-confirmed",
  "cancellation",
  "contact",
  "dashboard/appointments",
  "dashboard/assessments",
  "dashboard/courses",
  "dashboard/index",
  "dashboard/messages",
  "dashboard/notes",
  "dashboard/payments",
  "dashboard/settings",
  "error",
  "faq",
  "fees",
  "index",
  "login",
  "privacy",
  "register",
  "terms",
  "testimonials",
  "workshop",
  "workshops",
];

// F7 Phase 4 BLOCKED: cacheComponents requires removing runtime="nodejs" and unstable_cache migration
// which conflicts with Better Auth + Mongo driver per https://nextjs.org/docs/app/guides/migrating-to-cache-components
// Fallback: keep Header dynamic but reserve space for CLS 0 via Suspense in future (not yet implemented).
const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  turbopack: {},
  experimental: {
    serverActions: { bodySizeLimit: "3mb" },
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "sonner",
      "radix-ui",
      "zod",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.mongodb.net" },
      { protocol: "https", hostname: "**.cloudinary.com" },
    ],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // Never cache private navigations per F4 — https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
      {
        source: "/dashboard/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/book/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return historicPages.map((name) => ({
      source: `/${name}.html`,
      destination:
        name === "index"
          ? "/"
          : name === "admin/index"
            ? "/admin"
            : name === "dashboard/index"
              ? "/dashboard"
              : `/${name}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
