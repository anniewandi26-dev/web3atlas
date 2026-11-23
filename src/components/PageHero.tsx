import Image from "next/image";
import { type ReactNode } from "react";

export function PageHero({
  image,
  kicker,
  title,
  subtitle,
  badge,
}: {
  image: string;
  kicker?: string;
  title: string;
  subtitle: string;
  badge?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20">
      <div className="relative aspect-[16/9] min-h-[180px] w-full sm:aspect-[21/9] sm:min-h-[220px]">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1152px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/80 via-transparent to-[#030712]/20" />
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 sm:p-7">
          {kicker ? (
            <p className="text-[11px] tracking-[0.22em] text-cyan-300/90">{kicker}</p>
          ) : null}
          <div className="flex flex-wrap items-end gap-3">
            <h1 className="font-display text-3xl text-white sm:text-4xl">{title}</h1>
            {badge}
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
