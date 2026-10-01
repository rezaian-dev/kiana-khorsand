"use client";

import { useId, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { agendaSchema, buildAgenda, type AgendaQuery } from "@/lib/agenda";
import { appointmentLabels } from "@/lib/visits";
import { routes } from "@/lib/constants";

type Props = { query: AgendaQuery; services: { key: string; title: string }[] };

export function AgendaFilter({ query, services }: Props) {
  const id = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<z.input<typeof agendaSchema>, unknown, AgendaQuery>({ resolver: zodResolver(agendaSchema), defaultValues: query });
  function handleFilter(values: AgendaQuery) { reset({ ...values, page: 1 }); startTransition(() => router.push(buildAgenda({ ...values, page: 1 }), { scroll: false })); }
  return <form className="admin-filter" action={routes.agenda} method="get" noValidate role="search" aria-busy={isPending} data-live-pause={isPending || isDirty} onSubmit={handleSubmit(handleFilter)}><fieldset disabled={isPending}><legend className="sr-only">فیلتر نوبت‌ها</legend><div className="filter-fields"><div><label htmlFor={`${id}-q`}>شناسهٔ کامل نوبت</label><Input {...register("q")} id={`${id}-q`} maxLength={24} autoComplete="off" dir="ltr" aria-invalid={!!errors.q} aria-describedby={`${id}-error`} /></div><div><label htmlFor={`${id}-status`}>وضعیت</label><select {...register("status")} id={`${id}-status`} className="admin-select"><option value="all">همهٔ وضعیت‌ها</option>{Object.entries(appointmentLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><div><label htmlFor={`${id}-service`}>نوع جلسه</label><select {...register("service")} id={`${id}-service`} className="admin-select"><option value="all">همهٔ خدمات</option>{services.map((service) => <option key={service.key} value={service.key}>{service.title}</option>)}</select></div><div><label htmlFor={`${id}-sort`}>ترتیب زمان</label><select {...register("sort")} id={`${id}-sort`} className="admin-select"><option value="ascending">قدیمی‌تر به تازه‌تر</option><option value="descending">تازه‌تر به قدیمی‌تر</option></select></div></div><input type="hidden" {...register("date")} /><input type="hidden" {...register("view")} /><input type="hidden" {...register("client")} /><Button type="submit">{isPending ? "در حال دریافت…" : "اعمال فیلتر"}</Button></fieldset><p id={`${id}-error`} className="field-error" role="status">{Object.keys(errors).length > 0 ? "شناسه باید ۲۴ نویسهٔ معتبر باشد؛ انتخاب‌ها را بررسی کنید." : ""}</p><p className="search-privacy">حریم خصوصی: فیلترها در نشانی و تاریخچه می‌مانند. شرح‌حال ننویسید. در نمای جدول، جست‌وجوی شناسه محدود به بازهٔ تاریخ نیست.</p></form>;
}
