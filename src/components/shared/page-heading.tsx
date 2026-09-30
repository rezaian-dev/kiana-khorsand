import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { routes } from "@/lib/constants";

type Props = { title: string; description: string; eyebrow?: string; breadcrumb?: string };

export function PageHeading({ title, description, eyebrow, breadcrumb = title }: Props) {
  return (
    <div className="page-heading">
      <nav aria-label="مسیر صفحه" className="breadcrumbs"><Link href={routes.home}>صفحه اصلی</Link><ChevronLeft aria-hidden="true" /><span aria-current="page">{breadcrumb}</span></nav>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h1>{title}</h1><p className="page-description">{description}</p>
    </div>
  );
}
