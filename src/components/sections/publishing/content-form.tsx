"use client";

import { useId, useRef, useState, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArticleFields } from "./article-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Photo } from "@/components/shared/photo";
import { images } from "@/content/images";
import { notices } from "@/content/profile";
import { topics, publicationStates, resultCodes } from "@/lib/constants";
import { contentKinds, contentPaths, editorSchema, type Draft, type Editor } from "@/lib/publishing";
import { formatDate, formatNumber } from "@/lib/format";
import { writeArticle, writeCourse } from "@/server/actions/content";

type Props = { draft: Draft };
const imageKeys = Object.keys(images) as (keyof typeof images)[];

export function ContentForm({ draft }: Props) {
  const id = useId();
  const [snapshot] = useState(draft);
  const [message, setMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const isSending = useRef(false);
  const form = useForm<Editor>({ resolver: zodResolver(editorSchema), defaultValues: snapshot.value });
  const { register, control, handleSubmit, setValue, getFieldState, formState } = form;
  const { isDirty, errors } = formState;
  const [image, status, social] = useWatch({ control, name: ["record.image", "record.status", "record.social"] });
  const kind = snapshot.value.kind;
  const hasChanged = draft.value.revision !== snapshot.value.revision;
  const isSaved = savedId !== null;
  const canSave = !isPending && !isBlocked && !isSaved && !hasChanged;
  const href = `${contentPaths[kind]}${savedId ? `/${savedId}` : snapshot.value.id ? `/${snapshot.value.id}` : ""}`;
  function handleEdit() { setValue("record.isReviewed", false, { shouldDirty: true }); }
  function handleSave(value: Editor) {
    if (!canSave || isSending.current) return;
    if (new TextEncoder().encode(JSON.stringify(value)).byteLength > 900_000) { setMessage("حجم محتوا برای سقف درخواست زیاد است؛ متن را کوتاه‌تر کنید. هیچ درخواستی ارسال نشده است."); return; }
    isSending.current = true;
    setMessage("");
    startTransition(async () => {
      try {
        const result = value.kind === contentKinds.article ? await writeArticle(value) : await writeCourse(value);
        if (result.isSuccess) { setSavedId(result.value.id); setMessage("ذخیره از سرور تأیید شد. برای ویرایش بعدی، نسخهٔ ذخیره‌شده را بازخوانی کنید."); toast.success("ذخیرهٔ محتوا تأیید شد."); }
        else {
          setMessage([result.message, ...Object.values(result.fieldErrors).flatMap((messages) => messages ?? [])].join(" "));
          const isSlugConflict = result.code === resultCodes.conflict && !!result.fieldErrors.record?.length;
          setIsBlocked(!isSlugConflict && [resultCodes.unavailable, resultCodes.conflict, resultCodes.unauthorized, resultCodes.forbidden].some((code) => code === result.code));
          toast.error(result.message);
        }
      } catch { setIsBlocked(true); setMessage("نتیجهٔ ذخیره مشخص نیست؛ قبل از تکرار، فهرست و نسخهٔ تازه را بررسی کنید. ناموفق‌بودن قطعی فرض نمی‌شود."); toast.error("نتیجهٔ ذخیره مشخص نیست؛ بدون ارسال دوباره بازخوانی کنید."); }
      finally { isSending.current = false; }
    });
  }
  return <form className="content-form" action={contentPaths[kind]} method="post" noValidate aria-busy={isPending} data-live-pause={(isDirty && !isSaved) || isPending} aria-describedby={`${id}-privacy ${id}-status`} onSubmit={(event) => { void handleSubmit(handleSave)(event); }} onChange={(event) => { if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) { if (event.target.name !== "record.isReviewed") handleEdit(); } }}>
    <div className="editor-status" role="status" id={`${id}-status`} data-saved={isSaved}><strong>{isPending ? "در حال ذخیره…" : isSaved ? "ذخیره تأیید شد" : isBlocked ? "نیازمند بررسی نتیجه" : hasChanged ? "نسخهٔ سرور تغییر کرده است" : isDirty ? "تغییرات ذخیره‌نشده" : snapshot.updatedAt ? "نسخهٔ خوانده‌شده از سرور" : "پیش‌نویس تازه، هنوز ذخیره نشده"}</strong><p>{message || (hasChanged ? "ویرایش شما جایگزین نشده است. پیش از ذخیره، نسخهٔ تازه را بررسی کنید؛ ذخیره روی نسخهٔ قدیمی بسته است." : "ذخیره خودکار نداریم. خروج از صفحه، تغییرات ذخیره‌نشده را از بین می‌برد.")}</p>{snapshot.updatedAt && <p>زمان نسخهٔ آغازین: {formatDate(new Date(snapshot.updatedAt), { dateStyle: "medium", timeStyle: "short" })} · نسخهٔ {formatNumber(snapshot.value.revision)}</p>}</div>
    {(isSaved || isBlocked || hasChanged) && <a className="quiet-link" href={href}>بازخوانی کامل، بدون ارسال دوباره؛ تغییرات محلی کنار گذاشته می‌شوند</a>}
    <fieldset disabled={!canSave}><legend>مشخصات و محتوای {kind === contentKinds.article ? "مقاله" : "دوره"}</legend><div className="editor-grid"><div><label htmlFor={`${id}-title`}>عنوان فارسی، ۲ تا ۱۶۰ نویسه</label><Input id={`${id}-title`} {...register("record.title")} maxLength={160} aria-invalid={getFieldState("record.title", formState).invalid} /><p className="field-error">{getFieldState("record.title", formState).invalid ? "عنوان باید ۲ تا ۱۶۰ نویسه باشد." : ""}</p><label htmlFor={`${id}-slug`}>نشانی لاتین یکتا</label><Input id={`${id}-slug`} {...register("record.slug")} dir="ltr" maxLength={100} autoComplete="off" aria-invalid={getFieldState("record.slug", formState).invalid} /><p className="panel-note">حروف کوچک انگلیسی، عدد و خط تیره؛ حداکثر ۱۰۰ نویسه. تغییر نشانی مقاله پیوند قبلی را از کار می‌اندازد؛ انتقال خودکار نداریم.</p><p className="field-error">{getFieldState("record.slug", formState).invalid ? "نشانی لاتین معتبر وارد کنید." : ""}</p><label htmlFor={`${id}-description`}>خلاصه، ۱۰ تا ۳۲۰ نویسه</label><Textarea id={`${id}-description`} {...register("record.description")} rows={4} maxLength={320} aria-invalid={getFieldState("record.description", formState).invalid} /><p className="field-error">{getFieldState("record.description", formState).invalid ? "خلاصه باید ۱۰ تا ۳۲۰ نویسه باشد." : ""}</p><label htmlFor={`${id}-author`}>{kind === contentKinds.article ? "نویسندهٔ واقعی" : "مدرس واقعی"}</label><Input id={`${id}-author`} {...register("record.author")} maxLength={100} aria-invalid={getFieldState("record.author", formState).invalid} /><label htmlFor={`${id}-category`}>موضوع</label><select id={`${id}-category`} {...register("record.category")} className="admin-select">{Object.entries(topics).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></div><div className="editor-cover"><label htmlFor={`${id}-image`}>تصویر جلد از دارایی‌های محلی</label><select id={`${id}-image`} {...register("record.image")} className="admin-select">{imageKeys.map((key) => <option key={key} value={key}>{images[key].alt}</option>)}</select><Photo key={image} image={images[image]} sizes="(min-width: 1000px) 360px, 90vw" /><p className="panel-note">تصاویر موجود نمونه/مفهومی‌اند؛ تصویر واقعی مراجع یا دکتر نیستند. بارگذاری فایل یا نشانی خارجی در این ویرایشگر نداریم.</p>{kind === contentKinds.article && <><label htmlFor={`${id}-social`}>تصویر اشتراک‌گذاری</label><select id={`${id}-social`} {...register("record.social")} className="admin-select">{imageKeys.map((key) => <option key={key} value={key}>{images[key].alt}</option>)}</select>{social && <Photo key={social} image={images[social]} sizes="(min-width: 1000px) 360px, 90vw" />}<p className="panel-note">عنوانِ روی کارت متن‌دار باید با مقاله یکسان باشد؛ در غیر این صورت تصویر بدون متن انتخاب کنید. متن روی عکس خودکار تغییر نمی‌کند.</p></>}</div></div>
      {kind === contentKinds.article ? <ArticleFields form={form} onEdit={handleEdit} /> : <><label htmlFor={`${id}-audience`}>مخاطب دوره</label><Textarea id={`${id}-audience`} {...register("record.audience")} rows={4} maxLength={4000} aria-invalid={getFieldState("record.audience", formState).invalid} /><p className="field-error">{getFieldState("record.audience", formState).invalid ? "مخاطب دوره را در ۱ تا ۴۰۰۰ نویسه توضیح دهید." : ""}</p><label htmlFor={`${id}-outline`}>سرفصل‌ها؛ هر سرفصل در یک خط</label><Controller control={control} name="record.outline" render={({ field, fieldState }) => <Textarea ref={field.ref} name={field.name} id={`${id}-outline`} rows={7} value={field.value.join("\n")} onBlur={field.onBlur} onChange={(event) => field.onChange(event.target.value.split("\n"))} aria-invalid={fieldState.invalid} />} /><p className="panel-note">۱ تا ۳۰ سرفصل، هر کدام ۱ تا ۴۰۰۰ نویسه؛ خط خالی حذف شود.</p><p className="field-error">{getFieldState("record.outline", formState).invalid ? "تعداد و متن سرفصل‌ها را بررسی کنید." : ""}</p><label htmlFor={`${id}-boundary`}>محدودیت و مرز آموزشی دوره</label><Textarea id={`${id}-boundary`} {...register("record.boundary")} rows={4} maxLength={4000} aria-invalid={getFieldState("record.boundary", formState).invalid} /><p className="field-error">{getFieldState("record.boundary", formState).invalid ? "مرز آموزشی باید ۱ تا ۴۰۰۰ نویسه باشد." : ""}</p></>}
      <div className="editor-publication"><h3>تصمیم انتشار</h3><label htmlFor={`${id}-status-select`}>وضعیت پس از ذخیره</label><select id={`${id}-status-select`} {...register("record.status")} className="admin-select"><option value={publicationStates.draft}>پیش‌نویس؛ در سایت عمومی نمایش داده نشود</option><option value={publicationStates.published}>منتشرشده؛ در سایت عمومی نمایش داده شود</option></select><label className="review-check"><input type="checkbox" {...register("record.isReviewed")} />این نسخه را از نظر محتوای حرفه‌ای، منابع، تصویر و حقوق انتشار بازبینی کرده‌ام.</label><p className="panel-note">هر تغییر در محتوا تأیید بازبینی را برمی‌دارد. انتشار نیازمند بازبینی و نام واقعی نویسنده/مدرس است؛ پیش‌نویس هم باید حداقل فیلدهای لازم را داشته باشد. متن ساده ذخیره می‌شود، نه HTML یا کد اجرایی.</p><p className="field-error">{getFieldState("record.status", formState).invalid ? "برای انتشار، بازبینی این نسخه و نام واقعی با دست‌کم دو نویسه لازم است." : ""}</p><p>{status === publicationStates.published ? "با ذخیرهٔ تأییدشده، این نسخه عمومی خواهد بود؛ وعدهٔ تشخیص یا نتیجهٔ قطعی درمان ننویسید." : "با ذخیرهٔ پیش‌نویس، نسخهٔ منتشرشدهٔ قبلی نیز از نمایش عمومی خارج می‌شود."}</p></div>
      <p className="field-error" role="status">{Object.keys(errors).length ? "فیلدهای مشخص‌شده را بررسی کنید؛ ذخیره ارسال نشده است." : ""}</p><Button type="submit" disabled={!canSave}>{isPending ? "در حال ذخیره…" : status === publicationStates.published ? "ذخیره و انتشار این نسخه" : "ذخیرهٔ پیش‌نویس"}</Button>
    </fieldset><p className="search-privacy" id={`${id}-privacy`}>{notices.confidentiality} اطلاعات قابل‌شناسایی مراجع و شرح‌حال را وارد محتوا نکنید. برای ذخیره، JavaScript لازم است؛ درخواست مستقیم جایگزینِ ذخیره نداریم. سقف بررسی محلی ۹۰۰ هزار بایت برای سازگاری با سقف بومی یک مگابایت است.</p><noscript><p>ذخیرهٔ این ویرایشگر بدون JavaScript انجام نمی‌شود.</p></noscript>
  </form>;
}
