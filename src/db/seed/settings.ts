import type { Model } from "@/types/models";

export const rows = [
  {
    _id: "site",
    profile: {
      name: "کیانا خرسند",
      title: "روان‌شناس بالینی",
      bio: "روان‌شناس بالینی با تمرکز بر درمان اضطراب، افسردگی و مشاوره فردی بزرگسالان؛ ارائه‌دهنده جلسه‌های حضوری و آنلاین.",
      licence: "",
      years: null,
    },
    contact: {
      phone: "09123456789",
      email: "info@kianakhorsand.ir",
      address: "تهران، خیابان ولیعصر، پلاک ۱۲، طبقه سوم، واحد ۷",
      instagram: "https://instagram.com/kianakhorsand",
      telegram: "https://t.me/kianakhorsand",
      whatsapp: "https://wa.me/989123456789",
    },
    cancellation:
      "لغو یا جابه‌جایی نوبت تا ۲۴ ساعت پیش از زمان جلسه بدون هزینه انجام می‌شود. در صورت لغو با فاصله کمتر از ۲۴ ساعت، ۵۰ درصد هزینه جلسه محاسبه خواهد شد. تأخیر بیش از ۱۵ دقیقه به معنای لغو جلسه است.",
    notifications: {
      email: true,
      sms: false,
      reminder: false,
      weekly: false,
    },
    images: {
      hero: "/assets/images/hero-therapist.jpg",
      portrait: "/assets/images/about-therapist.jpg",
      logo: "/assets/logo/mark.svg",
      favicon: "/icon.svg",
      og: null,
    },
  },
] satisfies Model["settings"][];
