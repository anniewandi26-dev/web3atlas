import { FallbackNote } from "@/components/FallbackNote";
import { GlossaryClient } from "@/components/GlossaryClient";
import { PageHero } from "@/components/PageHero";
import { getGlossary } from "@/lib/content";
import { sectionCovers } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("glossaryPage");
  const tSec = await getTranslations("sections");
  const terms = await getGlossary(locale);

  return (
    <div className="space-y-6">
      <FallbackNote locale={locale} />
      <PageHero
        image={sectionCovers.glossary}
        kicker={tSec("glossary")}
        title={t("title")}
        subtitle={t("subtitle")}
        badge={
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[11px] text-cyan-100">
            {terms.length}
          </span>
        }
      />

      <GlossaryClient
        terms={terms}
        placeholder={t("placeholder")}
        isZh={locale === "zh"}
      />
    </div>
  );
}
