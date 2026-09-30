import { images, type ImageAsset } from "@/content/images";
import { routes } from "@/lib/constants";

export type Service = Readonly<{ key: "individual" | "couples" | "family" | "online"; title: string; description: string; image: ImageAsset; href: string }>;
export type Course = Readonly<{ slug: string; title: string; description: string; category: string; image: ImageAsset }>;
export type Article = Readonly<{ slug: string; title: string; description: string; category: string; image: ImageAsset }>;
export type Story = Readonly<{ key: string; label: string; title: string; description: string; image: ImageAsset }>;

export const services: readonly Service[] = [
  { key: "individual", title: "مشاورهٔ فردی", description: "وقتی می‌خواهید احساس‌ها، دغدغه‌ها و الگوهای زندگی‌تان را بهتر بشناسید؛ با فضایی برای صحبت از خودتان.", image: images.journal, href: `${routes.services}#individual` },
  { key: "couples", title: "مشاورهٔ زوج‌ها", description: "فرصتی برای شنیدن یکدیگر و گفت‌وگو دربارهٔ نیازها، تفاوت‌ها و دشواری‌های رابطه.", image: images.conversation, href: `${routes.services}#couples` },
  { key: "family", title: "مشاورهٔ خانواده", description: "برای گفت‌وگو دربارهٔ ارتباط میان اعضای خانواده، مرزها و تغییرهایی که تجربه می‌کنید.", image: images.family, href: `${routes.services}#family` },
  { key: "online", title: "مشاورهٔ آنلاین", description: "گفت‌وگو از فضای خصوصی خودتان؛ مناسب‌بودن این شیوه و شرایط برگزاری، پیش از شروع بررسی می‌شود.", image: images.online, href: `${routes.services}#online` },
];

export const steps = [
  { number: 1, title: "مسیر گفت‌وگو را انتخاب کنید", description: "مشاورهٔ فردی، زوج‌ها یا خانواده؛ اگر مطمئن نیستید، برای انتخاب راهنمایی بگیرید." },
  { number: 2, title: "زمان مناسب را پیدا کنید", description: "در بخش رزرو، زمان‌ها و شیوهٔ برگزاری جلسه را بررسی خواهید کرد." },
  { number: 3, title: "درخواستتان را ثبت کنید", description: "اطلاعات ضروری را وارد کنید؛ وضعیت درخواست و تأیید نوبت در حسابتان مشخص می‌شود." },
] as const;

export const courses: readonly Course[] = [
  { slug: "understanding-stress", title: "آشنایی با استرس روزمره", description: "موضوع پیشنهادی برای شناخت نشانه‌های استرس و توجه به نیازهای خود در زندگی روزمره.", category: "خودآگاهی", image: images.journal },
  { slug: "healthy-conversation", title: "گفت‌وگویی که شنیده می‌شود", description: "موضوع پیشنهادی دربارهٔ شنیدن فعال، بیان روشن نیازها و مکث در گفت‌وگوهای دشوار.", category: "مهارت ارتباط", image: images.conversation },
  { slug: "family-boundaries", title: "مرزهای سالم در خانواده", description: "موضوع پیشنهادی دربارهٔ احترام به تفاوت‌ها، حریم شخصی و رابطهٔ نزدیک میان اعضای خانواده.", category: "خانواده", image: images.family },
];

export const articles: readonly Article[] = [
  { slug: "first-session", title: "برای جلسهٔ اول مشاوره چه آماده کنیم؟", description: "موضوعی برای آشنایی با شروع گفت‌وگو، پرسش‌هایی که می‌توانید بپرسید و انتظاری واقع‌بینانه از جلسهٔ اول.", category: "شروع مشاوره", image: images.online },
  { slug: "everyday-stress", title: "وقتی استرس در روزمره همراه ماست", description: "موضوعی برای توجه به تجربهٔ بدن و ذهن، بدون برچسب‌زدن یا تشخیص‌گذاری به خودمان.", category: "زندگی روزمره", image: images.walk },
  { slug: "evening-routine", title: "چطور برای پایان روز فضای آرام‌تری بسازیم؟", description: "موضوعی دربارهٔ عادت‌های سادهٔ عصرگاهی و توجه به استراحت؛ نه نسخه‌ای یکسان برای همه.", category: "مراقبت از خود", image: images.evening },
];

export const stories: readonly Story[] = [
  { key: "one", label: "نمونهٔ اول", title: "روایت، با انتخاب خود شما", description: "در این جایگاه، تجربهٔ واقعی تنها پس از دریافت رضایت برای انتشار قرار می‌گیرد. این متن، نظر یک مراجع نیست.", image: images.rosePortrait },
  { key: "two", label: "نمونهٔ دوم", title: "حریم خصوصی، پیش از هر چیز", description: "نام و جزئیات شناسایی بدون اجازه منتشر نمی‌شوند. این کارت و تصویر آن صرفاً نمونهٔ طراحی هستند.", image: images.tealPortrait },
  { key: "three", label: "نمونهٔ سوم", title: "هر تجربه، مسیر خودش را دارد", description: "تجربهٔ یک فرد تضمین نتیجه برای فرد دیگری نیست. هنوز هیچ نظر واقعی برای انتشار در این بخش ثبت نشده است.", image: images.indigoPortrait },
];

export const questions = [
  { key: "start", question: "اگر ندانم از کجا شروع کنم چه؟", answer: "لازم نیست پیش از جلسه همه‌چیز روشن باشد. می‌توانید از همان موضوعی بگویید که این روزها بیشتر ذهنتان را درگیر کرده است؛ موضوع و هدف گفت‌وگو با همراهی هم مشخص می‌شود." },
  { key: "first", question: "در جلسهٔ اول دربارهٔ چه صحبت می‌کنیم؟", answer: "معمولاً فرصتی برای آشنایی، شنیدن دغدغه‌ها و انتظارات شما و توضیح شیوهٔ همکاری است. می‌توانید دربارهٔ روند جلسات، هزینه و حدود محرمانگی هم سؤال کنید." },
  { key: "privacy", question: "آیا گفت‌وگوهای من محرمانه می‌مانند؟", answer: "حفظ حریم خصوصی بخشی از همکاری حرفه‌ای است. حدود قانونی محرمانگی و شرایط مرتبط با حفظ ایمنی، پیش از شروع همکاری توضیح داده می‌شوند. در فرم‌ها فقط اطلاعات ضروری را بنویسید." },
  { key: "online", question: "آیا مشاورهٔ آنلاین برای من مناسب است؟", answer: "این موضوع به شرایط و نیاز شما بستگی دارد و پیش از شروع بررسی می‌شود. برای گفت‌وگوی آنلاین، دسترسی به اینترنت و فضایی خصوصی و بدون مزاحمت اهمیت دارد." },
] as const;
