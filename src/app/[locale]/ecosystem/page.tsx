import { FallbackNote } from "@/components/FallbackNote";
import { MediaCard } from "@/components/MediaCard";
import { PageHero } from "@/components/PageHero";
import { getCategories } from "@/lib/content";
import { categoryThumbs, sectionCovers } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function EcosystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ecosystemPage");
  const tSec = await getTranslations("sections");
  const tCommon = await getTranslations("common");
  const categories = await getCategories(locale);

  return (
    <div className="space-y-6">
      <FallbackNote locale={locale} />
      <PageHero
        image={sectionCovers.ecosystem}
        kicker={tSec("ecosystem")}
        title={t("title")}
        subtitle={t("subtitle")}
        badge={
          <span className="rounded-full border border-indigo-300/30 bg-indigo-400/10 px-3 py-1 text-[11px] text-indigo-100">
            8 layers
          </span>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <MediaCard
            key={cat.id}
            href={`/ecosystem/${cat.id}`}
            image={categoryThumbs[cat.id] || sectionCovers.ecosystem}
            eyebrow={
              <span className="rounded-md border border-cyan-300/30 bg-black/50 px-2 py-1 font-mono text-[10px] text-cyan-100 backdrop-blur">
                {cat.items.length} {tCommon("items")}
              </span>
            }
            title={cat.name}
            description={`${cat.summary} — ${cat.blurb}`}
            footer={
              <span className="inline-block text-sm text-cyan-300">
                {tCommon("readMore")} →
              </span>
            }
          />
        ))}
      </div>
    </div>
  );
}
