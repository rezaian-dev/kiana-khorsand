import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

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

export default withPWA(nextConfig);
