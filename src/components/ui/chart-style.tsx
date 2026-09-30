import { THEMES, type ChartConfig } from "./chart-context";

type Props = { id: string; config: ChartConfig };

export function ChartStyle({ id, config }: Props) {
  const colors = Object.entries(config).filter(([, entry]) => entry.theme ?? entry.color);
  if (!colors.length) return null;
  // Config is authored code, not user input; escape style terminators defensively.
  const styles = Object.entries(THEMES).map(([theme, prefix]) => `${prefix} [data-chart="${id}"] {\n${colors.map(([key, entry]) => {
    const color = entry.theme?.[theme as keyof typeof THEMES] ?? entry.color;
    return color ? `--color-${key}: ${color};` : "";
  }).join("\n")}\n}`).join("\n").replace(/</g, "\\3c ");
  return <style>{styles}</style>;
}
