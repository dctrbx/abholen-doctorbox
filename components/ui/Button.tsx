import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-3 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const sizes = {
  md: "px-5 py-3 text-h8",
  lg: "px-7 py-4 text-h7",
} as const;

const variants = {
  primary:
    "bg-moss text-soft hover:bg-moss-700 hover:-translate-y-0.5 shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-12px_rgba(14,77,47,0.6)] focus-visible:outline-moss",
  light:
    "bg-soft text-moss hover:bg-white hover:-translate-y-0.5 focus-visible:outline-soft",
  outline:
    "border border-moss/25 bg-transparent text-moss hover:border-moss hover:bg-moss/5 focus-visible:outline-moss",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function Button({
  children,
  href,
  variant = "primary",
  size = "lg",
  className,
  ...rest
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
