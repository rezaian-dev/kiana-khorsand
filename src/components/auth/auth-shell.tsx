import { BrandMark } from "@/components/shared/brand-mark";
import Image from "next/image";
import {
  fieldPolishClassName,
  fieldReducedMotionClassName,
} from "@/components/layout/field-polish-classes";
import Link from "next/link";
import { AuthCardReveal } from "./auth-card-reveal";

export function AuthShell({
  title,
  description,
  children,
  loginVisual = false,
  registerVisual = false,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  loginVisual?: boolean;
  registerVisual?: boolean;
}) {
  return (
    <main
      className={[
        fieldPolishClassName,
        fieldReducedMotionClassName,
        "auth-new-shell grid min-h-dvh grid-cols-1 text-[#26213f] [direction:ltr] motion-reduce:*:scroll-auto min-[851px]:grid-cols-[minmax(0,.9fr)_minmax(0,1fr)] dark:text-[#f7f3ff]",
        registerVisual
          ? "auth-new-shell-register bg-[#f8f7f3] dark:bg-[#191f23]"
          : "bg-[#fcfafc] dark:bg-[#191523]",
        loginVisual && "auth-new-shell-login",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <aside
        className={[
          "relative hidden items-center bg-[radial-gradient(circle_at_25%_30%,#bc88d9_0%,#7352b8_43%,#352451_100%)] text-white [direction:rtl] min-[851px]:grid",
          registerVisual
            ? "p-[clamp(1.2rem,3.5vw,3rem)]"
            : "p-[clamp(2rem,6vw,6rem)]",
          loginVisual &&
            "isolate overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(180deg,transparent_22%,rgb(13_40_40/30%)_54%,rgb(9_28_36/70%)_100%)] before:content-[''] min-[851px]:items-end",
          registerVisual &&
            "isolate overflow-hidden bg-[#c7c7ab] bg-none before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(180deg,transparent_40%,rgb(11_43_43/16%)_68%,rgb(10_37_41/65%)_100%)] before:content-[''] min-[851px]:items-end",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        {(loginVisual || registerVisual) && (
          <Image
            src={
              registerVisual
                ? "/assets/images/register-new-beginning.webp"
                : "/assets/images/login-calm-room.jpg"
            }
            alt=""
            fill
            sizes="(max-width: 850px) 0px, 45vw"
            priority={loginVisual}
            className="auth-new-aside-photo absolute inset-0 h-full w-full rounded-none bg-transparent object-cover object-center"
          />
        )}
        <div
          className={[
            "auth-new-aside-inner mx-auto max-w-[560px]",
            loginVisual &&
              "relative z-[2] rounded-[26px] border border-white/35 bg-[rgb(15_42_48/65%)] p-[clamp(1.4rem,3vw,2.3rem)] shadow-[0_18px_60px_rgb(6_24_28/22%)] backdrop-blur-[10px]",
            registerVisual &&
              "relative z-[2] mx-auto w-full max-w-[590px] rounded-[34px_34px_34px_8px] border border-white/40 bg-[rgb(10_48_50/80%)] p-[clamp(1.35rem,3vw,2.4rem)] shadow-[0_24px_70px_rgb(11_38_36/23%)] backdrop-blur-[8px]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <BrandMark size={52} className="rounded-[14px] bg-white" />
          <p
            className={`font-extrabold text-balance ${
              loginVisual
                ? "my-4 text-[clamp(1.55rem,2.7vw,2.6rem)] leading-[1.7]"
                : registerVisual
                  ? "mt-[.7rem] mb-[.45rem] text-[clamp(1.55rem,2.6vw,2.6rem)] leading-[1.72]"
                  : "my-8 text-[clamp(2rem,3.4vw,3.4rem)] leading-[1.8]"
            }`}
          >
            {registerVisual
              ? "گاهی یک شروع تازه، از یک گفت‌وگوی امن آغاز می‌شود."
              : "برای شروع دوباره، لازم نیست همه‌چیز را از قبل بدانیم. همین‌که قدم اول را برداریم کافی است."}
          </p>
          <span className="opacity-90">کیانا خرسند · مشاوره روان‌شناسی</span>
        </div>
      </aside>
      <section
        className={[
          "grid place-items-center px-[clamp(.75rem,3vw,2.5rem)] py-[clamp(.75rem,3vh,2rem)] [direction:rtl] [@media(max-height:680px)]:py-2",
          loginVisual &&
            "[@media(max-width:850px)_and_(min-height:790px)]:[background:linear-gradient(180deg,rgb(255_255_255/85%)_0,#fcfafc_175px),url('/assets/images/login-calm-room.jpg')_center_top/100%_auto_no-repeat] dark:[@media(max-width:850px)_and_(min-height:790px)]:[background:linear-gradient(180deg,rgb(25_21_35/85%)_0,#191523_175px),url('/assets/images/login-calm-room.jpg')_center_top/100%_auto_no-repeat]",
          registerVisual &&
            "bg-[#f8f7f3] [background-image:radial-gradient(circle_at_100%_0,rgb(189_213_199/30%),transparent_48%)] dark:bg-[#191f23] dark:[background-image:none] [@media(max-width:359px)_and_(min-height:720px)]:gap-1! [@media(max-width:850px)_and_(max-height:719px)]:py-[.35rem] [@media(max-width:850px)_and_(min-height:720px)]:flex [@media(max-width:850px)_and_(min-height:720px)]:flex-col [@media(max-width:850px)_and_(min-height:720px)]:justify-center [@media(max-width:850px)_and_(min-height:720px)]:gap-[.6rem] [@media(max-width:850px)_and_(min-height:720px)]:py-[.8rem] [@media(min-width:360px)_and_(max-width:420px)_and_(min-height:720px)_and_(max-height:759px)]:gap-[.35rem]",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-labelledby="auth-heading"
      >
        {registerVisual && (
          <div
            className="auth-new-register-mobile-art hidden w-[min(100%,430px)] items-end justify-start rounded-[22px_22px_22px_6px] px-[.9rem] py-[.6rem] shadow-[0_12px_32px_-18px_rgb(10_55_52/50%)] [background:linear-gradient(90deg,rgb(10_50_47/66%),transparent_85%),url('/assets/images/register-new-beginning.webp')_center_57%/cover] [@media(max-width:359px)_and_(min-height:720px)]:min-h-[53px]! [@media(max-width:359px)_and_(min-height:720px)]:py-[.3rem] [@media(max-width:850px)_and_(min-height:720px)]:flex [@media(max-width:850px)_and_(min-height:720px)]:min-h-[clamp(75px,12vh,114px)] [@media(min-width:360px)_and_(max-width:420px)_and_(min-height:720px)_and_(max-height:759px)]:min-h-16"
            aria-hidden="true"
          >
            <span className="text-xs font-extrabold text-white [text-shadow:0_2px_6px_rgb(0_0_0/45%)]">
              یک قدم، رو به روشنایی
            </span>
          </div>
        )}
        <AuthCardReveal>
          <Link
            href="/"
            className="inline-flex items-center gap-[.6rem] text-base font-extrabold"
          >
            <BrandMark size={34} className="rounded-[10px]" />{" "}
            <span>کیانا خرسند</span>
          </Link>
          <div className="mt-[clamp(.8rem,2vh,1.8rem)] mb-4 [@media(max-height:680px)]:my-[.6rem] [@media(max-width:359px)_and_(max-height:600px)]:mt-1 [@media(max-width:359px)_and_(max-height:600px)]:mb-[.35rem]">
            <h1
              id="auth-heading"
              className="text-[clamp(1.45rem,3vw,2.2rem)] leading-[1.35] font-extrabold [@media(max-width:359px)_and_(max-height:600px)]:text-[1.4rem]"
            >
              {title}
            </h1>
            <p className="mt-1 text-[.87rem] leading-[1.7] text-[#565273] dark:text-[#d5cce4] [@media(max-width:359px)_and_(max-height:600px)]:mt-0 [@media(max-width:359px)_and_(max-height:600px)]:text-[.8rem]">
              {description}
            </p>
          </div>
          {children}
          <Link
            href="/"
            className="mt-[.9rem] block text-center text-[.8rem] text-[#565273] dark:text-[#d5cce4] [@media(max-height:680px)]:mt-[.45rem]"
          >
            بازگشت به صفحه اصلی ←
          </Link>
        </AuthCardReveal>
      </section>
    </main>
  );
}
