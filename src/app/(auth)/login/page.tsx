import { redirect } from "next/navigation";
import { getSession, safeReturnPath } from "@/lib/session";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: "ورود به حساب کاربری",
  robots: { index: false, follow: false },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  if (await getSession()) redirect(safeReturnPath(next ?? null));
  return (
    <AuthShell
      loginVisual
      title="خوش آمدید"
      description="برای مدیریت نوبت‌ها و دسترسی به حساب خود وارد شوید."
    >
      <AuthForm mode="login" next={next} />
    </AuthShell>
  );
}
