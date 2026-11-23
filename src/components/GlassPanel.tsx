import { type ReactNode } from "react";

export function GlassPanel({
  children,
  className = "",
  hover = false,
  marks = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  marks?: boolean;
}) {
  return (
    <div
      className={[
        "glass rounded-xl",
        hover ? "glass-hover" : "",
        marks ? "corner-marks" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
