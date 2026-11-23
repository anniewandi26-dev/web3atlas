import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { type ReactNode } from "react";

export function MediaCard({
  href,
  image,
  eyebrow,
  title,
  description,
  footer,
}: {
  href?: string;
  image: string;
  eyebrow?: ReactNode;
  title: string;
  description: string;
  footer?: ReactNode;
}) {
  const inner = (
    <article className="glass glass-hover overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/25 to-transparent" />
        {eyebrow ? (
          <div className="absolute left-3 top-3">{eyebrow}</div>
        ) : null}
      </div>
      <div className="space-y-2 p-4 sm:p-5">
        <h2 className="text-lg font-medium text-white">{title}</h2>
        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>
        {footer}
        {href && !footer ? (
          <p className="pt-1 text-xs text-cyan-300/90">→</p>
        ) : null}
      </div>
    </article>
  );

  if (!href) return <div className="block">{inner}</div>;
  return (
    <Link href={href} className="group block cursor-pointer">
      {inner}
    </Link>
  );
}
