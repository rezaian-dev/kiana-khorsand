"use client";

import { DraftNotice } from "@/components/shared/draft-notice";
import { useDraft } from "@/lib/use-draft";
import { useId, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { topics } from "@/lib/constants";
import { buildContent, contentPaths, contentSchema, type ContentQuery, type ContentKind } from "@/lib/publishing";

type Props = { kind: ContentKind; query: ContentQuery };

export function ContentFilter({ kind, query }: Props) {
  const id = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<z.input<typeof contentSchema>, unknown, ContentQuery>({ resolver: zodResolver(contentSchema), defaultValues: query });
  const { hasChanged, discard } = useDraft({ value: query, version: JSON.stringify(query), isPaused: isPending || isDirty, onApply(next) { reset(next); } });
  function handleFilter(value: ContentQuery) { reset({ ...value, page: 1 }); startTransition(() => router.push(buildContent(kind, { ...value, page: 1 }), { scroll: false })); }
  return <form action={contentPaths[kind]} method="get" noValidate role="search" className="admin-filter" onSubmit={handleSubmit(handleFilter)} aria-busy={isPending} data-live-pause={isPending || isDirty}><fieldset disabled={isPending}><legend className="sr-only">جست‌وجوی محتوا</legend><div className="filter-fields"><div><label htmlFor={`${id}-q`}>عنوان یا خلاصه</label><Input id={`${id}-q`} {...register("q")} defaultValue={query.q} type="search" maxLength={80} aria-invalid={!!errors.q} aria-describedby={`${id}-error`} /></div><div><label htmlFor={`${id}-category`}>موضوع</label><select id={`${id}-category`} {...register("category")} defaultValue={query.category} className="admin-select"><option value="all">همهٔ موضوع‌ها</option>{Object.entries(topics).map(([key, title]) => <option key={key} value={key}>{title}</option>)}</select></div><div><label htmlFor={`${id}-status`}>انتشار</label><select id={`${id}-status`} {...register("status")} defaultValue={query.status} className="admin-select"><option value="all">همه</option><option value="draft">پیش‌نویس</option><option value="published">منتشرشده</option></select></div><div><label htmlFor={`${id}-sort`}>ترتیب</label><select id={`${id}-sort`} {...register("sort")} defaultValue={query.sort} className="admin-select"><option value="updated">آخرین ویرایش</option><option value="title">عنوان، الفبایی</option></select></div></div><Button type="submit">{isPending ? "در حال دریافت…" : "اعمال فیلتر"}</Button></fieldset><p id={`${id}-error`} className="field-error" role="status">{errors.q?.message}</p><p className="search-privacy">حریم خصوصی: عبارت در نشانی و تاریخچه باقی می‌ماند؛ اطلاعات مراجع یا شرح‌حال ننویسید.</p><DraftNotice hasChanged={hasChanged} isDisabled={isPending} onDiscard={discard} /></form>;
}
