"use client";

import { useId, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildClients, clientSchema, type ClientQuery } from "@/lib/clients";
import { routes } from "@/lib/constants";

type Props = { query: ClientQuery };

export function ClientFilter({ query }: Props) {
  const id = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<z.input<typeof clientSchema>, unknown, ClientQuery>({ resolver: zodResolver(clientSchema), defaultValues: query });
  function handleFilter(value: ClientQuery) { reset({ ...value, page: 1, history: "", historyPage: 1 }); startTransition(() => router.push(buildClients({ ...value, page: 1, history: "", historyPage: 1 }), { scroll: false })); }
  return <form action={routes.clients} method="get" noValidate role="search" className="admin-filter" onSubmit={handleSubmit(handleFilter)} aria-busy={isPending} data-live-pause={isDirty || isPending}><fieldset disabled={isPending}><legend className="sr-only">جست‌وجوی حساب‌ها</legend><div className="filter-fields"><div><label htmlFor={`${id}-q`}>نام، ایمیل، شماره یا شناسهٔ حساب</label><Input id={`${id}-q`} {...register("q")} type="search" maxLength={80} autoComplete="off" aria-invalid={!!errors.q} /></div><div><label htmlFor={`${id}-sort`}>ترتیب حساب‌ها</label><select id={`${id}-sort`} {...register("sort")} className="admin-select"><option value="newest">تازه‌ترین ثبت‌نام</option><option value="name">نام، الفبایی</option></select></div></div><Button type="submit">{isPending ? "در حال دریافت…" : "جست‌وجو"}</Button></fieldset><p className="field-error" role="status">{errors.q?.message}</p><p className="search-privacy">حریم خصوصی: عبارت جست‌وجو در URL، تاریخچه و احتمالاً گزارش میزبان باقی می‌ماند؛ فقط حداقل لازم را بنویسید، نه اطلاعات درمانی.</p></form>;
}
