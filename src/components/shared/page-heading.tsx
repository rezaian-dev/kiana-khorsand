import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { routes } from "@/lib/constants";

type Props = { title: string; description: string; eyebrow?: string; breadcrumb?: string; parents?: readonly { label: string; href: string }[] };

export function PageHeading({ title, description, eyebrow, breadcrumb = title, parents = [] }: Props) {
  return (
    <div className="page-heading">
      <nav aria-label="مسیر صفحه" className="breadcrumbs"><Link href={routes.home} data-interact="control">صفحه اصلی</Link><ChevronLeft aria-hidden="true" />{parents.map((parent) => <span className="breadcrumb-parent" key={parent.href}><Link href={parent.href} data-interact="control">{parent.label}</Link><ChevronLeft aria-hidden="true" /></span>)}<span aria-current="page">{breadcrumb}</span></nav>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h1>{title}</h1><p className="page-description">{description}</p>
    </div>
  );
}
