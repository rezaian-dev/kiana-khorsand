import { PanelHeading } from "@/components/panels/ui";
import { SiteToaster } from "@/components/shared/site-toaster";
import { listUsers, userTotals } from "@/features/admin/users/queries";
import { UsersManager } from "@/features/admin/users/ui/users-manager";
import { requireAdmin } from "@/lib/session";

export const metadata = { title: "مدیریت کاربران" };

export default async function AdminUsersPage() {
  const { user } = await requireAdmin();
  const [users, totals] = await Promise.all([listUsers(), userTotals()]);

  return (
    <>
      <PanelHeading
        title="مدیریت کاربران"
        description="مشخصات حساب‌ها، ارتقا به مدیر و حذف حساب — همه با تأیید صریح مدیر و به‌صورت برگشت‌ناپذیر."
        toolbar={
          <dl className="m-0 flex flex-wrap items-center gap-x-5 gap-y-1 text-[.8rem] text-[var(--panel-muted)]">
            <div className="flex items-center gap-1.5">
              <dt>کل حساب‌ها</dt>
              <dd className="m-0 font-extrabold text-[var(--panel-text)]">
                {new Intl.NumberFormat("fa-IR").format(totals.total)}
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt>مدیر</dt>
              <dd className="m-0 font-extrabold text-[var(--panel-text)]">
                {new Intl.NumberFormat("fa-IR").format(totals.admins)}
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt>کاربر</dt>
              <dd className="m-0 font-extrabold text-[var(--panel-text)]">
                {new Intl.NumberFormat("fa-IR").format(totals.clients)}
              </dd>
            </div>
          </dl>
        }
      />
      <UsersManager users={users} currentUserId={user.id} />
      <SiteToaster />
    </>
  );
}
