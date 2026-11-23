"use client";

import { GlossaryGroups } from "@/components/GlossaryGroups";
import { MediaCard } from "@/components/MediaCard";
import type { GlossaryTerm } from "@/lib/content";
import { glossaryGroups, glossaryThumb } from "@/lib/media";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export function GlossaryClient({
  terms,
  placeholder,
  isZh,
}: {
  terms: GlossaryTerm[];
  placeholder: string;
  isZh: boolean;
}) {
  const [q, setQ] = useState("");
  const [groupId, setGroupId] = useState<string | null>(null);
  const t = useTranslations("common");

  const groupFilter = useMemo(() => {
    if (!groupId) return null;
    return glossaryGroups.find((g) => g.id === groupId)?.ids ?? null;
  }, [groupId]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = terms;
    if (groupFilter?.length) {
      const allow = new Set(groupFilter);
      list = list.filter((term) => allow.has(term.id));
    }
    if (!needle) return list;
    return list.filter(
      (term) =>
        term.term.toLowerCase().includes(needle) ||
        term.definition.toLowerCase().includes(needle) ||
        (term.explain || "").toLowerCase().includes(needle) ||
        term.id.toLowerCase().includes(needle),
    );
  }, [q, terms, groupFilter]);

  return (
    <div className="space-y-4">
      <GlossaryGroups activeId={groupId} onSelect={setGroupId} isZh={isZh} />

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="glass w-full rounded-xl px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-[var(--muted)] focus:border-cyan-400/50"
      />
      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">{t("noResults")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((term) => (
            <MediaCard
              key={term.id}
              href={`/glossary/${term.id}`}
              image={glossaryThumb(term.id)}
              title={term.term}
              description={term.definition}
              footer={
                <span className="inline-flex text-xs text-cyan-300/90">
                  {t("readMore")} →
                </span>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
