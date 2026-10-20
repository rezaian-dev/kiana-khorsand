import {
  panelCardClassName,
  panelStackClassName,
  panelButtonClassName,
  panelMutedClassName,
} from "@/components/panels/panel-layout-classes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PanelHeading({
  title,
  description,
  action,
  toolbar,
}: {
  title: string;
  description: string;
  action?: { href: string; label: string };
  toolbar?: React.ReactNode;
}) {
  return (
    <div className="panel-heading mb-6 flex flex-wrap [align-items:end] justify-between gap-4">
      <div>
        <h1 className="text-[clamp(1.6rem,2.5vw,2.25rem)] font-[850] [.admin-ref-frame_&]:text-[clamp(1.45rem,2vw,2rem)] [.admin-ref-frame_&]:tracking-[-.025em]">
          {title}
        </h1>
        <p className="leading-[1.9] text-[var(--panel-muted)] [.admin-ref-frame_&]:max-w-[65ch]">
          {description}
        </p>
      </div>
      {(action || toolbar) && (
        <div className="panel-heading-actions [.admin-ref-frame_&]:flex [.admin-ref-frame_&]:flex-wrap [.admin-ref-frame_&]:items-center [.admin-ref-frame_&]:gap-[.6rem] [.admin-ref-frame_&_.panel-button]:gap-[.45rem]">
          {toolbar}
          {action && (
            <Button
              asChild
              className={`${panelButtonClassName} min-h-11 text-white`}
            >
              <Link href={action.href}>{action.label}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
export function PanelEmpty({
  message,
  href,
  label,
}: {
  message: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className={`${panelCardClassName} ${panelStackClassName}`}>
      <p className={panelMutedClassName}>{message}</p>
      {href && label && (
        <div>
          <Link className={panelButtonClassName} href={href}>
            {label}
          </Link>
        </div>
      )}
    </div>
  );
}
export const appointmentLabels = {
  pending: "در انتظار تأیید",
  confirmed: "تأییدشده",
  completed: "انجام‌شده",
  cancelled: "لغوشده",
  no_show: "عدم حضور",
} as const;
export const paymentLabels = {
  pending: "در انتظار پرداخت",
  paid: "پرداخت‌شده",
  failed: "ناموفق",
  refunded: "برگشت‌خورده",
} as const;
