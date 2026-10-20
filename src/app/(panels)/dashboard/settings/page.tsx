import { panelStackClassName } from "@/components/panels/panel-layout-classes";
import { requireUser } from "@/lib/session";
import { PanelHeading } from "@/components/panels/ui";
import { AvatarForm } from "@/features/dashboard/ui/avatar-form";
import { SettingsForm } from "@/features/dashboard/ui/settings-form";
import { PasswordChangeForm } from "@/features/dashboard/ui/password-change-form";
export const metadata = { title: "تنظیمات حساب" };
export default async function Page() {
  const { user } = await requireUser();
  return (
    <>
      <PanelHeading
        title="تنظیمات حساب"
        description="اطلاعات شخصی این حساب را مرور و ویرایش کنید."
      />
      <div className="max-w-[600px]">
        <div className={panelStackClassName}>
          <AvatarForm name={user.name} image={user.image} userId={user.id} />
          <SettingsForm name={user.name} phone={user.username || ""} />
          <PasswordChangeForm />
        </div>
      </div>
    </>
  );
}
