import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "کیانا خرسند — روان‌شناس بالینی",
    short_name: "کیانا خرسند",
    description:
      "جایی امن برای فهمیدن و تغییر — مشاوره حضوری و آنلاین، کارگاه‌ها و نوشته‌های کوتاه.",
    id: "/",
    start_url: "/",
    // A link that belongs to the app should move the window that is already open
    // instead of spawning a second one — this is what makes a typed `/admin` land
    // in the installed app rather than beside it.
    launch_handler: { client_mode: ["navigate-existing", "auto"] },
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "browser"],
    orientation: "portrait",
    scope: "/",
    lang: "fa",
    dir: "rtl",
    background_color: "#f8faf9",
    theme_color: "#0d736b",
    categories: ["health", "lifestyle", "medical"],
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
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      { name: "رزرو وقت", url: "/book", description: "درخواست وقت مشاوره" },
      { name: "مقاله‌ها", url: "/articles", description: "خواندنی‌های کوتاه" },
      { name: "کارگاه‌ها", url: "/workshops", description: "یادگیری گروهی" },
    ],
    screenshots: [
      {
        src: "/og-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
        form_factor: "wide",
        label: "صفحه اصلی کیانا خرسند",
      },
    ],
  };
}
