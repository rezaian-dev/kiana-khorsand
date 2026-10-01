"use client";

import { useId, useState, type ReactNode } from "react";
import { Popover } from "radix-ui";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/format";
import { motionTokens } from "@/lib/motion";

type Props = { unread: number; children: ReactNode };

export function Notifications({ unread, children }: Props) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const isReduced = useReducedMotion();
  return <Popover.Root open={isOpen} onOpenChange={setIsOpen}><Popover.Trigger asChild><Button variant="outline" size="icon" className="notification-trigger" aria-label={`اعلان‌ها؛ ${formatNumber(unread)} پیام خوانده‌نشده`}><Bell aria-hidden="true" />{unread > 0 && <span className="notification-dot" aria-hidden="true" />}</Button></Popover.Trigger><Popover.Portal forceMount><AnimatePresence initial={false}>{isOpen && <Popover.Content forceMount asChild align="end" sideOffset={12} collisionPadding={12} aria-labelledby={id}><m.section onClick={(event) => { if (event.target instanceof Element && event.target.closest("a")) setIsOpen(false); }} className="admin-notifications" dir="rtl" data-live-pause={isOpen} initial={{ opacity: 0, y: isReduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: isReduced ? 0 : -8 }} transition={{ duration: isReduced ? 0 : motionTokens.ui }}><div className="notification-heading"><h2 id={id}>پیام‌های خوانده‌نشده</h2><Popover.Close asChild><Button size="icon" variant="outline" aria-label="بستن اعلان‌ها"><X aria-hidden="true" /></Button></Popover.Close></div><p className="muted">{formatNumber(unread)} پیام؛ بازکردن این پنجره وضعیت خواندن را تغییر نمی‌دهد.</p>{children}</m.section></Popover.Content>}</AnimatePresence></Popover.Portal></Popover.Root>;
}
