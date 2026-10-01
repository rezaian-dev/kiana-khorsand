import Link from "next/link";
import { ContentForm } from "./content-form";
import { RefreshButton } from "@/components/shared/refresh-button";
import { contentLabels, contentPaths, type Draft } from "@/lib/publishing";
import { routes } from "@/lib/constants";

type Props = { draft: Draft; isLoading?: boolean };

export function ContentEditor({ draft, isLoading = false }: Props) {
  const { kind, id } = draft.value;
  return <>{isLoading && <p className="load-status" role="status">در حال دریافت ویرایشگر…</p>}<main className="admin-records" id="main-content" inert={isLoading} aria-busy={isLoading}><div className="dashboard-title"><div><nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href={routes.admin}>مدیریت</Link><span aria-hidden="true">/</span><Link href={contentPaths[kind]}>{contentLabels[kind]}</Link><span aria-hidden="true">/</span><span aria-current="page">{id ? "ویرایش" : "نوشتهٔ تازه"}</span></nav><h1>{id ? "ویرایش" : "ساخت"} {kind === "article" ? "مقاله" : "دوره"}</h1><p>تغییرات فقط با انتخاب دکمهٔ ذخیره ارسال می‌شوند.</p></div><RefreshButton /></div><section className="dashboard-panel"><h2>ویرایشگر محتوا</h2><ContentForm key={`${kind}:${id ?? "new"}`} draft={draft} /></section></main></>;
}
