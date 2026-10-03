"use client";

import { DraftNotice } from "@/components/shared/draft-notice";
import { useDraft } from "@/lib/use-draft";
import { useId, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ChoiceField } from "@/components/shared/choice-field";
import { Button } from "@/components/ui/button";
import { agendaSchema, buildAgenda, type AgendaQuery } from "@/lib/agenda";
import { appointmentLabels } from "@/lib/visits";
import { routes } from "@/lib/constants";

type Props = { query: AgendaQuery; services: { key: string; title: string }[] };

export function AgendaFilter({ query, services }: Props) {
  const id = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, control, handleSubmit, reset, formState: { errors, isDirty } } = useForm<z.input<typeof agendaSchema>, unknown, AgendaQuery>({ resolver: zodResolver(agendaSchema), defaultValues: query });
  const { hasChanged, discard } = useDraft({ value: query, version: JSON.stringify(query), isPaused: isPending || isDirty, onApply(next) { reset(next); } });
  function handleFilter(values: AgendaQuery) { reset({ ...values, page: 1 }); startTransition(() => router.push(buildAgenda({ ...values, page: 1 }), { scroll: false })); }
  return <form className="admin-filter" action={routes.agenda} method="get" noValidate role="search" aria-busy={isPending} data-live-pause={isPending || isDirty} onSubmit={handleSubmit(handleFilter)}><fieldset disabled={isPending}><legend className="sr-only">فیلتر نوبت‌ها</legend><div className="filter-fields"><div><label htmlFor={`${id}-q`}>شناسهٔ کامل نوبت</label><Input {...register("q")} defaultValue={query.q} id={`${id}-q`} maxLength={24} autoComplete="off" dir="ltr" aria-invalid={!!errors.q} aria-describedby={`${id}-error`} /></div><div><label htmlFor={`${id}-status`}>وضعیت</label><ChoiceField control={control} name="status" id={`${id}-status`} kind="select" label="وضعیت" options={[{ value: "all", label: "همهٔ وضعیت‌ها" }, ...Object.entries(appointmentLabels).map(([value, label]) => ({ value, label }))]} disabled={isPending} /></div><div><label htmlFor={`${id}-service`}>نوع جلسه</label><ChoiceField control={control} name="service" id={`${id}-service`} kind="select" label="نوع جلسه" options={[{ value: "all", label: "همهٔ خدمات" }, ...services.map((service) => ({ value: service.key, label: service.title }))]} disabled={isPending} /></div><div><label htmlFor={`${id}-sort`}>ترتیب زمان</label><ChoiceField control={control} name="sort" id={`${id}-sort`} kind="segmented" label="ترتیب زمان" options={[{ value: "ascending", label: "قدیمی‌تر به تازه‌تر" }, { value: "descending", label: "تازه‌تر به قدیمی‌تر" }]} disabled={isPending} /></div></div><input type="hidden" {...register("date")} /><input type="hidden" {...register("view")} /><input type="hidden" {...register("client")} /><Button type="submit">{isPending ? "در حال دریافت…" : "اعمال فیلتر"}</Button></fieldset><p id={`${id}-error`} className="field-error" role="status">{Object.keys(errors).length > 0 ? "شناسه باید ۲۴ نویسهٔ معتبر باشد؛ انتخاب‌ها را بررسی کنید." : ""}</p><p className="search-privacy">حریم خصوصی: فیلترها در نشانی و تاریخچه می‌مانند. شرح‌حال ننویسید. در نمای جدول، جست‌وجوی شناسه محدود به بازهٔ تاریخ نیست.</p><DraftNotice hasChanged={hasChanged} isDisabled={isPending} onDiscard={discard} /></form>;
}
