export type BookingState = { error: string; id: string };
export type BookingService = {
  slug: string;
  name: string;
  price: number;
  duration: number;
};
export type BookingSlot = { startsAt: string; label: string };
export type BookingFormProps = {
  services: BookingService[];
  slots: BookingSlot[];
  name: string;
  phone: string;
};
