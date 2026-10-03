"use client";

import { DraftNotice } from "@/components/shared/draft-notice";
import { useDraft } from "@/lib/use-draft";
import { useId, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { ChoiceField } from "@/components/shared/choice-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { messageStates, reviewStates } from "@/lib/constants";
import { buildQueue, queueKinds, queueLabels, queuePaths, queueSchema, type QueueQuery } from "@/lib/queue";

type Props = { query: QueueQuery };

export function QueueFilter({ query }: Props) {
  const id = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, control, handleSubmit, reset, formState: { errors, isDirty } } = useForm<z.input<typeof queueSchema>, unknown, QueueQuery>({ resolver: zodResolver(queueSchema), defaultValues: query });
  const { hasChanged, discard } = useDraft({ value: query, version: JSON.stringify(query), isPaused: isPending || isDirty, onApply(next) { reset(next); } });
  function handleFilter(value: QueueQuery) { const next = { ...value, page: 1, id: "" }; reset(next); startTransition(() => router.push(buildQueue(next), { scroll: false })); }
  return <form className="admin-filter" role="search" action={queuePaths[query.kind]} method="get" noValidate onSubmit={handleSubmit(handleFilter)} aria-busy={isPending} data-live-pause={isDirty || isPending}><fieldset disabled={isPending}><legend className="sr-only">فیلتر فهرست</legend><div className="filter-fields"><div><label htmlFor={`${id}-q`}>{query.kind === queueKinds.messages ? "نام یا ایمیل فرستنده" : "نام دیدگاه"}</label><Input id={`${id}-q`} {...register("q")} defaultValue={query.q} maxLength={80} type="search" autoComplete="off" aria-invalid={!!errors.q} aria-describedby={`${id}-error`} /></div><div><label htmlFor={`${id}-status`}>وضعیت</label><ChoiceField control={control} name="status" id={`${id}-status`} kind="segmented" label="وضعیت" options={[{ value: "all", label: "همه" }, ...Object.values(query.kind === queueKinds.messages ? messageStates : reviewStates).map((value) => ({ value, label: queueLabels[value] }))]} disabled={isPending} /></div><div><label htmlFor={`${id}-sort`}>ترتیب دریافت</label><ChoiceField control={control} name="sort" id={`${id}-sort`} kind="segmented" label="ترتیب دریافت" options={[{ value: "newest", label: "تازه‌ترین" }, { value: "oldest", label: "قدیمی‌ترین" }]} disabled={isPending} /></div></div><Button type="submit">{isPending ? "در حال دریافت…" : "اعمال فیلتر"}</Button></fieldset><p className="field-error" id={`${id}-error`} role="status">{Object.keys(errors).length ? "عبارت و وضعیت را بررسی کنید؛ حداکثر ۸۰ نویسه." : ""}</p><p className="search-privacy">حریم خصوصی: عبارت در URL و تاریخچه/گزارش میزبان باقی می‌ماند. شرح‌حال ننویسید؛ متن پیام یا دیدگاه جست‌وجو نمی‌شود.</p><DraftNotice hasChanged={hasChanged} isDisabled={isPending} onDiscard={discard} /></form>;
}
