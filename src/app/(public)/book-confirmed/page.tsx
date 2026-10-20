import type { ReceiptPageProps } from "@/types/routes";
import { notFound, permanentRedirect } from "next/navigation";
import { isBookingId } from "@/validations/routes";

export default async function Page({ searchParams }: ReceiptPageProps) {
  const { id } = await searchParams;
  if (!isBookingId(id)) notFound();
  permanentRedirect(`/book/done?id=${id}`);
}
