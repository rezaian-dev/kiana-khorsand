import { z } from "zod";

export const avatarFileSchema = z
  .file()
  .max(750_000, "اندازهٔ تصویر نباید بیشتر از ۷۵۰ کیلوبایت باشد.")
  .mime(
    ["image/jpeg", "image/png", "image/webp"],
    "فرمت تصویر باید JPG، PNG یا WebP باشد.",
  );
