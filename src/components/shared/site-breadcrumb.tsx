import { BreadcrumbMotionLink } from "./breadcrumb-motion-link";
import { House } from "lucide-react";
import { StructuredData } from "./structured-data";
import { absoluteUrl } from "@/lib/site-urls";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbLinkClasses =
  "rounded-[99px] bg-[color:color-mix(in_srgb,var(--site-violet)_calc(var(--breadcrumb-opacity)*100%),transparent)] px-[0.4rem] py-[0.2rem] text-inherit no-underline [--breadcrumb-opacity:0] motion-reduce:[--breadcrumb-opacity:0]! motion-reduce:text-[var(--site-muted)]! motion-reduce:hover:[--breadcrumb-opacity:0.11]! motion-reduce:hover:text-[var(--site-violet)]! [@media(scripting:none)]:hover:[--breadcrumb-opacity:0.11]! [@media(scripting:none)]:hover:text-[var(--site-violet)]!";

const itemClasses =
  "inline-flex! h-[30px]! min-w-0 shrink-0! items-center! justify-center! leading-[1.3]! last:flex-[0_1_auto]! max-[420px]:[&:not(:last-child)]:max-w-[38%]!";

export function SiteBreadcrumb({
  current,
  parent,
  className = "",
}: {
  current: string;
  parent?: { label: string; href: string };
  className?: string;
}) {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "صفحهٔ نخست",
              item: absoluteUrl("/"),
            },
            ...(parent
              ? [
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: parent.label,
                    item: absoluteUrl(parent.href),
                  },
                ]
              : []),
            { "@type": "ListItem", position: parent ? 3 : 2, name: current },
          ],
        }}
      />
      <Breadcrumb
        className={`site-breadcrumb mb-5 inline-flex min-h-10! max-w-[min(100%,calc(100vw_-_2rem))]! items-center! rounded-[999px] border border-[color:color-mix(in_srgb,var(--site-violet)_15%,var(--site-line))] bg-[color:color-mix(in_srgb,var(--site-surface)_78%,transparent)] px-[0.7rem] py-[0.4rem] align-middle! text-[0.78rem] text-[var(--site-muted)] [box-shadow:0_8px_24px_-20px_#28334d] max-[480.02px]:text-[0.72rem] ${className}`}
      >
        <BreadcrumbList className="flex! w-full! min-w-0 flex-nowrap! items-center! gap-[.3rem]! gap-x-[0.35rem] gap-y-[0.2rem] leading-[1.3]!">
          <BreadcrumbItem className={itemClasses}>
            <BreadcrumbLink
              asChild
              className={`inline-flex! items-center! gap-1! overflow-hidden leading-[1.3]! text-ellipsis whitespace-nowrap [&_svg]:block! [&_svg]:shrink-0! ${breadcrumbLinkClasses}`}
            >
              <BreadcrumbMotionLink href="/" aria-label="صفحهٔ نخست">
                <House size={16} aria-hidden="true" />
                <span>صفحهٔ نخست</span>
              </BreadcrumbMotionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator
            className={`${itemClasses} place-items-center opacity-50 [&_svg]:block! [&_svg]:shrink-0!`}
          />
          {parent && (
            <>
              <BreadcrumbItem className={itemClasses}>
                <BreadcrumbLink
                  asChild
                  className={`inline-flex! items-center! gap-1! overflow-hidden leading-[1.3]! text-ellipsis whitespace-nowrap [&_svg]:block! [&_svg]:shrink-0! ${breadcrumbLinkClasses}`}
                >
                  <BreadcrumbMotionLink href={parent.href}>
                    {parent.label}
                  </BreadcrumbMotionLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator
                className={`${itemClasses} place-items-center opacity-50 [&_svg]:block! [&_svg]:shrink-0!`}
              />
            </>
          )}
          <BreadcrumbItem className={itemClasses}>
            <BreadcrumbPage className="site-breadcrumb-current block! max-w-full! overflow-hidden! leading-[1.3]! font-extrabold text-ellipsis! whitespace-nowrap! text-[var(--site-ink)]">
              {current}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
