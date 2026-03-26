import type { ButtonHTMLAttributes } from "react";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-accent text-surface hover:bg-accent-muted"
      : variant === "danger"
        ? "bg-red-600 text-white hover:bg-red-500"
        : "border border-surface-border bg-transparent text-zinc-200 hover:bg-white/5";

  return (
    <button type="button" className={`${base} ${styles} ${className}`} {...props} />
  );
}
