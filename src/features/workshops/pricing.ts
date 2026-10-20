export type WorkshopDiscount = {
  percent: number;
  startsAt: string | Date;
  endsAt: string | Date; // exclusive end instant (Tehran midnight after the last day)
};

/** Calculate the actual price, never accepting a client-supplied total. */
export function workshopPrice(
  workshop: { price: number; discount?: WorkshopDiscount | null },
  now: Date = new Date(),
) {
  const discount = workshop.discount;
  const active = Boolean(
    discount &&
    discount.percent >= 1 &&
    discount.percent <= 90 &&
    Number.isInteger(discount.percent) &&
    new Date(discount.startsAt).getTime() <= now.getTime() &&
    now.getTime() < new Date(discount.endsAt).getTime() &&
    workshop.price > 0,
  );
  return {
    original: workshop.price,
    total: active
      ? Math.round((workshop.price * (100 - discount!.percent)) / 100)
      : workshop.price,
    percent: active ? discount!.percent : 0,
  };
}
