export type AdminHoursRow = {
  key: "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";
  day: string;
  on: boolean;
  from: string;
  to: string;
};
export type AdminSettingField = {
  id: string;
  label: string;
  value: string;
  type?: "text" | "email" | "tel" | "url";
  required?: boolean;
  span?: boolean;
  hint?: string;
};
