/**
 * Panel chrome: the heading block every admin/dashboard page opens with, and the
 * empty state it shows when a list has nothing in it yet.
 */
import {
  panelCardClassName,
  panelStackClassName,
  panelButtonClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
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
        <h1 className="text-[clamp(1.6rem,2.5vw,2.25rem)] font-[850] in-[.admin-ref-frame]:text-[clamp(1.45rem,2vw,2rem)] in-[.admin-ref-frame]:tracking-tight">
          {title}
        </h1>
        <p className="leading-[1.9] text-(--panel-muted) in-[.admin-ref-frame]:max-w-[65ch]">
          {description}
        </p>
      </div>
      {(action || toolbar) && (
        <div className="panel-heading-actions in-[.admin-ref-frame]:flex in-[.admin-ref-frame]:flex-wrap in-[.admin-ref-frame]:items-center in-[.admin-ref-frame]:gap-[.6rem] [.admin-ref-frame_&_.panel-button]:gap-[.45rem]">
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
