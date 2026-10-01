import { z } from "zod";

export const messageSchema = z.object({
  name: z.string().trim().max(80, "نام را حداکثر در ۸۰ نویسه بنویسید."),
  email: z.string().trim().pipe(z.email({ error: "یک نشانی ایمیل معتبر وارد کنید." }).max(254, "ایمیل بیش از حد طولانی است.")),
  message: z.string().trim().min(20, "پیام را دست‌کم در ۲۰ نویسه بنویسید.").max(1200, "حداکثر ۱۲۰۰ نویسه بنویسید."),
});

export type Message = z.infer<typeof messageSchema>;
