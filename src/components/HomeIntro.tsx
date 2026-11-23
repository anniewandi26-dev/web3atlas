"use client";

import { sectionCovers } from "@/lib/media";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "wa-home-intro-v4";
const LOADING_MS = 7000;

export function HomeIntro() {
  const t = useTranslations("intro");
  const tBrand = useTranslations("brand");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("intro") === "1" || params.get("restart") === "1") {
        sessionStorage.removeItem(STORAGE_KEY);
        params.delete("intro");
        params.delete("restart");
        const q = params.toString();
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}${q ? `?${q}` : ""}`,
        );
      } else if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        return;
      }
    } catch {
      // ignore
    }
    setVisible(true);
  }, [locale]);

  useEffect(() => {
    if (!loading) return;

    const started = performance.now();
    let raf = 0;
    let leaveTimer = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / LOADING_MS);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
      setLeaving(true);
      leaveTimer = window.setTimeout(() => setVisible(false), 420);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(leaveTimer);
    };
  }, [loading]);

  function startEnter() {
    if (loading || leaving) return;
    setLoading(true);
    setProgress(0);
  }

  if (!visible) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[80] overflow-hidden",
        leaving ? "intro-leave" : "intro-enter",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-label={tBrand("name")}
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
        <div className="absolute inset-0 bg-[#030712]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.2),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative flex h-full w-full flex-col px-6 pb-28 pt-10 sm:pb-10">
        <div className="mx-auto w-full max-w-xl text-center">
          <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-cyan-300/90">
            {tBrand("tagline")}
          </p>
          <h1 className="font-display text-3xl text-white sm:text-5xl">
            <span className="gradient-text">{tBrand("name")}</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
            {t("headline")}
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          {!loading ? (
            <div className="flex flex-col items-center">
              <p className="mb-3 text-[11px] tracking-[0.18em] uppercase text-cyan-200/70">
                {t("hint")}
              </p>
              <button
                type="button"
                onClick={startEnter}
                className="tech-btn tech-btn-primary min-w-[220px] animate-float text-base"
              >
                {t("enter")} →
              </button>
            </div>
          ) : (
            <div className="w-full max-w-xs text-center">
              <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-cyan-400/25 border-t-cyan-300 animate-spin" />
              <p className="mb-3 text-[11px] tracking-[0.18em] uppercase text-cyan-200/80">
                {t("loading")}
              </p>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-xl pb-2 text-center">
          <p className="mb-4 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
            {t("body")}
          </p>
          <ul className="grid gap-2 text-left text-xs text-cyan-100/90 sm:grid-cols-2 sm:text-sm">
            <li className="rounded-lg border border-cyan-400/20 bg-black/35 px-3 py-2 backdrop-blur">
              {t("point1")}
            </li>
            <li className="rounded-lg border border-cyan-400/20 bg-black/35 px-3 py-2 backdrop-blur">
              {t("point2")}
            </li>
            <li className="rounded-lg border border-cyan-400/20 bg-black/35 px-3 py-2 backdrop-blur">
              {t("point3")}
            </li>
            <li className="rounded-lg border border-cyan-400/20 bg-black/35 px-3 py-2 backdrop-blur">
              {t("point4")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
