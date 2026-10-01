"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu-trigger";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu-content";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu-label";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu-separator";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet-trigger";
import { SheetContent } from "@/components/ui/sheet-content";
import { SheetHeader } from "@/components/ui/sheet-header";
import { SheetTitle } from "@/components/ui/sheet-title";
import { SheetDescription } from "@/components/ui/sheet-description";
import { AccountLinks } from "@/components/layout/account-links";
import { getInitials } from "@/lib/format";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer };

export function AccountMenu({ viewer }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const trigger = <><span className="account-avatar" aria-hidden="true">{getInitials(viewer.name)}</span><span>حساب من</span><ChevronDown aria-hidden="true" /></>;
  return (
    <>
      <div className="account-wide">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} dir="rtl">
          <DropdownMenuTrigger asChild><Button variant="outline" className="account-trigger">{trigger}</Button></DropdownMenuTrigger>
          <DropdownMenuContent isOpen={isDropdownOpen}>
            <DropdownMenuLabel className="account-identity"><strong>{viewer.name}</strong><span dir="ltr">{viewer.email}</span></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <AccountLinks viewer={viewer} isDropdown />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="account-narrow">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild><Button variant="outline" className="account-trigger">{trigger}</Button></SheetTrigger>
          <SheetContent isOpen={isSheetOpen} side="bottom">
            <SheetHeader><SheetTitle>{viewer.name}</SheetTitle><SheetDescription><span dir="ltr">{viewer.email}</span></SheetDescription></SheetHeader>
            <AccountLinks viewer={viewer} onChoose={() => setIsSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
