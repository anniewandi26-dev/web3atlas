"use client";

import { locales, type Locale } from "@/i18n/locales";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";

const MANUAL_COOKIE = "CA_LOCALE_MANUAL";

function isManual() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim() === `${MANUAL_COOKIE}=1`);
}

/**
 * Client fallback: if middleware missed IP geo, redirect to the IP locale.
 * Skips when user manually picked a language.
 */
export function IpLocaleSync() {
  const locale = useLocale();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    if (isManual()) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/geo-locale", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { locale?: string };
        const next = data.locale as Locale | undefined;
        if (!next || !(locales as readonly string[]).includes(next)) return;
        if (next === locale) return;

        const path = window.location.pathname;
        const rest = path.replace(/^\/[^/]+/, "") || "/";
        const target = `/${next}${rest === "/" ? "" : rest}${window.location.search}`;
        document.cookie = `NEXT_LOCALE=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
        document.cookie = `${MANUAL_COOKIE}=0;path=/;max-age=${60 * 60 * 24 * 365}`;
        window.location.replace(target);
      } catch {
        // ignore network errors
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return null;
}
