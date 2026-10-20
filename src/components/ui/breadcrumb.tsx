import * as React from "react";
import * as Slot from "@radix-ui/react-slot";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/** shadcn/ui Breadcrumb composition, with a left-pointing separator in RTL. */
export function Breadcrumb(props: React.ComponentProps<"nav">) {
  return <nav aria-label="مسیر صفحه" data-slot="breadcrumb" {...props} />;
}
export function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol data-slot="breadcrumb-list" className={cn(className)} {...props} />
  );
}
export function BreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li data-slot="breadcrumb-item" className={cn(className)} {...props} />
  );
}
export function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Component = asChild ? Slot.Root : "a";
  return (
    <Component
      data-slot="breadcrumb-link"
      className={cn(className)}
      {...props}
    />
  );
}
export function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn(className)}
      {...props}
    />
  );
}
export function BreadcrumbSeparator({
  className,
  children,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("site-breadcrumb-separator", className)}
      {...props}
    >
      {children ?? <ChevronLeft size={15} />}
    </li>
  );
}
