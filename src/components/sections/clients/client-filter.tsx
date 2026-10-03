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
import { buildClients, clientSchema, type ClientQuery } from "@/lib/clients";
import { routes } from "@/lib/constants";

type Props = { query: ClientQuery };

export function ClientFilter({ query }: Props) {
  const id = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, control, handleSubmit, reset, formState: { errors, isDirty } } = useForm<z.input<typeof clientSchema>, unknown, ClientQuery>({ resolver: zodResolver(clientSchema), defaultValues: query });
  const { hasChanged, discard } = useDraft({ value: query, version: JSON.stringify(query), isPaused: isPending || isDirty, onApply(next) { reset(next); } });
  function handleFilter(value: ClientQuery) { reset({ ...value, page: 1, history: "", historyPage: 1 }); startTransition(() => router.push(buildClients({ ...value, page: 1, history: "", historyPage: 1 }), { scroll: false })); }
  return <form action={routes.clients} method="get" noValidate role="search" className="admin-filter" onSubmit={handleSubmit(handleFilter)} aria-busy={isPending} data-live-pause={isDirty || isPending}><fieldset disabled={isPending}><legend className="sr-only">جست‌وجوی حساب‌ها</legend><div className="filter-fields"><div><label htmlFor={`${id}-q`}>نام، ایمیل، شماره یا شناسهٔ حساب</label><Input id={`${id}-q`} {...register("q")} defaultValue={query.q} type="search" maxLength={80} autoComplete="off" aria-invalid={!!errors.q} /></div><div><label htmlFor={`${id}-sort`}>ترتیب حساب‌ها</label><ChoiceField control={control} name="sort" id={`${id}-sort`} kind="segmented" label="ترتیب حساب‌ها" options={[{ value: "newest", label: "تازه‌ترین ثبت‌نام" }, { value: "name", label: "نام، الفبایی" }]} disabled={isPending} /></div></div><Button type="submit">{isPending ? "در حال دریافت…" : "جست‌وجو"}</Button></fieldset><p className="field-error" role="status">{errors.q?.message}</p><p className="search-privacy">حریم خصوصی: عبارت جست‌وجو در URL، تاریخچه و احتمالاً گزارش میزبان باقی می‌ماند؛ فقط حداقل لازم را بنویسید، نه اطلاعات درمانی.</p><DraftNotice hasChanged={hasChanged} isDisabled={isPending} onDiscard={discard} /></form>;
}
