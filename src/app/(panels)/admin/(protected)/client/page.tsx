import {
  panelCardClassName,
  panelGridClassName,
} from "@/components/panels/panel-styles";
import type { ReceiptPageProps } from "@/types/routes";
import { notFound } from "next/navigation";
import { adminClient, adminClientHistory } from "@/features/admin/queries";
import { PanelHeading, PanelEmpty } from "@/components/panels/panel-heading";
import { formatDate, formatToman } from "@/lib/format";
export const metadata = { title: "حساب مراجعه‌کننده" };
export default async function Page({ searchParams }: ReceiptPageProps) {
  const { id } = await searchParams;
  const client = id ? await adminClient(id) : null;
  if (!client) notFound();
  const { appointments: ownAppointments, payments: ownPayments } =
    await adminClientHistory(client.id);
  return (
    <>
      <PanelHeading
        title={client.name}
        description="اطلاعات حداقلی حساب و سوابق نوبت/پرداخت؛ یادداشت‌های خصوصی کاربر در این صفحه نمایش داده نمی‌شوند."
      />
      <div className={panelGridClassName}>
        <section className={panelCardClassName}>
          <h2>اطلاعات حساب</h2>
          <p dir="ltr">{client.username}</p>
          <p>{client.role === "admin" ? "مدیر" : "کاربر"}</p>
        </section>
        <section className={panelCardClassName}>
          <h2>نوبت‌ها</h2>
          {ownAppointments.length ? (
            ownAppointments.map((item) => (
              <p key={item.id}>
                {formatDate(item.startsAt)} · {item.status}
              </p>
            ))
          ) : (
            <PanelEmpty message="نوبتی ثبت نشده است." />
          )}
        </section>
        <section className={panelCardClassName}>
          <h2>پرداخت‌ها</h2>
          {ownPayments.length ? (
            ownPayments.map((item) => (
              <p key={item.id}>
                {formatToman(item.amount)} · {item.status}
              </p>
            ))
          ) : (
            <PanelEmpty message="پرداختی ثبت نشده است." />
          )}
        </section>
      </div>
    </>
  );
}
