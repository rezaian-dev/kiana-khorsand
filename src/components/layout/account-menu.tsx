"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu-trigger";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu-content";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu-label";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu-separator";
import { AccountLinks } from "./account-links";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer };

export function AccountMenu({ viewer }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="account-trigger" aria-label="منوی حساب من"><span>حساب من</span><ChevronDown aria-hidden="true" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent isOpen={isOpen}>
        <DropdownMenuLabel className="account-identity"><strong>{viewer.name}</strong><span dir="ltr">{viewer.email}</span></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AccountLinks viewer={viewer} isDropdown />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
