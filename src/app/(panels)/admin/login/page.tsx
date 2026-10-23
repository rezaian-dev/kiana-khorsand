import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  FileStack,
  MessagesSquare,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { AdminLoginForm } from "@/components/auth/admin-login-form";
import { getSession } from "@/lib/session";
import { signOutAction } from "@/actions/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "ورود مدیران",
  robots: { index: false, follow: false },
};

const highlights = [
  { Icon: FileStack, title: "محتوا", note: "مقاله‌ها، خدمات و کارگاه‌ها" },
  { Icon: CalendarDays, title: "تقویم", note: "نوبت‌ها، ساعت‌ها و تعطیلی‌ها" },
  {
    Icon: MessagesSquare,
    title: "ارتباط",
    note: "پیام‌ها، پرداخت‌ها و مراجعان",
  },
];

/**
 * Separate administrator entrance.
 *
 * This page deliberately lives outside the `(protected)` route group of `/admin`, so
 * it renders without the admin shell and without the admin guard:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
 *
 * It is also the landing page when an administrator types `/admin` in the installed
 * PWA, where no browser chrome exists — hence the safe-area padding and the full
 * mobile layout that needs no hover.
 */
export default async function AdminLoginPage() {
  const session = await getSession();
  if (session?.user.role === "admin") redirect("/admin");

  const signedInAsUser = Boolean(session);

  return (
    <main className="relative isolate grid [--c-teal:#148b80] [--c-plum:#a63cad] dark:[--c-teal:#4ecdbc] dark:[--c-plum:#dfa0e6] min-h-dvh place-items-center overflow-hidden bg-[#f3f6fa] px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] text-[var(--site-ink)] sm:px-6 dark:bg-[#070b14]">
      {/* Ambient stage: three slow brand lights over a faint grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 [background-image:radial-gradient(60rem_40rem_at_80%_-10%,#bfe9e4cc,transparent_62%),radial-gradient(46rem_34rem_at_4%_104%,#d8cdf6cc,transparent_60%)] dark:[background-image:radial-gradient(60rem_40rem_at_80%_-10%,#0f4a4a99,transparent_62%),radial-gradient(46rem_34rem_at_4%_104%,#2b1f5e99,transparent_60%)]" />
        <div className="admin-aurora absolute start-[18%] -top-24 size-[26rem] rounded-full bg-[#59c8bb]/30 blur-[90px] dark:bg-[#1fa596]/35" />
        <div className="admin-aurora admin-aurora-slow absolute end-[8%] -bottom-32 size-[30rem] rounded-full bg-[#a98cf0]/28 blur-[110px] dark:bg-[#6f4fd6]/35" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#0b1a3320_1px,transparent_1px),linear-gradient(to_bottom,#0b1a3320_1px,transparent_1px)] [mask-image:radial-gradient(70%_60%_at_50%_45%,#000,transparent)] [background-size:56px_56px] opacity-[.35] dark:[background-image:linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] dark:opacity-25" />
      </div>

      <div className="grid w-full max-w-[1120px] items-stretch gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,.9fr)] lg:gap-7">
        {/* Glass card — the form. */}
        <section
          aria-labelledby="admin-login-title"
          className="relative flex flex-col gap-6 rounded-[1.9rem] border border-white/70 bg-white/70 p-6 shadow-[0_44px_110px_-58px_#16233d,inset_0_1px_0_#fff] backdrop-blur-2xl sm:p-9 dark:border-white/10 dark:bg-[#111827]/70 dark:shadow-[0_50px_130px_-50px_#000,inset_0_1px_0_#ffffff1a]"
        >
          <header className="grid gap-4">
            <div className="flex items-center gap-3">
              <span className="relative grid size-11 flex-none place-items-center rounded-[.95rem] border border-white/70 bg-white/80 shadow-[0_10px_24px_-18px_#16233d] dark:border-white/10 dark:bg-white/5">
                <BrandMark size={32} priority />
              </span>
              <div className="min-w-0">
                <p className="m-0 text-[.72rem] font-extrabold tracking-[.14em] text-[var(--site-muted)] uppercase">
                  Kiana Khorsand
                </p>
                <p className="m-0 text-[.92rem] font-extrabold">پنل مدیریت</p>
              </div>
            </div>

            <div className="grid gap-2">
              <h1
                id="admin-login-title"
                className="m-0 text-[1.5rem] leading-[1.45] font-extrabold tracking-tight sm:text-[1.7rem]"
              >
                ورود به فضای مدیریت
              </h1>
              <p className="m-0 max-w-[42ch] text-[.85rem] leading-7 text-[var(--site-muted)]">
                این مسیر فقط برای مدیران سایت است. حساب مراجعان از صفحهٔ{" "}
                <Link
                  href="/login"
                  className="font-extrabold text-[var(--c-teal)] underline decoration-[color:color-mix(in_srgb,var(--c-teal)_35%,transparent)] underline-offset-4 hover:decoration-[var(--c-teal)]"
                >
                  ورود کاربران
                </Link>{" "}
                باز می‌شود.
              </p>
            </div>
          </header>

          {signedInAsUser && (
            <div className="grid gap-2 rounded-[1rem] border border-[#d9cff0] bg-[#f6f1ff]/80 px-4 py-3 text-[.82rem] leading-6 text-[#4a3a6b] dark:border-[#4a3f63] dark:bg-[#2a2439]/80 dark:text-[#ddd2f7]">
              <p className="m-0 font-extrabold">
                اکنون با حساب «{session?.user.name}» وارد شده‌اید.
              </p>
              <p className="m-0">
                برای ورود با حساب مدیر، ابتدا از حساب فعلی خارج شوید.
              </p>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="cursor-pointer text-[.8rem] font-extrabold text-[#6b3fb8] underline underline-offset-4 dark:text-[#c9b4ff]"
                >
                  خروج از حساب فعلی
                </button>
              </form>
            </div>
          )}

          <AdminLoginForm />

          <p className="m-0 flex items-start gap-2 border-t border-white/60 pt-4 text-[.75rem] leading-6 text-[var(--site-muted)] dark:border-white/10">
            <ShieldCheck
              className="mt-0.5 size-4 flex-none text-[var(--c-teal)]"
              aria-hidden="true"
            />
            تلاش‌های ورود ناموفق محدود می‌شوند و نشست این بخش جدا از حساب کاربری
            است.
          </p>
        </section>

        {/* Editorial side — the "why", plus the installed-app route into this page. */}
        <aside className="relative hidden flex-col justify-between overflow-hidden rounded-[1.9rem] border border-white/15 [background-image:linear-gradient(160deg,#0f3f45,#16233f_58%,#241a3c)] p-8 text-[#eaf7f4] shadow-[0_40px_100px_-56px_#0b1626] lg:flex">
          <div
            aria-hidden="true"
            className="absolute inset-0 [background:radial-gradient(20rem_16rem_at_100%_0%,#4fd0c740,transparent_62%),radial-gradient(22rem_18rem_at_0%_100%,#b07bd83d,transparent_62%)]"
          />
          <div className="relative flex items-center gap-2 text-[.74rem] font-extrabold tracking-[.16em] text-[#a8ded6] uppercase">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Restricted access
          </div>

          <div className="relative grid gap-6">
            <p className="m-0 max-w-[24ch] text-[1.28rem] leading-[1.75] font-extrabold text-balance">
              همهٔ سایت — از محتوا تا برندینگ — از همین‌جا اداره می‌شود.
            </p>
            <ul className="m-0 grid list-none gap-3 p-0">
              {highlights.map(({ Icon, title, note }) => (
                <li key={title} className="flex items-center gap-3">
                  <span className="grid size-9 flex-none place-items-center rounded-[.7rem] border border-white/20 bg-white/10">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[.84rem] font-extrabold">
                      {title}
                    </span>
                    <span className="block text-[.76rem] text-[#b6cfd3]">
                      {note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative grid gap-3 rounded-[1.1rem] border border-white/15 bg-white/[.07] p-4">
            <p className="m-0 flex items-center gap-2 text-[.8rem] font-extrabold">
              <Smartphone
                className="size-4 text-[#8fe3d8]"
                aria-hidden="true"
              />
              روی موبایل، اپ را نصب کنید
            </p>
            <p className="m-0 text-[.76rem] leading-6 text-[#b6cfd3]">
              در نسخهٔ نصب‌شده نوار آدرس وجود ندارد؛ با فرمان «رفتن به آدرس»
              کافی است
              <span
                dir="ltr"
                className="mx-1 rounded bg-black/25 px-1.5 py-0.5 font-mono text-[.72rem] text-[#d8f5ef]"
              >
                /admin
              </span>
              را وارد کنید تا همین صفحه باز شود.
            </p>
          </div>

          <p className="relative m-0 text-[.72rem] tracking-[.04em] text-[#9fc2bd]">
            kianakhorsand · مدیریت
          </p>
        </aside>
      </div>
    </main>
  );
}
