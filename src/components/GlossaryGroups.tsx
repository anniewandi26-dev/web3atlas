"use client";

import { GlassPanel } from "@/components/GlassPanel";
import { glossaryGroups } from "@/lib/media";
import Image from "next/image";

export function GlossaryGroups({
  activeId,
  onSelect,
  isZh,
}: {
  activeId: string | null;
  onSelect: (id: string | null) => void;
  isZh: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {glossaryGroups.map((g) => {
        const active = activeId === g.id;
        return (
          <button
            key={g.id}
            type="button"
            onClick={() => onSelect(active ? null : g.id)}
            className="text-left"
          >
            <GlassPanel
              className={[
                "overflow-hidden transition",
                active ? "ring-1 ring-cyan-400/60" : "hover:border-cyan-400/40",
              ].join(" ")}
            >
              <div className="relative h-24">
                <Image src={g.image} alt="" fill className="object-cover" sizes="240px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061018] to-transparent" />
                <p className="absolute bottom-2 left-3 font-display text-sm text-white">
                  {isZh ? g.titleZh : g.titleEn}
                </p>
              </div>
              <p className="px-3 py-2 text-[11px] text-[var(--muted)]">
                {g.ids.length} · {active ? "✓" : "→"}
              </p>
            </GlassPanel>
          </button>
        );
      })}
    </div>
  );
}
