import Link from "next/link";
import { Concept } from "@/components/layout/concept";
import { Specimen } from "@/components/shared/specimen";
import { concepts, proofTones, rationaleLabels } from "@/content/logo-concepts";
import { routes } from "@/lib/constants";

type Props = {
  isLoading?: boolean;
};

export function Gallery({ isLoading = false }: Props) {
  return (
    <main className="logo-preview" id="top" aria-busy={isLoading}>
      <div className="preview-shell">
        <header className="preview-intro">
          <div className="preview-topline">
            <nav aria-label="مسیر صفحه">
              <ol className="preview-breadcrumbs">
                <li><Link href={routes.home}>صفحهٔ اصلی</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">انتخاب نشان</li>
              </ol>
            </nav>
            <span className="preview-status">فاز ۱ · پیش‌نمایش طراحی</span>
          </div>
          <p className="preview-eyebrow">هویت بصری کیانا خرسند</p>
          <h1>آرامش، در یک نشان.</h1>
          <p className="preview-lead">
            سه برداشت از مراقبت، اعتماد و خرسندی؛ برای یک همراه، نه یک مرکز.
            هر مسیر را با نام، بدون نام و در کوچک‌ترین اندازه‌ها ببینید.
          </p>
          <nav aria-label="دسترسی به سه طرح لوگو">
            <ol className="preview-overview">
              {concepts.map((concept) => (
                <li key={concept.key}>
                  <a className="preview-choice" href={`#${concept.key}`}>
                    <div className="preview-choice-top">
                      <span className="preview-letter">{concept.label}</span>
                      <span className="preview-choice-link">دیدن جزئیات <span aria-hidden="true">↙</span></span>
                    </div>
                    <div className="preview-choice-mark">
                      <Concept concept={concept} form="emblem" tone="light" size={128} isLoading={isLoading} />
                    </div>
                    <p className="preview-choice-title">{concept.title}</p>
                    <p className="preview-choice-summary">{concept.summary}</p>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <p className="preview-caption">
            هر سه طرح با مسیرهای برداری طراحی شده‌اند. نام «کیانا خرسند» از وزیرمتن
            به مسیر تبدیل شده؛ هیچ حرف فارسی با دست ترسیم نشده است.
          </p>
        </header>

        {concepts.map((concept) => (
          <article className="preview-concept" id={concept.key} key={concept.key}>
            <header className="preview-concept-heading">
              <div className="preview-concept-title">
                <span className="preview-letter">{concept.label}</span>
                <div>
                  <p className="preview-eyebrow">طرح {concept.label}</p>
                  <h2>{concept.title}</h2>
                </div>
              </div>
              <p>{concept.summary}</p>
            </header>
            <dl className="preview-rationale">
              {rationaleLabels.map((rationale) => (
                <div key={rationale.key}>
                  <dt>{rationale.label}</dt>
                  <dd>{concept.rationale[rationale.key]}</dd>
                </div>
              ))}
            </dl>
            <div className="preview-proof-grid">
              {proofTones.map((tone) => (
                <Specimen concept={concept} tone={tone} isLoading={isLoading} key={tone.key} />
              ))}
            </div>
            <div className="preview-footnote">
              <p>
                اندازه‌ها واقعی‌اند: عدد، عرضِ کل نماد یا ترکیب نام را نشان می‌دهد.
                ترکیب‌های زیر ۹۶ پیکسل فقط برای بررسی افت خوانایی‌اند، نه استفادهٔ نهایی.
              </p>
              <a href="#top">بازگشت به سه طرح <span aria-hidden="true">↑</span></a>
            </div>
          </article>
        ))}

        <section className="preview-decision" aria-label="انتخاب نهایی طرح">
          <div>
            <p className="preview-eyebrow">گام بعد، با انتخاب شما</p>
            <h2>کدام نشان، نزدیک‌تر است؟</h2>
            <p>
              در گفت‌وگو، طرح «الف»، «ب» یا «پ» را انتخاب کنید؛ سپس برای سربرگ و پابرگ
              بنویسید «فقط نماد» یا «نماد و نام». اینجا هنوز چیزی نهایی نشده است.
            </p>
          </div>
          <div className="preview-reply">
            <p>نمونهٔ پاسخ</p>
            <blockquote>طرح الف؛ سربرگ و پابرگ: نماد و نام.</blockquote>
            <span>نهایی‌سازی و فایل‌های برند، در فاز ۲</span>
          </div>
        </section>
        <p className="preview-endnote">
          این صفحهٔ موقت، بخشی از وب‌سایت عمومی نیست و پس از تأیید حذف می‌شود.
        </p>
      </div>
    </main>
  );
}
