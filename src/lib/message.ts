import { z } from "zod";

export const messageSchema = z.object({
  name: z.string().trim().min(2, "نام را با دست‌کم دو حرف بنویسید.").max(80, "نام را کوتاه‌تر بنویسید."),
  message: z.string().trim().min(10, "دست‌کم ده نویسه بنویسید.").max(1000, "حداکثر هزار نویسه مجاز است."),
});
