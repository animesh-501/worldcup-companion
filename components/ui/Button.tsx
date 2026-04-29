import { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-coral text-white hover:bg-[#d94f37]",
        variant === "secondary" && "bg-midnight text-white hover:bg-slate-800",
        variant === "ghost" && "bg-white text-midnight ring-1 ring-slate-200 hover:bg-slate-50",
        className
      )}
      {...props}
    />
  );
}
