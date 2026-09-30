import type { MetadataRoute } from "next";
import { routes, themeColors } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "دکتر کیانا خرسند",
    short_name: "کیانا خرسند",
    description: "روان‌شناس بالینی و مشاور خانواده",
    lang: "fa",
    dir: "rtl",
    start_url: routes.home,
    display: "browser",
    background_color: themeColors.light,
    theme_color: themeColors.light,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
