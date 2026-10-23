import {
  panelListItemClassName,
  panelCardClassName,
  panelButtonClassName,
  panelButtonOutlineClassName,
} from "@/components/panels/panel-styles";
import Link from "next/link";
import { adminUsers } from "@/features/admin/queries";
import { AdminCsvExport } from "@/components/panels/admin-csv-export";
import { CreateClientForm } from "@/features/admin/ui/create-client-form";
import { FilterableList } from "@/components/panels/filterable-list";
import { PanelHeading, PanelEmpty } from "@/components/panels/panel-heading";
import { formatDate } from "@/lib/format";
export const metadata = { title: "مراجعان" };
export default async function Page() {
  const users = await adminUsers();
  return (
    <>
      <PanelHeading
        title="مراجعان"
        description="حساب‌های ثبت‌شده را جست‌وجو کنید. اطلاعات حساب فقط برای مدیر مجاز قابل مشاهده است."
        toolbar={
          <AdminCsvExport
            filename="clients.csv"
            headers={["نام", "شماره حساب", "نقش", "تاریخ عضویت"]}
            rows={users.map((item) => [
              item.name,
              item.username,
              item.role === "admin" ? "مدیر" : "کاربر",
              item.createdAt ? formatDate(item.createdAt) : "",
            ])}
          />
        }
      />
      <CreateClientForm />
      {users.length ? (
        <FilterableList
          label="جست‌وجو بر اساس نام یا شماره"
          options={[
            { value: "user", label: "کاربر" },
            { value: "admin", label: "مدیر" },
          ]}
          items={users.map((item) => ({
            key: item.id,
            search: `${item.name} ${item.username}`,
            status: item.role,
            content: (
              <article
                className={`${panelCardClassName} ${panelListItemClassName}`}
              >
                <div>
                  <h2>{item.name}</h2>
                  <p dir="ltr">{item.username}</p>
                  <p>
                    {item.role === "admin" ? "مدیر" : "کاربر"}
                    {item.createdAt && ` · ${formatDate(item.createdAt)}`}
                  </p>
                </div>
                <Link
                  href={`/admin/client?id=${item.id}`}
                  className={`${panelButtonClassName} ${panelButtonOutlineClassName}`}
                >
                  پرونده حساب
                </Link>
              </article>
            ),
          }))}
        />
      ) : (
        <PanelEmpty message="حسابی یافت نشد." />
      )}
    </>
  );
}
