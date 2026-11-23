"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const items = [
  { href: "/", key: "explore", icon: GlobeIcon, accent: "#22d3ee" },
  { href: "/ecosystem", key: "ecosystem", icon: GridIcon, accent: "#818cf8" },
  { href: "/news", key: "news", icon: NewsIcon, accent: "#67e8f9" },
  { href: "/chronicle", key: "chronicle", icon: BookIcon, accent: "#a5b4fc" },
  { href: "/security", key: "security", icon: ShieldIcon, accent: "#34d399" },
  { href: "/glossary", key: "glossary", icon: AzIcon, accent: "#22d3ee" },
] as const;

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-cyan-400/15 bg-[#030712]/92 backdrop-blur-xl">
      <div className="mx-auto grid max-w-3xl grid-cols-6 px-1 pb-[env(safe-area-inset-bottom)] pt-1">
        {items.map(({ href, key, icon: Icon, accent }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={key}
              href={href}
              className={[
                "relative flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] transition",
                active ? "text-cyan-200" : "text-[var(--muted)] hover:text-cyan-100/80",
              ].join(" ")}
            >
              {active ? (
                <span
                  className="absolute inset-x-2 top-1 h-8 rounded-lg opacity-30 blur-md"
                  style={{ background: accent }}
                />
              ) : null}
              <span className="relative">
                <Icon active={active} color={accent} />
              </span>
              <span className="relative truncate font-medium">{t(key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function GlobeIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : "currentColor"} strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18" />
    </svg>
  );
}

function GridIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : "currentColor"} strokeWidth="1.7">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function NewsIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : "currentColor"} strokeWidth="1.7">
      <path d="M4 5h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5z" />
      <path d="M18 7h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4" />
      <path d="M8 9h6M8 13h6M8 17h4" />
    </svg>
  );
}

function BookIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : "currentColor"} strokeWidth="1.7">
      <path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4z" />
      <path d="M5 20a3 3 0 0 1 3-3h12" />
    </svg>
  );
}

function ShieldIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : "currentColor"} strokeWidth="1.7">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function AzIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : "currentColor"} strokeWidth="1.7">
      <path d="M4 18l4-12h2l4 12" />
      <path d="M6 13h6" />
      <path d="M14 10h6l-5 8h-1" />
    </svg>
  );
}
