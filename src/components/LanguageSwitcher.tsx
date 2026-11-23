"use client";

import { localeNames, locales, type Locale } from "@/i18n/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [manual, setManual] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setManual(document.cookie.includes("CA_LOCALE_MANUAL=1"));
  }, [locale]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function select(next: Locale) {
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
    document.cookie = `CA_LOCALE_MANUAL=1;path=/;max-age=${60 * 60 * 24 * 365}`;
    setManual(true);
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  function followIp() {
    document.cookie = `CA_LOCALE_MANUAL=0;path=/;max-age=${60 * 60 * 24 * 365}`;
    setManual(false);
    setOpen(false);
    // Hard reset to IP language from site root
    window.location.href = "/?followIp=1";
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="glass flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cyan-200/90 hover:border-cyan-400/50"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        {localeNames[locale]}
      </button>
      {open && (
        <div
          role="listbox"
          aria-label={t("language")}
          className="glass absolute right-0 z-50 mt-2 max-h-80 w-64 overflow-auto rounded-xl p-2 shadow-2xl"
        >
          <p className="px-2 pb-2 text-[11px] leading-snug text-[var(--muted)]">
            {t("followIp")}
          </p>
          <button
            type="button"
            onClick={followIp}
            className="mb-2 w-full rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-2 text-left text-xs text-cyan-100"
          >
            {t("useIpLanguage")}
            {!manual ? ` · ${t("ipActive")}` : ""}
          </button>
          <div className="grid grid-cols-1 gap-0.5">
            {locales.map((code) => (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => select(code)}
                className={[
                  "rounded-md px-2 py-1.5 text-left text-sm transition",
                  code === locale
                    ? "bg-cyan-400/15 text-cyan-200"
                    : "text-[var(--text)]/85 hover:bg-white/5",
                ].join(" ")}
              >
                {localeNames[code]}
                <span className="ml-2 text-[10px] uppercase tracking-wider text-[var(--muted)]">
                  {code}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
