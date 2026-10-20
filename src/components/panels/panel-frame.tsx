import { BrandMark } from "@/components/shared/brand-mark";
import Link from "next/link";
import { PageReveal } from "@/components/layout/page-reveal";
import { AccountMenu } from "@/components/layout/account-menu";
import {
  panelShellClassName,
  panelSkipClassName,
} from "./panel-layout-classes";
import { signOutAction } from "@/actions/auth";
import { supportPreview } from "@/features/dashboard/support-preview";
import { PanelNav, clientLinks, adminLinks } from "./panel-nav";

export async function PanelFrame({
  children,
  name,
  image,
  userId,
  mode = "client",
  role = "client",
}: {
  children: React.ReactNode;
  name: string;
  image?: string | null;
  userId: string;
  mode?: "client" | "admin";
  role?: string;
}) {
  const isAdmin = mode === "admin";
  const notifications = await supportPreview(userId, isAdmin);
  return (
    <div className={`${panelShellClassName} ${isAdmin ? "panel-admin" : ""}`}>
      <a href="#panel-main" className={panelSkipClassName}>
        پرش به محتوای اصلی
      </a>
      <header className="panel-top sticky top-0 z-30 h-[76px] border-b border-[var(--panel-line)] bg-[var(--panel-surface)]">
        <div className="panel-top-inner flex h-full items-center gap-4 px-[clamp(1rem,3vw,2rem)] max-[480.02px]:gap-2">
          <PanelNav
            links={isAdmin ? adminLinks : clientLinks}
            title={isAdmin ? "مدیریت سایت" : "پنل کاربری"}
          />
          <Link
            href={isAdmin ? "/admin" : "/dashboard"}
            className="panel-brand flex items-center gap-2 font-extrabold max-[480.02px]:text-[.9rem]"
          >
            <BrandMark size={32} className="rounded-[.55rem]" /> پنل کیانا خرسند
          </Link>
          <div className="panel-top-actions ms-auto flex items-center gap-4 text-[.88rem] max-[480.02px]:[&_span]:hidden">
            <AccountMenu
              name={name}
              accountRole={role}
              image={image}
              userId={userId}
              notifications={notifications}
            />
            <span>{name}</span>
            <form action={signOutAction}>
              <button
                className="min-h-11 cursor-pointer font-extrabold text-[var(--panel-accent)]"
                type="submit"
              >
                خروج
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="panel-layout grid grid-cols-[244px_minmax(0,1fr)] max-[900.02px]:block">
        <div
          className="panel-sidebar-space max-[900.02px]:hidden"
          aria-hidden="true"
        />
        <main
          id="panel-main"
          className="panel-main mx-auto w-full max-w-[1400px] min-w-0 p-[clamp(1rem,3vw,2.5rem)]"
        >
          <PageReveal>{children}</PageReveal>
        </main>
      </div>
    </div>
  );
}
