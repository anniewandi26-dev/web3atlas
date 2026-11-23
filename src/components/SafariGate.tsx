"use client";

import { buildSafariOpenUrl, isAppleSafari } from "@/lib/safari";
import { sectionCovers } from "@/lib/media";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SafariGate() {
  const tIntro = useTranslations("intro");
  const tSafari = useTranslations("safariGate");
  const tBrand = useTranslations("brand");
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShow(!isAppleSafari());
  }, []);

  function openSafari() {
    const href = window.location.href;
    const safariUrl = buildSafariOpenUrl(href);

    try {
      window.location.href = safariUrl;
    } catch {
      // continue
    }

    window.setTimeout(async () => {
      try {
        await navigator.clipboard.writeText(href);
        setCopied(true);
      } catch {
        // ignore
      }
      const a = document.createElement("a");
      a.href = safariUrl;
      a.rel = "noopener";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, 400);
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="safari-gate-title"
      aria-describedby="safari-gate-desc"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0">
        <Image
          src={sectionCovers.explore}
          alt=""
          fill
          priority
          className="object-cover scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#030712]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.22),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative h-full w-full overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
        <div className="mx-auto flex min-h-full w-full max-w-xl flex-col px-6 pb-10 pt-10">
          <div className="text-center">
            <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-cyan-300/90">
              {tBrand("tagline")}
            </p>
            <h1 className="font-display text-3xl text-white sm:text-5xl">
              <span className="gradient-text">{tBrand("name")}</span>
            </h1>
            <p
              id="safari-gate-title"
              className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base"
            >
              {tIntro("headline")}
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center py-10">
            <button
              type="button"
              onClick={openSafari}
              className="tech-btn tech-btn-primary min-w-[220px] animate-float text-base"
            >
              {tSafari("openSafari")} →
            </button>
            {copied ? (
              <p className="mt-3 text-xs text-cyan-200/90">{tSafari("copied")}</p>
            ) : null}
          </div>

          <div className="pb-4 text-center">
            <p
              id="safari-gate-desc"
              className="mb-3 text-xs leading-relaxed text-[var(--muted)] sm:text-sm"
            >
              {tSafari("note")}
            </p>
            <p className="mb-4 text-xs leading-relaxed text-white/75 sm:text-sm">
              {tIntro("body")}
            </p>
            <ul className="grid gap-2 text-left text-xs text-cyan-100/90 sm:grid-cols-2 sm:text-sm">
              <li className="rounded-lg border border-cyan-400/20 bg-black/35 px-3 py-2 backdrop-blur">
                {tIntro("point1")}
              </li>
              <li className="rounded-lg border border-cyan-400/20 bg-black/35 px-3 py-2 backdrop-blur">
                {tIntro("point2")}
              </li>
              <li className="rounded-lg border border-cyan-400/20 bg-black/35 px-3 py-2 backdrop-blur">
                {tIntro("point3")}
              </li>
              <li className="rounded-lg border border-cyan-400/20 bg-black/35 px-3 py-2 backdrop-blur">
                {tIntro("point4")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
