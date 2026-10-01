"use client";

import { useId, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { messageStates, reviewStates } from "@/lib/constants";
import { buildQueue, queueKinds, queueLabels, queuePaths, queueSchema, type QueueQuery } from "@/lib/queue";

type Props = { query: QueueQuery };

export function QueueFilter({ query }: Props) {
  const id = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<z.input<typeof queueSchema>, unknown, QueueQuery>({ resolver: zodResolver(queueSchema), defaultValues: query });
  function handleFilter(value: QueueQuery) { const next = { ...value, page: 1, id: "" }; reset(next); startTransition(() => router.push(buildQueue(next), { scroll: false })); }
  return <form className="admin-filter" role="search" action={queuePaths[query.kind]} method="get" noValidate onSubmit={handleSubmit(handleFilter)} aria-busy={isPending} data-live-pause={isDirty || isPending}><fieldset disabled={isPending}><legend className="sr-only">فیلتر فهرست</legend><div className="filter-fields"><div><label htmlFor={`${id}-q`}>{query.kind === queueKinds.messages ? "نام یا ایمیل فرستنده" : "نام نمایشی دیدگاه"}</label><Input id={`${id}-q`} {...register("q")} maxLength={80} type="search" autoComplete="off" aria-invalid={!!errors.q} aria-describedby={`${id}-error`} /></div><div><label htmlFor={`${id}-status`}>وضعیت</label><select id={`${id}-status`} {...register("status")} className="admin-select"><option value="all">همه</option>{Object.values(query.kind === queueKinds.messages ? messageStates : reviewStates).map((status) => <option value={status} key={status}>{queueLabels[status]}</option>)}</select></div><div><label htmlFor={`${id}-sort`}>ترتیب دریافت</label><select id={`${id}-sort`} {...register("sort")} className="admin-select"><option value="newest">تازه‌ترین</option><option value="oldest">قدیمی‌ترین</option></select></div></div><Button type="submit">{isPending ? "در حال دریافت…" : "اعمال فیلتر"}</Button></fieldset><p className="field-error" id={`${id}-error`} role="status">{Object.keys(errors).length ? "عبارت و وضعیت را بررسی کنید؛ حداکثر ۸۰ نویسه." : ""}</p><p className="search-privacy">حریم خصوصی: عبارت در URL و تاریخچه/گزارش میزبان باقی می‌ماند. شرح‌حال ننویسید؛ متن پیام یا دیدگاه جست‌وجو نمی‌شود.</p></form>;
}
