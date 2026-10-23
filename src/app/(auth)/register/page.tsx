import { redirect } from "next/navigation";
import { getSession, safeReturnPath } from "@/lib/session";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
  title: "ایجاد حساب کاربری",
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
      title="شروع یک مسیر تازه"
      description="فضایی شخصی برای درخواست وقت و دنبال‌کردن مسیر خودتان."
      registerVisual
    >
      <AuthForm mode="register" next={next} />
    </AuthShell>
  );
}
