import { Link } from "@/i18n/navigation";
import { type ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function TechButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: Props) {
  const cls = [
    "tech-btn",
    variant === "primary" ? "tech-btn-primary" : "tech-btn-ghost",
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
