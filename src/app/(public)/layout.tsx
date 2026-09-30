import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return <><Header />{children}<Footer /></>;
}
