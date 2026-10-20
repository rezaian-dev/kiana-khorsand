import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
export const metadata = {
  title: "بازیابی رمز عبور",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <AuthShell
      title="بازیابی رمز عبور"
      description="امنیت حساب شما برای ما مهم است."
    >
      <div className="rounded-[15px] border border-[#e1d9ec] bg-white p-[1.1rem] leading-[1.85] dark:border-[#59456d] dark:bg-[#221c32] dark:text-[#f7f3ff] [&>p+p]:mt-[.8rem]">
        <p>
          در حال حاضر ارسال امن کد تأیید فعال نیست؛ به همین دلیل بازیابی آنلاین
          رمز عبور موقتاً در دسترس نیست. هیچ کدی در این صفحه تولید یا نمایش داده
          نمی‌شود.
        </p>
        <p>
          برای راهنمایی، از صفحه تماس پیام بفرستید. اطلاعات حساس یا رمز عبورتان
          را در پیام ننویسید.
        </p>
        <Link
          href="/contact"
          className="mt-4 grid min-h-11 w-full place-items-center rounded-[10px] bg-[#5130ad] px-4 py-[.55rem] font-extrabold text-white dark:bg-[#ad99ff] dark:text-[#1e1731]"
        >
          رفتن به صفحه تماس
        </Link>
      </div>
    </AuthShell>
  );
}
