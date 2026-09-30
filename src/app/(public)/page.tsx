import Link from "next/link";
import { routes } from "@/lib/constants";

export default function Page() {
  return (
    <main className="logo-preview">
      <div className="preview-shell">
        <p className="preview-eyebrow">فاز ۱ · بررسی نشان</p>
        <h1>زیرساخت وب‌سایت</h1>
        <p>صفحات عمومی هنوز ساخته نشده‌اند؛ سه طرح لوگو برای انتخاب شما آماده است.</p>
        <Link className="preview-choice" href={routes.logoPreview}>
          مشاهدهٔ سه طرح لوگو و نمونه‌های روشن، تیره و تک‌رنگ
        </Link>
      </div>
    </main>
  );
}
