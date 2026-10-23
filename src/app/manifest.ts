import type { MetadataRoute } from "next";

/**
 * Web app manifest.
 *
 * Follows the installability requirements browsers actually check: `name`,
 * `short_name`, a `start_url` and `scope` inside the origin, `display: standalone`,
 * a 192px and a 512px icon, and one `maskable` icon whose art stays inside the
 * central 80% safe circle (Android crops the rest).
 * https://web.dev/articles/maskable-icon
 * https://developer.mozilla.org/en-US/docs/Web/Manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "کیانا خرسند — روان‌شناس بالینی",
    short_name: "کیانا خرسند",
    description:
      "جایی امن برای فهمیدن و تغییر — مشاوره حضوری و آنلاین، کارگاه‌ها و نوشته‌های کوتاه.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui", "browser"],
    orientation: "portrait",
    lang: "fa",
    dir: "rtl",
    // Matches the in-app launch screen, so the OS splash hands over invisibly.
    background_color: "#0a1219",
    theme_color: "#0d736b",
    categories: ["health", "lifestyle", "medical"],
    // A link that belongs to the app moves the window that is already open.
    launch_handler: { client_mode: ["navigate-existing", "auto"] },
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      {
        name: "رزرو وقت",
        short_name: "رزرو",
        url: "/book",
        description: "درخواست وقت مشاوره",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "مقاله‌ها",
        short_name: "مقاله‌ها",
        url: "/articles",
        description: "خواندنی‌های کوتاه",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "کارگاه‌ها",
        short_name: "کارگاه‌ها",
        url: "/workshops",
        description: "یادگیری گروهی",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
    screenshots: [
      {
        src: "/screenshot-narrow.jpg",
        sizes: "560x1140",
        type: "image/jpeg",
        form_factor: "narrow",
        label: "صفحهٔ نخست روی گوشی",
      },
      {
        src: "/screenshot-wide.jpg",
        sizes: "1400x875",
        type: "image/jpeg",
        form_factor: "wide",
        label: "صفحهٔ نخست روی دسکتاپ",
      },
    ],
  };
}
