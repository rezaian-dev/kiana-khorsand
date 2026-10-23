import {
  panelCardClassName,
  panelGridClassName,
  panelStackClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
import { requireUser } from "@/lib/session";
import { listMyResults } from "@/features/dashboard/queries";
import { listAssessments } from "@/features/assessments/queries";
import { PanelHeading, PanelEmpty } from "@/components/panels/panel-heading";
import { formatDate, formatNumber } from "@/lib/format";
export const metadata = { title: "خودسنجی‌های من" };
export default async function Page() {
  const { user } = await requireUser();
  const [results, tests] = await Promise.all([
    listMyResults(user.id),
    listAssessments(),
  ]);
  return (
    <>
      <PanelHeading
        title="خودسنجی‌های من"
        description="نتیجه‌های شخصی فقط برای خودتان نمایش داده می‌شوند؛ آزمون‌ها جایگزین تشخیص حرفه‌ای نیستند."
        action={{ href: "/assessments", label: "خودسنجی جدید" }}
      />
      {results.length ? (
        <div className={panelGridClassName}>
          {results.map((item) => (
            <article
              className={`${panelCardClassName} ${panelStackClassName}`}
              key={item.id}
            >
              <h2>
                {tests.find((test) => test.slug === item.assessmentId)?.title ||
                  "خودسنجی"}
              </h2>
              <p>{item.band}</p>
              <p>امتیاز: {formatNumber(item.score)}</p>
              <time
                className={panelMutedClassName}
                dateTime={item.createdAt.toISOString()}
              >
                {formatDate(item.createdAt)}
              </time>
            </article>
          ))}
        </div>
      ) : (
        <PanelEmpty
          message="هنوز نتیجهٔ خودسنجی برای این حساب ثبت نشده است."
          href="/assessments"
          label="مشاهده خودسنجی‌ها"
        />
      )}
    </>
  );
}
