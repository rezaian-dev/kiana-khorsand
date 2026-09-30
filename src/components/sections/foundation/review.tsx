import { ArrowDownToLine, Check } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { brand } from "@/content/brand";
import { gradients } from "@/content/gradients";

export function Review() {
  return (
    <main className="foundation">
      <div className="foundation-shell">
        <div className="foundation-top">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="foundation-intro">
          <p className="foundation-kicker">فاز دوم · هویت، رنگ و نوشتار</p>
          <h1>امضایی برای همراهی.</h1>
          <p>
            نشان «ب» با ترکیب نماد و نام برای سربرگ و پابرگ انتخاب شد.
            این صفحه فقط برای بازبینی پایه‌های طراحی است؛ صفحهٔ اصلی و
            بخش‌های تعاملی هنوز ساخته نشده‌اند.
          </p>
        </div>
        <div className="foundation-grid">
          <section className="foundation-card foundation-mark" aria-labelledby="brand-heading">
            <h2 id="brand-heading">امضای همراه</h2>
            <p>گلبرگ نیلوفر، بازوی سای و حرف آغازین نام؛ یک هویت شخصی، نه نشان یک مرکز.</p>
            <div className="foundation-stage">
              <Logo />
            </div>
            <p className="foundation-note">فایل‌های برداری نهایی، با نوشتهٔ فارسیِ تبدیل‌شده به مسیر:</p>
            <div className="foundation-downloads">
              {brand.files.map((file) => (
                <Button key={file.path} asChild variant="outline" size="sm">
                  <a href={file.path} download>
                    <ArrowDownToLine aria-hidden="true" />
                    <span>{file.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </section>
          <section className="foundation-card" aria-labelledby="type-heading">
            <h2 id="type-heading">خوانا، ساده، نزدیک</h2>
            <p>وزیرمتن متغیر، از فایل محلی و بدون درخواست به سرویس فونت خارجی.</p>
            <p className="foundation-type">گاهی، شروع از یک گفت‌وگوست.</p>
            <p>برای حرف‌هایی که گفتنشان آسان نیست، می‌شود با قدمی کوچک شروع کرد.</p>
            <dl className="foundation-specs">
              <div><dt>وزن‌های نوشتار</dt><dd>۱۰۰ تا ۹۰۰</dd></div>
              <div><dt>اندازهٔ پایهٔ متن</dt><dd>۱۶ پیکسل</dd></div>
              <div><dt>چینش صفحات</dt><dd>فارسی و راست‌به‌چپ</dd></div>
              <div><dt>ظاهر سایت</dt><dd>روشن و تیره، با ساختار یکسان</dd></div>
            </dl>
          </section>
        </div>
        <section className="foundation-card foundation-palette" aria-labelledby="color-heading">
          <h2 id="color-heading">رنگ‌هایی با حال‌وهوای متفاوت</h2>
          <p>
            شانزده خانوادهٔ گرادیان؛ رنگ‌های درخشان برای تأکید و سطح‌های ملایم‌تر
            برای خواندن. با دکمهٔ بالای صفحه، ظاهر دیگر را هم ببینید.
          </p>
          <div className="foundation-swatches">
            {gradients.map((gradient) => (
              <figure key={gradient.key} className="foundation-swatch">
                <div style={{ backgroundImage: `var(--gradient-${gradient.key})` }} aria-hidden="true" />
                <figcaption>{gradient.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <div className="foundation-end">
          <p>
            <Check className="inline size-5 align-middle" aria-hidden="true" />{" "}
            انتخاب نشان ثبت شد. پیش‌نمایش سه‌طرحی حذف شده و این صفحه در موتورهای
            جست‌وجو برای نمایه‌سازی ارائه نمی‌شود.
          </p>
          <Button asChild>
            <a href="/brand/lockup-light.svg" download>
              <ArrowDownToLine aria-hidden="true" />
              دریافت نشان منتخب
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
