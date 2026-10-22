import {
  panelAdminFormClassName,
  panelListItemClassName,
  panelInlineFormClassName,
  panelCardClassName,
  adminCreatePanelClassName,
  adminCreatePanelSummaryClassName,
  panelButtonClassName,
  panelButtonOutlineClassName,
} from "@/components/panels/panel-layout-classes";
import { PanelSelect } from "@/components/panels/panel-select";
import {
  adminPayments,
  adminUsers,
  adminAppointments,
} from "@/features/admin/queries";
import { setPaymentStatus, createAppointmentInvoice } from "@/actions/admin";
import { AdminCsvExport } from "@/components/panels/admin-csv-export";
import { ManualInvoiceForm } from "@/features/admin/ui/manual-invoice-form";
import { FilterableList } from "@/components/panels/filterable-list";
import {
  PanelHeading,
  PanelEmpty,
  paymentLabels,
} from "@/components/panels/ui";
import { formatDate, formatTime, formatToman } from "@/lib/format";
export const metadata = { title: "پرداخت‌ها" };
export default async function Page() {
  const [payments, users, appointments] = await Promise.all([
    adminPayments(),
    adminUsers(),
    adminAppointments(),
  ]);
  const unbilled = appointments.filter(
    (item) =>
      ["confirmed", "completed"].includes(item.status) &&
      !payments.some((payment) => payment.appointmentId === item.id),
  );
  return (
    <>
      <PanelHeading
        title="پرداخت‌ها"
        description="پرداخت‌ها را بررسی و وضعیت آن‌ها را ثبت کنید. این نسخه درگاه آنلاین ندارد؛ فقط پس از تأیید واقعی خارج از سایت، وضعیت را تغییر دهید."
        toolbar={
          <AdminCsvExport
            filename="payments.csv"
            headers={["شناسه فاکتور", "مراجع", "شرح", "مبلغ (تومان)", "وضعیت"]}
            rows={payments.map((item) => [
              item.invoice,
              users.find((user) => user.id === item.userId)?.name ||
                "حساب حذف‌شده",
              item.description || "بابت نوبت مشاوره",
              String(item.amount),
              paymentLabels[item.status],
            ])}
          />
        }
      />
      <ManualInvoiceForm
        users={users
          .filter((item) => item.role !== "admin")
          .map((item) => ({
            id: item.id,
            name: item.name,
            phone: item.username,
          }))}
      />
      {unbilled.length > 0 && (
        <details
          className={`${panelCardClassName} ${adminCreatePanelClassName}`}
        >
          <summary className={adminCreatePanelSummaryClassName}>
            فاکتور نوبت تأییدشده
          </summary>
          <form
            action={createAppointmentInvoice}
            className={`${panelAdminFormClassName} mt-5`}
          >
            <p className="panel-help">
              فاکتور با مبلغ ثبت‌شدهٔ همان نوبت و وضعیت «در انتظار» ایجاد
              می‌شود. برای هر نوبت تنها یک فاکتور ثبت خواهد شد.
            </p>
            <label htmlFor="new-invoice-appointment">نوبت</label>
            <PanelSelect
              id="new-invoice-appointment"
              name="id"
              required
              placeholder="نوبت را انتخاب کنید"
              options={unbilled.map((item) => ({
                value: item.id,
                label: `${users.find((user) => user.id === item.userId)?.name || "حساب"} · ${formatDate(item.startsAt)} ${formatTime(item.startsAt)} · ${formatToman(item.price)}`,
              }))}
            />
            <button type="submit" className={panelButtonClassName}>
              ایجاد فاکتور
            </button>
          </form>
        </details>
      )}
      {payments.length ? (
        <FilterableList
          label="جست‌وجو در پرداخت‌ها"
          options={[
            { value: "pending", label: "در انتظار" },
            { value: "paid", label: "پرداخت‌شده" },
            { value: "failed", label: "ناموفق" },
            { value: "refunded", label: "برگشت‌خورده" },
          ]}
          items={payments.map((item) => ({
            key: item.id,
            search: `${users.find((user) => user.id === item.userId)?.name || "حساب حذف‌شده"} ${item.invoice} ${item.amount} ${item.description || ""}`,
            status: item.status,
            content: (
              <article
                className={`${panelCardClassName} ${panelListItemClassName}`}
              >
                <div>
                  <h2>{formatToman(item.amount)}</h2>
                  <p>
                    {users.find((user) => user.id === item.userId)?.name ||
                      "حساب حذف‌شده"}{" "}
                    · {item.invoice}
                  </p>
                  {item.description && <p>{item.description}</p>}
                  <p>{paymentLabels[item.status]}</p>
                </div>
                <form
                  action={setPaymentStatus}
                  className={`${panelInlineFormClassName} gap-[.65rem]!`}
                >
                  <input type="hidden" name="id" value={item.id} />
                  <PanelSelect
                    name="status"
                    defaultValue={item.status}
                    label="وضعیت پرداخت"
                    options={[
                      { value: "pending", label: "در انتظار" },
                      { value: "paid", label: "پرداخت‌شده" },
                      { value: "failed", label: "ناموفق" },
                      { value: "refunded", label: "بازگشت‌خورده" },
                    ]}
                  />
                  <button
                    type="submit"
                    className={`${panelButtonClassName} ${panelButtonOutlineClassName}`}
                  >
                    ثبت وضعیت
                  </button>
                </form>
              </article>
            ),
          }))}
        />
      ) : (
        <PanelEmpty message="رکورد پرداختی وجود ندارد." />
      )}
    </>
  );
}
