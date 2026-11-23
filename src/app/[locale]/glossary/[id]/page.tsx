import { FallbackNote } from "@/components/FallbackNote";
import { GlassPanel } from "@/components/GlassPanel";
import { Link } from "@/i18n/navigation";
import { getGlossaryTerm } from "@/lib/content";
import { glossaryThumb } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

function paragraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const term = await getGlossaryTerm(locale, id);
  if (!term) notFound();

  const tCommon = await getTranslations("common");
  const tSec = await getTranslations("sections");
  const tArticle = await getTranslations("article");
  const image = glossaryThumb(term.id);
  const explainParas = paragraphs(term.explain || "");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FallbackNote locale={locale} />
      <Link href="/glossary" className="text-sm text-cyan-300 hover:text-cyan-200">
        ← {tSec("glossary")}
      </Link>

      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-cyan-400/20">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/45 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/80">
            {tSec("glossary")}
          </p>
          <h1 className="font-display mt-1 text-3xl text-white sm:text-4xl">{term.term}</h1>
        </div>
      </div>

      <GlassPanel className="space-y-5 p-5 sm:p-7">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/70">
            {tArticle("keyPoints")}
          </p>
          <p className="mt-2 text-lg leading-relaxed text-cyan-50/90">{term.definition}</p>
        </div>

        {explainParas.length ? (
          <div className="space-y-4 border-t border-cyan-400/15 pt-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/70">
              {tCommon("readMore")}
            </p>
            {explainParas.map((p) => (
              <p key={p.slice(0, 48)} className="text-base leading-relaxed text-[var(--muted)]">
                {p}
              </p>
            ))}
          </div>
        ) : null}
      </GlassPanel>
    </div>
  );
}
