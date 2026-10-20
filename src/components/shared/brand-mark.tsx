import Image from "next/image";

const sizeClasses = {
  32: "size-8",
  34: "size-[34px]",
  36: "size-9",
  40: "size-10",
  42: "size-[42px]",
  52: "size-[52px]",
} as const;

/** One server-rendered mark, with separate traced SVGs for the manual theme toggle. */
export function BrandMark({
  size,
  className = "",
  priority = false,
}: {
  size: keyof typeof sizeClasses;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      data-brand-mark=""
      aria-hidden="true"
      className={`inline-grid flex-none place-items-center overflow-hidden rounded-[10px] bg-[#fff8e9] dark:bg-[#231d2b] ${sizeClasses[size]} ${className}`}
    >
      <Image
        src="/assets/logo/mark-light.svg"
        alt=""
        width={size}
        height={size}
        priority={priority}
        unoptimized
        className="block size-full object-contain dark:hidden"
      />
      <Image
        src="/assets/logo/mark-dark.svg"
        alt=""
        width={size}
        height={size}
        priority={priority}
        unoptimized
        className="hidden size-full object-contain dark:block"
      />
    </span>
  );
}
