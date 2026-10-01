"use client";

import { useId, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildHref, searchSchema, type Search, type CatalogQuery } from "@/lib/catalog";
import { useDraft } from "@/lib/use-draft";
import { DraftNotice } from "./draft-notice";
import { routes } from "@/lib/constants";

type Props = { path: typeof routes.articles | typeof routes.courses; query: CatalogQuery };

export function SearchForm({ path, query }: Props) {
  const id = useId();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<Search>({ resolver: zodResolver(searchSchema), defaultValues: { q: query.q } });
  const { hasChanged, discard } = useDraft({ value: { q: query.q }, version: query.q, isPaused: isDirty || isPending, onApply(next) { reset(next); } });
  function handleSearch(values: Search) {
    reset(values);
    startTransition(() => router.push(buildHref(path, { ...query, q: values.q, page: 1 }), { scroll: false }));
  }
  return <form action={path} method="get" role="search" className="search-form" aria-busy={isPending} data-live-pause={isPending || isDirty} onSubmit={handleSubmit(handleSearch)}>
    <label htmlFor={`${id}-query`}>جست‌وجو در عنوان و توضیح</label><div className="search-row"><Input {...register("q")} id={`${id}-query`} type="search" defaultValue={query.q} maxLength={80} placeholder="مثلاً استرس یا گفت‌وگو" autoComplete="off" aria-invalid={!!errors.q} aria-describedby={`${id}-privacy ${id}-status`} disabled={isPending} /><Button type="submit" disabled={isPending}><SearchIcon aria-hidden="true" />جست‌وجو</Button></div>
    <input type="hidden" name="category" value={query.category} /><input type="hidden" name="sort" value={query.sort} />
    <p id={`${id}-privacy`} className="search-privacy">حریم خصوصی شما مهم است. جست‌وجو در نشانی و تاریخچهٔ مرورگر می‌ماند؛ نام و جزئیات حساس ننویسید.</p>
    <p id={`${id}-status`} className="search-status" data-invalid={!!errors.q} role="status">{errors.q?.message ?? (isPending ? "در حال دریافت نتیجه‌ها…" : "")}</p>
    <DraftNotice hasChanged={hasChanged} isDisabled={isPending} onDiscard={discard} />
  </form>;
}
