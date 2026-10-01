"use client";

import { useState, useTransition } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";
import { saveSidebar } from "@/server/actions/sidebar";

type Props = { isCollapsed: boolean };

export function SidebarToggle({ isCollapsed }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isUncertain, setIsUncertain] = useState(false);
  function handleToggle() {
    if (isPending || isUncertain) return;
    startTransition(async () => {
      try {
        const result = await saveSidebar({ isCollapsed: !isCollapsed });
        if (!result.isSuccess) { setIsUncertain(true); toast.error("ترجیح منو تأیید نشد؛ پیش از تغییر دوباره، صفحه را بازخوانی کنید."); }
      } catch { setIsUncertain(true); toast.error("نتیجهٔ تغییر منو روشن نیست؛ صفحه را بازخوانی کنید."); }
    });
  }
  return <div className="sidebar-control" data-live-pause={isPending}><Button type="button" variant="outline" size="icon" onClick={handleToggle} disabled={isPending || isUncertain} aria-busy={isPending} aria-controls="admin-sidebar" aria-expanded={!isCollapsed} aria-label={isCollapsed ? "گسترش منوی مدیریت" : "جمع‌کردن منوی مدیریت"}>{isCollapsed ? <PanelRightOpen aria-hidden="true" /> : <PanelRightClose aria-hidden="true" />}</Button>{isUncertain && <a href={routes.admin} className="quiet-link">بازخوانی</a>}</div>;
}
