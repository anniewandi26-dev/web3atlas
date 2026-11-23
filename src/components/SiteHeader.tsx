import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function SiteHeader() {
  const t = await getTranslations("brand");

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-400/10 bg-[#030712]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/30 bg-gradient-to-br from-indigo-500/40 to-cyan-400/20 font-display text-sm font-bold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
            CA
          </span>
          <span className="min-w-0">
            <span className="font-display block truncate text-base tracking-wide text-white">
              {t("name")}
            </span>
            <span className="block truncate text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              {t("tagline")}
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300 sm:inline">
            {t("badge")}
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
