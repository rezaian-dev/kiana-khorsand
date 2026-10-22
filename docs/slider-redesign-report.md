# گزارش بازطراحی اسلایدرها — کیانا خرسند (RTL)

تاریخ: 2026-10-22 · نسخه‌های نصب‌شده: `embla-carousel-react` 8.6.0، `embla-carousel-autoplay` 8.6.0، Next 16.4.0، Tailwind v4

---

## ۱) فاز ۰ — فهرست کامل اسلایدرها (Audit)

جست‌وجوی کل مخزن (`embla`, `carousel`, `slider`, `snap-`, `overflow-x-auto`, `scrollBy`):

| # | اسلایدر | فایل | نوع |
|---|---------|------|-----|
| 1 | نظرات (Home) | `src/features/pages/ui/home-slider.tsx` → `slider-section.tsx` | اسلایدر Embla (پیش‌تر `home-reference-carousel.tsx`) |
| 2 | مقالات (Latest Articles) | همان مسیر، `kind="articles"` | اسلایدر Embla |
| 3 | کارگاه‌ها (Courses/Workshops) | همان مسیر، `kind="workshops"` | اسلایدر Embla |
| 4 | نظرات (صفحه Testimonials) | `src/app/(public)/testimonials/page.tsx` | **گرید** (نه اسلایدر) با کارت مشترک |

پیاده‌سازی‌های قدیمی حذف‌شده: `src/components/carousel/*` (۷ فایل) و `home-reference-carousel.tsx` (۴۲۵ خط). هیچ اسلایدر دیگری (Swiper/Slick/marquee/scroll-snap دستی) در مخزن نبود.

### باگ‌های مشاهده‌شده در هر اسلایدر (قبل از تغییر)

| باگ | نظرات | مقالات | کارگاه‌ها | گرید صفحه نظرات |
|-----|:---:|:---:|:---:|:---:|
| ۱. آیکن‌های آینه‌نشده برای RTL | ✅ | ✅ | ✅ | — |
| ۲. کنترل‌ها در گوشه پایین-چپ با فاصلهٔ مرده | ✅ | ✅ | ✅ | — |
| ۳. فضای خالی زیر متن کارت | ✅ | — | — | ✅ |
| ۴. گیومهٔ لاتین در بالا-چپ | ✅ | — | — | ✅ |
| ۵. تکرار بج «مشاورهٔ فردی» با خط نقش | ✅ | — | — | ✅ |
| ۶. بریدگی خشن کارت بعدی | ✅ | ✅ | ✅ | — |
| ۷. پوشاندن انتهای صفحه با داک پایین | ✅ | ✅ | ✅ | ✅ |
| ۸. بدون نشانگر موقعیت | ✅ | ✅ | ✅ | — |

---

## ۲) فاز ۱ — یک سیستم اسلایدر مشترک

```
src/components/slider/
├─ slider.tsx            # Slider / SliderViewport / SliderTrack / SliderSlide + context + toFaDigits
├─ slider-controls.tsx   # SliderControls / SliderPrevButton / SliderNextButton / SliderPlayPause
├─ slider-dots.tsx       # SliderDots (dots یا progress bar)
├─ use-slider.ts         # useSlider (تنها نقطهٔ ادغام Embla + Autoplay)
└─ index.ts
src/features/pages/ui/
├─ slider-section.tsx    # پوستهٔ Client: عنوان + اسلایدها به‌صورت slot + کنترل‌ها
└─ home-slider.tsx       # Server Component: ساخت کارت‌ها و پاس‌دادن به پوسته
src/features/testimonials/ui/
└─ testimonial-card.tsx  # کارت مشترک اسلایدر و صفحهٔ نظرات
```

- فقط `slider/` و `slider-section.tsx` کلاینت‌اند؛ کارت‌ها، داده و متن‌ها Server Component باقی ماندند.
- یک منبع حقیقت برای وضعیت Embla (`useSlider`)، یک مسیر راه‌اندازی، بدون وابستگی حلقه‌ای.
- `home-reference-carousel.tsx` و `components/carousel/*` حذف و `home-reference.tsx` به `HomeSlider` وصل شد.

---

## ۳) فاز ۲ — رفتار صحیح RTL (طبق مستندات Embla)

