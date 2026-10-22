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
import { PanelNav, clientLinks } from "./panel-nav";

/**
 * Shell for the signed-in customer area. Administrator destinations are not part of
 * this frame at all: the panel navigation below only knows about customer routes, and
 * the account menu has no link into `/admin`.
 */
export async function PanelFrame({
  children,
  name,
  image,
  userId,
}: {
  children: React.ReactNode;
  name: string;
  image?: string | null;
  userId: string;
}) {
  const notifications = await supportPreview(userId, false);
  return (
    <div className={panelShellClassName}>
      <a href="#panel-main" className={panelSkipClassName}>
        پرش به محتوای اصلی
      </a>
      <header className="panel-top sticky top-0 z-30 h-[76px] border-b border-[var(--panel-line)] bg-[var(--panel-surface)] max-[320px]:h-[64px]">
        <div className="panel-top-inner flex h-full items-center gap-4 px-[clamp(1rem,3vw,2rem)] max-[480.02px]:gap-2 max-[320px]:gap-1 max-[320px]:px-2">
          <PanelNav links={clientLinks} title="پنل کاربری" />
          <Link
            href="/"
            className="panel-brand flex items-center gap-2 rounded-[.4rem] font-extrabold transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--panel-accent)] focus-visible:ring-offset-2 max-[480.02px]:text-[.9rem]"
            aria-label="بازگشت به صفحه اصلی"
            title="بازگشت به صفحه اصلی"
          >
            <BrandMark size={32} className="rounded-[.55rem]" /> پنل کیانا خرسند
          </Link>
          <div className="panel-top-actions ms-auto flex items-center gap-4 text-[.88rem] max-[480.02px]:[&_span]:hidden">
            <AccountMenu
              name={name}
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
          className="panel-main mx-auto w-full max-w-[1400px] min-w-0 p-[clamp(1rem,3vw,2.5rem)] max-[900.02px]:pb-[calc(100px+env(safe-area-inset-bottom,0px))] max-[320px]:p-[.75rem] max-[320px]:pb-[calc(92px+env(safe-area-inset-bottom,0px))]"
        >
          <PageReveal>{children}</PageReveal>
        </main>
      </div>
    </div>
  );
}
