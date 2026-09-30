import { Accordion } from "@/components/ui/accordion";
import { AccordionItem } from "@/components/ui/accordion-item";
import { AccordionTrigger } from "@/components/ui/accordion-trigger";
import { AccordionContent } from "@/components/ui/accordion-content";

export function FaqDemo() {
  return <Accordion type="single" collapsible className="faq-demo"><AccordionItem value="preview"><AccordionTrigger>آیا از این صفحه می‌توانم نوبت بگیرم؟</AccordionTrigger><AccordionContent>خیر. این صفحه فقط نمایش سیستم طراحی است. رزرو، ورود و صفحات محتوایی در فازهای بعد ساخته می‌شوند.</AccordionContent></AccordionItem><AccordionItem value="photo"><AccordionTrigger>آیا تصاویر متعلق به دکتر یا مراجعان هستند؟</AccordionTrigger><AccordionContent>خیر. این‌ها تصاویر نمونهٔ ساخته‌شده با هوش مصنوعی‌اند. پیش از انتشار باید تصویر واقعی و تأییدشدهٔ دکتر جایگزین شود.</AccordionContent></AccordionItem><AccordionItem value="privacy"><AccordionTrigger>اطلاعات فرم نمونه کجا ذخیره می‌شود؟</AccordionTrigger><AccordionContent>هیچ‌جا. اعتبارسنجی فقط در همین مرورگر انجام می‌شود و داده‌ای به سرور ارسال نمی‌شود. لطفاً اطلاعات حساس ننویسید.</AccordionContent></AccordionItem></Accordion>;
}
