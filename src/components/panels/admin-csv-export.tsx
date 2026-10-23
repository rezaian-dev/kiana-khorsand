"use client";

import {
  panelButtonClassName,
  panelButtonOutlineClassName,
} from "@/components/panels/panel-styles";

import { Download } from "lucide-react";

function csvCell(value: string) {
  const safe =
    /^[\s]*[=+\-@\t\r]/.test(value) || /^0\d{9,}$/.test(value)
      ? `'${value}`
      : value;
  return `"${safe.replaceAll('"', '""')}"`;
}
export function AdminCsvExport({
  filename,
  headers,
  rows,
}: {
  filename: string;
  headers: string[];
  rows: string[][];
}) {
  const download = () => {
    const csv =
      "\uFEFF" +
      [headers, ...rows]
        .map((row) => row.map((value) => csvCell(value)).join(","))
        .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <button
      type="button"
      className={`${panelButtonClassName} ${panelButtonOutlineClassName}`}
      onClick={download}
    >
      <Download size={17} aria-hidden="true" /> خروجی CSV
    </button>
  );
}
