import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";
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

/**
 * Separate administrator entrance.
 *
 * This page deliberately lives outside the `(protected)` route group of `/admin`, so
 * it renders without the admin shell and without the admin guard. URLs stay the same
 * because a route group never adds a path segment:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
 */
export default async function AdminLoginPage() {
  const session = await getSession();
  if (session?.user.role === "admin") redirect("/admin");

  const signedInAsUser = Boolean(session);

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[var(--site-bg)] px-4 py-10 text-[var(--site-ink)] sm:px-6">
      {/* Ambient brand light, kept decorative and out of the accessibility tree. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(48rem_32rem_at_85%_-10%,color-mix(in_srgb,var(--c-plum)_16%,transparent),transparent_65%),radial-gradient(40rem_28rem_at_5%_110%,color-mix(in_srgb,var(--c-teal)_16%,transparent),transparent_62%)]"
      />

      <div className="relative grid w-full max-w-[980px] overflow-hidden rounded-[1.6rem] border border-[var(--site-line)] bg-[var(--site-surface)] shadow-[0_40px_120px_-60px_#1d16334f] md:grid-cols-[1.05fr_.95fr]">
        {/* Form side — starts on the inline-start edge in RTL. */}
        <section
          aria-labelledby="admin-login-title"
          className="flex flex-col justify-center gap-6 p-6 sm:p-9"
        >
          <div className="flex items-center gap-3">
            <BrandMark size={42} priority />
            <div className="min-w-0">
              <p className="m-0 text-[.72rem] font-extrabold tracking-[.08em] text-[var(--site-muted)]">
                کیانا خرسند
              </p>
              <p className="m-0 text-[.9rem] font-bold">پنل مدیریت</p>
            </div>
          </div>

          <header className="grid gap-2">
            <h1
              id="admin-login-title"
              className="m-0 text-[1.45rem] leading-[1.5] font-extrabold sm:text-[1.6rem]"
            >
              ورود به فضای مدیریت
            </h1>
            <p className="m-0 text-[.86rem] leading-7 text-[var(--site-muted)]">
              این مسیر فقط برای مدیران سایت است. حساب‌های کاربری از صفحهٔ{" "}
              <Link
                href="/login"
                className="font-bold text-[var(--c-teal)] underline underline-offset-4"
              >
                ورود کاربران
              </Link>{" "}
              وارد می‌شوند.
            </p>
          </header>

          {signedInAsUser && (
            <div className="grid gap-2 rounded-[.9rem] border border-[#dcd2ea] bg-[#f7f2ff] px-4 py-3 text-[.82rem] leading-6 text-[#4a3a6b] dark:border-[#4a3f63] dark:bg-[#2a2439] dark:text-[#ddd2f7]">
              <p className="m-0 font-bold">
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
        </section>

        {/* Editorial side — hidden on phones, where it would only cost height. */}
        <aside
          aria-hidden="true"
          className="relative hidden flex-col justify-between overflow-hidden bg-[linear-gradient(155deg,#123c40,#1d2a4a_55%,#2a1c3d)] p-8 text-[#eefaf7] md:flex"
        >
          <div className="absolute inset-0 [background:radial-gradient(22rem_18rem_at_100%_0%,#4fd0c755,transparent_60%),radial-gradient(20rem_16rem_at_0%_100%,#b07bd855,transparent_60%)]" />
          <div className="relative flex items-center gap-2 text-[.8rem] font-bold tracking-[.04em] text-[#bfe9e2]">
            <ShieldCheck className="size-4" />
            دسترسی محدود
          </div>

          <div className="relative grid gap-4">
            <span className="grid size-14 place-items-center rounded-[1.1rem] border border-white/25 bg-white/10">
              <LockKeyhole className="size-6" />
            </span>
            <p className="m-0 max-w-[26ch] text-[1.15rem] leading-9 font-extrabold">
              همهٔ امکانات سایت، از محتوا تا برندینگ، از همین‌جا مدیریت می‌شود.
            </p>
            <p className="m-0 max-w-[30ch] text-[.8rem] leading-6 text-[#c3ded9]">
              ورود کارکنان از این مسیر انجام می‌شود؛ حساب مراجعان از مسیر عمومی سایت
              جدا است.
            </p>
          </div>

          <p className="relative m-0 text-[.72rem] text-[#9fc2bd]">
            kianakhorsand.ir · مدیریت
          </p>
        </aside>
      </div>
    </main>
  );
}
