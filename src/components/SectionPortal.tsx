import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { sectionCovers } from "@/lib/media";

const portals = [
  { href: "/", key: "explore", cover: sectionCovers.explore },
  { href: "/ecosystem", key: "ecosystem", cover: sectionCovers.ecosystem },
  { href: "/news", key: "news", cover: sectionCovers.news },
  { href: "/chronicle", key: "chronicle", cover: sectionCovers.chronicle },
  { href: "/security", key: "security", cover: sectionCovers.security },
  { href: "/glossary", key: "glossary", cover: sectionCovers.glossary },
] as const;

export function SectionPortal({
  labels,
  openLabel = "OPEN",
}: {
  labels: Record<(typeof portals)[number]["key"], string>;
  openLabel?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {portals.map((p) => (
        <Link
          key={p.key}
          href={p.href}
          className="group relative overflow-hidden rounded-2xl border border-cyan-400/20"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={p.cover}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="font-display text-sm text-white drop-shadow">{labels[p.key]}</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-200/80">
                {openLabel} →
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
