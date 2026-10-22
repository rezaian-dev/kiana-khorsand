import { requireUser } from "@/lib/session";
import { PanelHeading } from "@/components/panels/ui";
import { ProfileSummary } from "@/features/dashboard/ui/profile-summary";
import { AvatarForm } from "@/features/dashboard/ui/avatar-form";
import { SettingsForm } from "@/features/dashboard/ui/settings-form";
import { PasswordChangeForm } from "@/features/dashboard/ui/password-change-form";

export const metadata = { title: "پروفایل من" };

/**
 * Customer profile. This is the whole of the account experience — administrators do
 * not get extra entries here; they manage the site from `/admin`.
 */
export default async function Page() {
  const { user } = await requireUser();

  return (
    <>
      <PanelHeading
        title="پروفایل من"
        description="مشخصات حساب، تصویر پروفایل و امنیت ورود — همه در یک‌جا."
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <div className="grid gap-4 lg:sticky lg:top-24">
          <ProfileSummary
            name={user.name}
            phone={user.username || ""}
            image={user.image}
            userId={user.id}
            createdAt={user.createdAt}
          />
          <AvatarForm name={user.name} image={user.image} userId={user.id} />
        </div>

        <div className="grid gap-4">
          <SettingsForm name={user.name} phone={user.username || ""} />
          <PasswordChangeForm />
        </div>
      </div>
    </>
  );
}
