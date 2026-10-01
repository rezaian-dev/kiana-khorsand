import { images, type ImageAsset } from "@/content/images";

export type Story = Readonly<{ key: string; label: string; title: string; description: string; image: ImageAsset }>;

export const stories: readonly Story[] = [
  { key: "one", label: "نمونهٔ اول", title: "روایت، با انتخاب خود شما", description: "در این جایگاه، تجربهٔ واقعی تنها پس از دریافت رضایت برای انتشار قرار می‌گیرد. این متن، نظر یک مراجع نیست.", image: images.rosePortrait },
  { key: "two", label: "نمونهٔ دوم", title: "حریم خصوصی، پیش از هر چیز", description: "نام و جزئیات شناسایی بدون اجازه منتشر نمی‌شوند. این کارت و تصویر آن صرفاً نمونهٔ طراحی هستند.", image: images.tealPortrait },
  { key: "three", label: "نمونهٔ سوم", title: "هر تجربه، مسیر خودش را دارد", description: "تجربهٔ یک فرد تضمین نتیجه برای فرد دیگری نیست. هنوز هیچ نظر واقعی برای انتشار در این بخش ثبت نشده است.", image: images.indigoPortrait },
];

