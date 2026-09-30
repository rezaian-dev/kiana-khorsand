"use client";

import { useState } from "react";
import { CalendarDays, CircleCheck, RefreshCw, TriangleAlert } from "lucide-react";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs-list";
import { TabsTrigger } from "@/components/ui/tabs-trigger";
import { TabsContent } from "@/components/ui/tabs-content";
import { Button } from "@/components/ui/button";
import { getTravel, motionTokens } from "@/lib/motion";

const states = ["empty", "error", "success"] as const;

export function StateDemo() {
  const [state, setState] = useState("empty");
  const isReduced = useReducedMotion();
  const index = states.findIndex((value) => value === state);
  return (
    <div className="state-demo"><h3>حالت‌ها هم بخشی از طراحی‌اند.</h3><p className="muted">نمایش نمونهٔ خالی، خطا و موفقیت؛ بدون نوبت یا عملیات واقعی.</p>
      <Tabs value={state} onValueChange={setState} dir="rtl">
        <TabsList className="state-tabs"><m.span aria-hidden="true" className="tab-indicator" initial={false} animate={{ x: `${getTravel(index * -100)}%` }} transition={isReduced ? { duration: 0 } : motionTokens.spring} /><TabsTrigger value="empty">خالی</TabsTrigger><TabsTrigger value="error">خطا</TabsTrigger><TabsTrigger value="success">موفقیت</TabsTrigger></TabsList>
        <TabsContent value="empty"><div className="state-panel"><CalendarDays className="state-symbol" aria-hidden="true" /><h4>هنوز نوبتی ثبت نشده.</h4><p>در نسخهٔ نهایی، نوبت‌های شما اینجا دیده می‌شوند.</p><span className="sample-tag">نمونهٔ طراحی</span></div></TabsContent>
        <TabsContent value="error"><div className="state-panel"><TriangleAlert className="state-symbol state-error" aria-hidden="true" /><h4>دریافت اطلاعات انجام نشد.</h4><p>اطلاعات قبلی حفظ می‌شود؛ می‌توانید دوباره تلاش کنید.</p><Button variant="outline" type="button" onClick={() => setState("success")}><RefreshCw aria-hidden="true" />نمایش حالت موفق</Button></div></TabsContent>
        <TabsContent value="success"><div className="state-panel"><CircleCheck className="state-symbol state-success" aria-hidden="true" /><h4>نمونهٔ موفقیت آماده است.</h4><p>این تغییر فقط نمایشی است و چیزی ذخیره نشده.</p><span className="sample-tag">نمونهٔ طراحی</span></div></TabsContent>
      </Tabs>
    </div>
  );
}