- `direction: "rtl"` در گزینه‌های Embla + `dir="rtl"` روی **ریشهٔ** اسلایدر. viewport دومین `dir` ندارد (منبع متناقض حذف شد).
- قرارداد ناوبری: **قبلی = شروع خط (راست)**، **بعدی = پایان خط (چپ)**. در RTL: قبلی `→` و بعدی `←`.
- پیاده‌سازی با Lucide `ArrowLeft`/`ArrowRight` + واریانت `rtl:-scale-x-100` (بدون چرخش دستی)، پس در هر دو جهت درست است.
- همهٔ فاصله‌ها منطقی‌اند: `start/end`, `ms/me/ps/pe`, `text-start`, `inset-inline`. هیچ `left/right` فیزیکی برای چیدمان استفاده نشده.
- swipe، drag، کلیدهای جهت‌دار و autoplay همه در همان جهت منطقی حرکت می‌کنند (تست‌های Playwright این را تأیید می‌کنند).

---

## ۴) فاز ۳ — بازطراحی حرفه‌ای

| مورد | پیاده‌سازی |
|------|-----------|
| کنترل‌ها | یک ردیف فشرده **مستقیماً زیر اسلایدها**، چسبیده به inline-start؛ شامل چرخش (در صورت autoplay)، قبلی، بعدی، شمارندهٔ فارسی و نشانگر موقعیت |
| شمارنده | «۲ از ۶» با `Intl.NumberFormat('fa-IR')` |
| دکمه‌ها | ۴۴×۴۴ (`size-11`)، حلقهٔ `focus-visible`، حالت `disabled` واقعی در انتها (نظرات loop=خاموش)، ترنزیشن نرم |
| کارت نظر | ارتفاع محتوا-محور با `flex`/`h-full` (بدون `min-height` ثابت)، گیومهٔ « در شروع خط، متن با `leading-[2]`، خط جداکنندهٔ موی‌باریک، سطر نویسنده = آواتار + نام + **یک** خط نقش |
| بج تکراری | حذف شد؛ بج فقط اگر اطلاعاتی خارج از خط نقش داشته باشد نمایش داده می‌شود |
| اندازهٔ اسلاید | موبایل ۸۸٪ (پیک کارت بعدی)، تبلت ۲ و دسکتاپ ۳ (`sm:`/`lg:` بر اساس مستندات Tailwind)؛ از ۳۲۰px کار می‌کند |
| لبهٔ محو | `mask-image` در انتهای خط به‌جای بریدگی خشن؛ از `md` به بالا حذف می‌شود |
| اسلاید غیرفعال | مقیاس ملایم `scale-[0.985]` — **بدون کاهش opacity** تا کنتراست AA حفظ شود |
| حرکت | CSS/Embla؛ زیر `prefers-reduced-motion` هم ترنزیشن‌ها و هم `duration` امبلا صفر می‌شوند |
| تم | توکن‌های موجود (`--surface`, `--site-line`, `--c-teal`) حفظ شد؛ دارک فقط رنگ عوض می‌کند |
| CLS | عرض اسلایدها از اولین رندر ثابت است؛ CLS اندازه‌گیری‌شده: **0.0005** |

---

## ۵) فاز ۴ — دسترس‌پذیری (W3C APG Carousel)

- ریشه: `role="region"` + `aria-roledescription="carousel"` + نام از heading مرئی با `aria-labelledby`.
- هر اسلاید: `role="group"` + `aria-roledescription="slide"` + `aria-label="۲ از ۶"`.
- دکمه‌ها: «قبلی» / «بعدی»؛ نقاط: `aria-label` + `aria-current` + `aria-disabled` (الگوی grouped).
- واژه‌بندی نام‌ها بدون کلمهٔ «carousel/slide» (طبق APG).
- Autoplay: توقف روی hover، focus و تعامل؛ **کنترل توقف/پخش به‌عنوان اولین عنصر تب‌ترتیب**؛ زیر reduced-motion هرگز شروع نمی‌شود (WCAG 2.2.2).
- نظرات: **بدون autoplay** → ناحیهٔ زندهٔ `aria-live="polite"` روی ریل اسلایدها؛ بقیه `off`.
- axe (WCAG 2.0/2.1/2.2 A+AA): **بدون خطا** در `/` و `/testimonials`، در هر دو تم.

---

## ۶) فاز ۵ — اصلاحات سطح صفحه

- `src/app/(public)/layout.tsx`: پدینگ پایین بدنهٔ عمومی `calc(104px + env(safe-area-inset-bottom))` تا داک شناور محتوا را نپوشاند.
- `globals.css`: `scroll-padding-bottom` هم‌تراز همان مقدار (پرش لنگرها بالای داک نمی‌افتد).
- سرریز افقی در ۳۲۰px: **۰ پیکسل** (اندازه‌گیری‌شده در ۳۲۰/۳۹۰/۷۶۸/۱۰۲۴/۱۴۴۰).

