"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

const nodes = [
  { label: "DeFi", x: 18, y: 28 },
  { label: "NFTs", x: 78, y: 24 },
  { label: "L2", x: 86, y: 62 },
  { label: "DAO", x: 14, y: 68 },
  { label: "Wallet", x: 50, y: 86 },
];

export function HeroOrbit() {
  const t = useTranslations("hero");
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute right-2 top-2 z-10 rounded-md border border-cyan-400/25 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-wider text-cyan-200/80"
      >
        {paused ? t("play") : t("pause")}
      </button>
      <div
        className={[
          "absolute inset-[12%] rounded-full border border-cyan-400/20",
          paused ? "" : "animate-drift",
        ].join(" ")}
      />
      <div className="absolute inset-[22%] rounded-full border border-indigo-400/20" />
      <div
        className={[
          "absolute inset-[32%] flex items-center justify-center rounded-[28%] border border-cyan-300/40 bg-gradient-to-br from-cyan-400/15 via-transparent to-indigo-500/25 shadow-[0_0_60px_rgba(34,211,238,0.2)]",
          paused ? "" : "animate-float",
        ].join(" ")}
      >
        <svg viewBox="0 0 120 120" className="h-[70%] w-[70%] text-cyan-300/90">
          <polygon
            points="60,8 100,32 100,78 60,112 20,78 20,32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polygon
            points="60,28 82,42 82,70 60,84 38,70 38,42"
            fill="rgba(34,211,238,0.08)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="60" cy="60" r="4" fill="#22d3ee" />
        </svg>
      </div>
      {nodes.map((n) => (
        <span
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-cyan-400/30 bg-[#07111f]/85 px-2 py-1 font-display text-[10px] tracking-wider text-cyan-100 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.label}
        </span>
      ))}
    </div>
  );
}
