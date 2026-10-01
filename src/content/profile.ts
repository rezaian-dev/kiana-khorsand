type Profile = Readonly<{
  name: string;
  role: string;
  introduction: string;
  license: string | null;
  phone: string | null;
  whatsapp: string | null;
  instagram: string | null;
  telegram: string | null;
}>;

export const profile: Profile = {
  name: "دکتر کیانا خرسند",
  role: "روان‌شناس بالینی و مشاور خانواده",
  introduction: "فرصتی برای شنیده‌شدن، شناخت بهتر خود و پیدا کردن قدم بعدی؛ با احترام به تجربه و انتخاب شما.",
  license: null,
  phone: null,
  whatsapp: null,
  instagram: null,
  telegram: null,
};

export const notices = {
  confidentiality: "حریم خصوصی شما مهم است. فقط اطلاعات ضروری را بنویسید؛ جزئیات حساس را برای گفت‌وگوی محرمانه با درمانگر نگه دارید.",
  emergency: "این وب‌سایت خدمات اورژانسی ارائه نمی‌کند. در خطر فوری برای خود یا دیگران، با اورژانس محل زندگی‌تان تماس بگیرید یا به نزدیک‌ترین مرکز اورژانس مراجعه کنید.",
  sample: "نسخهٔ در حال تکمیل؛ تصاویر معرفی سایت، مقاله‌ها و دوره‌ها نمونه‌های مفهومی ساخته‌شده با هوش مصنوعی‌اند، نه عکس واقعی دکتر یا کلاس‌ها.",
};
