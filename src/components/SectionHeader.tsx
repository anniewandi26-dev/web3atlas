import { Link } from "@/i18n/navigation";
import { type ReactNode } from "react";

export function SectionHeader({
  kicker,
  title,
  desc,
  actionHref,
  actionLabel,
}: {
  kicker: string;
  title: string;
  desc: string;
  actionHref?: string;
  actionLabel?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.22em] text-cyan-300/80">{kicker}</p>
        <h2 className="font-display mt-1 text-2xl text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{desc}</p>
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="text-sm text-cyan-300 transition hover:text-cyan-200"
        >
          {actionLabel} →
        </Link>
      ) : null}
    </div>
  );
}
