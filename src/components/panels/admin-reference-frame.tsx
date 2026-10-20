import { PageReveal } from "@/components/layout/page-reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccountMenu } from "@/components/layout/account-menu";
import {
  panelShellClassName,
  adminGlassClassName,
  adminFramePaletteClassName,
  adminFrameStaticStatesClassName,
  panelSkipClassName,
} from "./panel-layout-classes";
import { supportPreview } from "@/features/dashboard/support-preview";
import {
  AdminReferenceNav,
  AdminMobileTrigger,
  AdminTopbarTitle,
} from "./admin-reference-nav";

export async function AdminReferenceFrame({
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
  const notifications = await supportPreview(userId, true);
  return (
    <div
      className={`admin-ref-frame ${adminFramePaletteClassName} ${adminFrameStaticStatesClassName} relative text-[15px] leading-[1.75] ${panelShellClassName}`}
      dir="rtl"
    >
      <a href="#panel-main" className={panelSkipClassName}>
        پرش به محتوای اصلی
      </a>
      <div
        className="admin-ref-decor pointer-events-none fixed inset-0 [background:radial-gradient(50rem_32rem_at_88%_-8%,var(--ar-grad1),transparent_65%),radial-gradient(44rem_30rem_at_6%_108%,var(--ar-grad2),transparent_62%)]"
        aria-hidden="true"
      />
      <AdminReferenceNav />
      <AdminMobileTrigger />
      <div className="admin-ref-shell relative mx-auto flex min-h-dvh w-full max-w-[1120px] flex-col gap-4 px-3.5 pt-4 pb-36 sm:px-5 lg:mx-0 lg:ms-72 lg:w-[calc(100%-288px)] lg:pb-20">
        <header
          className={`admin-ref-topbar admin-ref-glass ${adminGlassClassName} sticky top-3 z-30 flex items-center gap-3 rounded-[18px]! px-3 py-2.5 max-[480.02px]:gap-[.3rem] max-[480.02px]:px-[.65rem]! max-[480.02px]:py-2 min-[480.02px]:max-[1023.02px]:px-4`}
        >
          <AdminTopbarTitle />
          <div className="admin-ref-top-actions ms-auto flex items-center gap-2 max-[480.02px]:gap-[.3rem]">
            <ThemeToggle
              className="admin-ref-icon-btn grid size-11 flex-none cursor-pointer place-items-center rounded-[14px] bg-[var(--ar-surface2)] text-[var(--ar-text2)] [border:1px_solid_var(--panel-line)] hover:bg-[var(--ar-brand-soft)] hover:text-[var(--ar-brand-ink)] max-[480.02px]:size-10!"
              id="admin-theme"
            />
            <AccountMenu
              name={name}
              accountRole="admin"
              image={image}
              userId={userId}
              notifications={notifications}
            />
          </div>
        </header>
        <main id="panel-main" className="admin-ref-main w-full min-w-0">
          <PageReveal>{children}</PageReveal>
        </main>
      </div>
    </div>
  );
}
