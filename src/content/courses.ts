import { images, type ImageAsset } from "./images.ts";
import type { topics } from "../lib/constants.ts";

export type Course = Readonly<{
  slug: string;
  title: string;
  description: string;
  category: keyof typeof topics;
  image: ImageAsset;
  audience: string;
  outline: readonly string[];
  boundary: string;
}>;

export const courses: readonly Course[] = [
  { slug: "understanding-stress", title: "آشنایی با استرس روزمره", description: "طرح آموزشی پیشنهادی برای شناخت تجربهٔ فشار روزمره و توجه به نیازهای خود؛ بدون خودتشخیصی.", category: "awareness", image: images.journal, audience: "برای بزرگسالانی که می‌خواهند با زبان ساده دربارهٔ استرس روزمره و مراقبت از خود بیشتر بدانند.", outline: ["تفاوت تجربهٔ استرس در افراد و موقعیت‌ها", "توجه به نیازها و زمینهٔ فشار، بدون برچسب‌زدن", "مرور قدم‌های کوچک مراقبت و زمان کمک‌گرفتن"], boundary: "این طرح، دورهٔ درمان اضطراب یا جایگزین ارزیابی فردی نیست؛ سرفصل‌ها هنوز نهایی نشده‌اند." },
  { slug: "healthy-conversation", title: "گفت‌وگویی که شنیده می‌شود", description: "طرح آموزشی پیشنهادی دربارهٔ شنیدن، بیان نیازها و مکث در گفت‌وگوهای دشوار روزمره.", category: "communication", image: images.conversation, audience: "برای بزرگسالانی که به مرور مهارت‌های عمومی ارتباط در موقعیت‌های معمول زندگی علاقه دارند.", outline: ["تفاوت شنیدن با آماده‌کردن پاسخ", "بیان روشن نیاز و درخواست، به‌جای حدس‌زدن", "شناخت محدودیت‌ها و زمان مکث در گفت‌وگو"], boundary: "آموزش مهارت ارتباط جایگزین رسیدگی تخصصی به رابطهٔ ناامن یا خشونت نیست و مسئولیت رفتار دیگری را بر عهدهٔ شما نمی‌گذارد." },
  { slug: "family-boundaries", title: "مرزهای سالم در خانواده", description: "طرح آموزشی پیشنهادی دربارهٔ حریم فردی، تفاوت‌ها و مسئولیت‌های مشترک در روابط خانوادگی.", category: "family", image: images.family, audience: "برای بزرگسالانی که می‌خواهند دربارهٔ مفهوم مرز و احترام متقابل در خانواده بیشتر فکر کنند.", outline: ["شناخت حریم شخصی در کنار رابطهٔ نزدیک", "گفت‌وگو دربارهٔ تفاوت نیازها و مسئولیت‌ها", "مرور موقعیت‌های روزمره، بدون نسخهٔ یکسان"], boundary: "این طرح، برنامهٔ تخصصی کودک یا مداخلهٔ خانوادگی نیست؛ نیازهای خاص به بررسی حرفه‌ای جداگانه نیاز دارند." },
];
