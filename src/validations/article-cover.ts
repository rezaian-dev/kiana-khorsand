import { z } from "zod";

export const articleCoverFile = z
  .file()
  .max(2_000_000)
  .mime(["image/jpeg", "image/png", "image/webp"]);
