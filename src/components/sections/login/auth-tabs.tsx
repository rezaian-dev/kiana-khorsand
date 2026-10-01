"use client";

import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs-list";
import { TabsTrigger } from "@/components/ui/tabs-trigger";
import { TabsContent } from "@/components/ui/tabs-content";
import { AuthForm } from "./auth-form";

type Props = { isReady: boolean };

export function AuthTabs({ isReady }: Props) {
  return <Tabs defaultValue="login" dir="rtl" className="auth-tabs"><TabsList aria-label="ورود یا ساخت حساب"><TabsTrigger value="login">ورود</TabsTrigger><TabsTrigger value="register">ثبت‌نام</TabsTrigger></TabsList><TabsContent value="login" forceMount><AuthForm isRegister={false} isReady={isReady} /></TabsContent><TabsContent value="register" forceMount><AuthForm isRegister isReady={isReady} /></TabsContent></Tabs>;
}
