import {
  panelInlineFormClassName,
  panelButtonClassName,
  panelButtonOutlineClassName,
} from "@/components/panels/panel-layout-classes";
import { PanelSelect } from "@/components/panels/panel-select";
import { setCatalogStatus } from "@/actions/admin";
export function AdminStatus({
  kind,
  slug,
  value,
}: {
  kind: "services" | "articles" | "workshops" | "testimonials";
  slug: string;
  value: "draft" | "published" | "hidden";
}) {
  return (
    <form
      action={setCatalogStatus}
      className={`${panelInlineFormClassName} gap-[.65rem]!`}
    >
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="slug" value={slug} />
      <PanelSelect
        name="status"
        defaultValue={value}
        label={`وضعیت انتشار ${slug}`}
        options={[
          { value: "draft", label: "پیش‌نویس" },
          { value: "published", label: "منتشرشده" },
          { value: "hidden", label: "پنهان" },
        ]}
      />
      <button
        className={`${panelButtonClassName} ${panelButtonOutlineClassName}`}
        type="submit"
      >
        ذخیره
      </button>
    </form>
  );
}
