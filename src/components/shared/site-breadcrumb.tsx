import { House } from "lucide-react";
import { cn } from "@/lib/utils";
import { absoluteUrl } from "@/lib/site-urls";
import { StructuredData } from "./structured-data";
import { BreadcrumbMotionLink } from "./breadcrumb-motion-link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Page path pill.
 *
 * Mobile-first rules that keep it readable at 320px:
 * - the home label collapses to its icon (the accessible name stays),
 * - the parent crumb is capped and truncated,
 * - the current page is the only flexible item, so it ellipsises instead of pushing
 *   the trail out of the pill.
 * Nothing wraps: the list is a single `nowrap` row inside a `max-w-full` shell.
 */
const shell =
  "mb-5 inline-flex max-w-full items-center rounded-full border border-[color:color-mix(in_srgb,var(--site-violet)_16%,var(--site-line))] bg-[color:color-mix(in_srgb,var(--site-surface)_82%,transparent)] px-1.5 py-1 text-[.78rem] text-[var(--site-muted)] backdrop-blur-[2px] [box-shadow:0_8px_24px_-20px_#28334d] max-[480.02px]:text-[.73rem]";

const link =
  "flex min-w-0 items-center gap-1.5 rounded-full px-2 py-1 no-underline transition-colors duration-150 hover:bg-[color:color-mix(in_srgb,var(--site-violet)_9%,transparent)] hover:text-[var(--site-violet)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-violet)]";

const separator = "flex shrink-0 items-center opacity-45";

export function SiteBreadcrumb({
  current,
  parent,
  className,
}: {
  current: string;
  parent?: { label: string; href: string };
  className?: string;
}) {
  const trail = [
    { name: "صفحهٔ نخست", item: absoluteUrl("/") },
    ...(parent ? [{ name: parent.label, item: absoluteUrl(parent.href) }] : []),
  ];

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            ...trail.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              ...crumb,
            })),
            {
              "@type": "ListItem",
              position: trail.length + 1,
              name: current,
            },
          ],
        }}
      />
      <Breadcrumb className={cn(shell, className)}>
        <BreadcrumbList className="flex min-w-0 flex-nowrap items-center gap-0.5">
          <BreadcrumbItem className="shrink-0">
            <BreadcrumbLink asChild className={link}>
              <BreadcrumbMotionLink href="/" aria-label="صفحهٔ نخست">
                <House size={15} aria-hidden="true" className="shrink-0" />
                <span className="hidden sm:inline">صفحهٔ نخست</span>
              </BreadcrumbMotionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className={separator} />

          {parent && (
            <>
              <BreadcrumbItem className="max-w-[42%] min-w-0 shrink-0 sm:max-w-[16rem]">
                <BreadcrumbLink asChild className={link}>
                  <BreadcrumbMotionLink href={parent.href}>
                    <span className="truncate">{parent.label}</span>
                  </BreadcrumbMotionLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className={separator} />
            </>
          )}

          <BreadcrumbItem className="min-w-0 flex-1">
            <BreadcrumbPage className="block truncate px-2 py-1 font-extrabold text-[var(--site-ink)]">
              {current}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
