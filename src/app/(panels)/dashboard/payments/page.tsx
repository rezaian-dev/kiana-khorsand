import {
  panelCardClassName,
  panelGridClassName,
  panelStackClassName,
  panelMutedClassName,
  panelMetaClassName,
} from "@/components/panels/panel-layout-classes";
import { requireUser } from "@/lib/session";
import { listMyPayments } from "@/features/dashboard/queries";
import {
  PanelHeading,
  PanelEmpty,
  paymentLabels,
} from "@/components/panels/ui";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatToman } from "@/lib/format";
export const metadata = { title: "پرداخت‌های من" };
export default async function Page() {
  const { user } = await requireUser();
  const payments = await listMyPayments(user.id);
  return (
    <>
      <PanelHeading
        title="پرداخت‌های من"
        description="فقط سوابق ثبت‌شده در همین حساب؛ در این نسخه درگاه پرداخت آنلاین فعال نیست."
      />
      {payments.length ? (
        <div className={panelGridClassName}>
          {payments.map((item) => (
            <article
              className={`${panelCardClassName} ${panelStackClassName}`}
              key={item.id}
            >
              <div className={panelMetaClassName}>
                <Badge variant="secondary">{paymentLabels[item.status]}</Badge>
                {item.paidAt && (
                  <time dateTime={item.paidAt.toISOString()}>
                    {formatDate(item.paidAt)}
                  </time>
                )}
              </div>
              <h2>{formatToman(item.amount)}</h2>
              <p className={panelMutedClassName} dir="ltr">
                {item.invoice}
              </p>
              {item.description && (
                <p className={panelMutedClassName}>بابت: {item.description}</p>
              )}
              <p className={panelMutedClassName}>
                {item.status === "pending"
                  ? "پرداخت این فاکتور هنوز ثبت نشده است."
                  : `روش ثبت: ${item.method === "manual" ? "ثبت دستی" : item.method}`}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <PanelEmpty message="هنوز پرداختی برای این حساب ثبت نشده است." />
      )}
    </>
  );
}