> یادداشت: قالب عمومی از قبل `max-[768px]:pb-[92px]` داشت؛ مقدار به ۱۰۴px رسید تا ارتفاع واقعی داک + فاصلهٔ ایمن پوشش داده شود.

---

## ۷) فاز ۶ — تأیید و نتایج واقعی

### دستورها (اجرا شده در همین مخزن)

| دستور | نتیجه |
|-------|-------|
| `npx tsc --noEmit` | ✅ بدون خطا |
| `npx eslint . --max-warnings=0` | ✅ بدون خطا/هشدار |
| `npm run build` | ✅ موفق — ۶۵ روت |
| `npx playwright test` | ✅ **۵/۵ پاس** (Chromium نصب و اجرا شد) |
| axe-core (WCAG 2.2 A/AA) | ✅ بدون تخلف در `/` و `/testimonials`، light+dark |

### تست‌های Playwright (`e2e/carousel-navigation.spec.ts`)

1. نظرات: قبلی/بعدی منطقی، آیکن‌ها، حالت disabled در دو انتها، نقش‌های APG
2. مقالات: loop، کنترل توقف autoplay، آیکن‌های آینه‌شده
3. کارگاه‌ها: قبلی در حالت loop به آخرین اسلاید می‌رود
4. کیبورد (`ArrowLeft` → بعدی)، هدف لمسی ۴۴×۴۴، عدم سرریز در ۳۲۰px
5. swipe/درگ موبایل: رفت و برگشت یک اسلاید

### اندازه‌گیری چیدمان

| عرض | اسلاید در دید | سرریز افقی | فاصلهٔ کنترل تا لبهٔ شروع |
|-----|:---:|:---:|:---:|
| 320 | 1.1 (پیک) | 0 | 0 |
| 390 | 1.1 (پیک) | 0 | 0 |
| 768 | 2.1 | 0 | 0 |
| 1024 | 3.2 | 0 | 0 |
| 1440 | 3.1 | 0 | 0 |

ارتفاع کارت‌ها در ۳۹۰px: `288, 284, 284 …` (اختلاف ۴px فقط از حاشیهٔ فوکوس/سایهٔ اسلاید فعال) — بدون فضای مرده.
CLS: **0.0005**؛ عرض اسلاید در ۲ ثانیه اول ثابت (۳۱۵px).

---

## ۸) منابع استنادشده

- Embla Options — https://www.embla-carousel.com/api/options/ (`direction`, `loop`, `align`, `containScroll`, `duration`, `slidesToScroll`)
- Embla Autoplay — https://www.embla-carousel.com/plugins/autoplay/ (`playOnInit`, `stopOnInteraction`, `stopOnMouseEnter`, `stopOnFocusIn`, رویدادهای `autoplay:play|stop`)
- W3C APG Carousel — https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ (region/roledescription/نام از heading، slide group، aria-live روی ریل، چرخش اولین عنصر تب، picker با `aria-disabled`)
- WCAG 2.2 Pause/Stop/Hide — https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- Tailwind RTL variant & breakpoints — https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support، https://tailwindcss.com/docs/responsive-design
- MDN logical properties — https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values
- MDN `env()` — https://developer.mozilla.org/en-US/docs/Web/CSS/env
- NN/g carousels — https://www.nngroup.com/articles/designing-effective-carousels/ (نمایش اسلاید بعدی به‌صورت پیک، نشانگر موقعیت، پرهیز از چرخش خودکار در محتوای خواندنی)

---

## ۹) محدودیت‌های باقی‌مانده

- تست‌ها فقط روی Chromium اجرا شده‌اند (Firefox/WebKit در این محیط نصب نیستند)؛ رفتار swipe در Safari iOS به‌صورت دستی تأیید نشده است.
- تصاویر آواتار و کاور مقاله/کارگاه از داده‌های موجود seed شده‌اند؛ هیچ داده یا متن جدیدی ساخته نشد.
- کارت‌های مقاله/کارگاه ارتفاع متفاوت دارند (محتوا-محور)؛ فقط کارت‌های نظرات ارتفاع یکسان دارند.
- `Slider` هیچ‌جا برای LTR استفاده نمی‌شود؛ آینه‌سازی آیکن‌ها با `rtl:` آمادهٔ آن حالت است اما تست LTR وجود ندارد.
