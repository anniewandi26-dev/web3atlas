import { FallbackNote } from "@/components/FallbackNote";
import { MediaCard } from "@/components/MediaCard";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
import { getCategory } from "@/lib/content";
import { categoryThumbs, newsThumb, sectionCovers } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const cat = await getCategory(locale, category);
  if (!cat) notFound();
  const tCommon = await getTranslations("common");
  const cover = categoryThumbs[cat.id] || sectionCovers.ecosystem;

  return (
    <div className="space-y-6">
      <FallbackNote locale={locale} />
      <Link href="/ecosystem" className="text-sm text-cyan-300 hover:text-cyan-200">
        ← {tCommon("back")}
      </Link>
      <PageHero
        image={cover}
        kicker={cat.summary}
        title={cat.name}
        subtitle={cat.blurb}
        badge={
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[11px] text-cyan-100">
            {cat.items.length} {tCommon("items")}
          </span>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {cat.items.map((item) => (
          <MediaCard
            key={item.id}
            href={`/ecosystem/${cat.id}/${item.id}`}
            image={newsThumb(item.id)}
            title={item.title}
            description={item.intro || item.summary}
            footer={
              <span className="inline-flex items-center gap-2 text-sm text-cyan-300">
                {tCommon("readMore")} →
                {item.sections?.length ? (
                  <span className="font-mono text-[10px] text-cyan-300/70">
                    {item.sections.length} sections
                  </span>
                ) : null}
              </span>
            }
          />
        ))}
      </div>
    </div>
  );
}
