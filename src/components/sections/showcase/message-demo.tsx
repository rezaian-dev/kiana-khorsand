"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { ArrowUpLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "@/lib/message";
import { notices } from "@/content/profile";

export function MessageDemo() {
  const id = useId();
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<z.infer<typeof messageSchema>>({ resolver: zodResolver(messageSchema), defaultValues: { name: "", message: "" }, mode: "onSubmit" });
  function handleValidate() { toast.success("نمونه معتبر است؛ هیچ اطلاعاتی ارسال یا ذخیره نشد."); }
  return (
    <form noValidate onSubmit={handleSubmit(handleValidate)} className="demo-form" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>فرم نمونه، بدون ارسال</h3><p className="muted">برای دیدن حالت خطا، ابتدا فرم خالی را بررسی کنید. از اطلاعات واقعی یا حساس استفاده نکنید.</p>
      <div><Label htmlFor={`${id}-name`}>نام نمونه</Label><Input id={`${id}-name`} placeholder="یک نام آزمایشی" autoComplete="off" maxLength={80} aria-invalid={Boolean(errors.name)} aria-describedby={`${id}-name-error`} {...register("name")} /><p id={`${id}-name-error`} className="field-error" aria-live="polite">{errors.name?.message}</p></div>
      <div><Label htmlFor={`${id}-message`}>پیام نمونه</Label><Textarea id={`${id}-message`} rows={4} maxLength={1000} placeholder="یک پیام آزمایشی کوتاه بنویسید…" aria-invalid={Boolean(errors.message)} aria-describedby={`${id}-message-error`} {...register("message")} /><p id={`${id}-message-error`} className="field-error" aria-live="polite">{errors.message?.message}</p></div>
      <p className="privacy-note"><ShieldCheck aria-hidden="true" />{notices.confidentiality}</p>
      <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="form-submit"><span>{isSubmitting ? "در حال بررسی…" : "بررسی نمونه"}</span><ArrowUpLeft aria-hidden="true" /></Button>
      <p className="form-result" role="status">{isSubmitSuccessful ? "اعتبارسنجی انجام شد؛ این نمونه هیچ ارتباطی با سرور ندارد." : ""}</p>
    </form>
  );
}
