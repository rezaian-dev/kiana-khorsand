/** Human labels for the enum values the panel stores. */
export const appointmentLabels = {
  pending: "در انتظار تأیید",
  confirmed: "تأییدشده",
  completed: "انجام‌شده",
  cancelled: "لغوشده",
  no_show: "عدم حضور",
} as const;
export const paymentLabels = {
  pending: "در انتظار پرداخت",
  paid: "پرداخت‌شده",
  failed: "ناموفق",
  refunded: "برگشت‌خورده",
} as const;
