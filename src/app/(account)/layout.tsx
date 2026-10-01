import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type Props = { children: ReactNode };
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Layout({ children }: Props) {
  // Every private page also reads its authorized DTO; a reusable layout is not an authorization boundary.
  return <><Header />{children}<Footer /></>;
}
