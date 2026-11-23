import { FallbackNote } from "@/components/FallbackNote";
import { MediaCard } from "@/components/MediaCard";
import { PageHero } from "@/components/PageHero";
import { getNews } from "@/lib/content";
import { newsThumb, sectionCovers } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("newsPage");
  const tSec = await getTranslations("sections");
  const tCommon = await getTranslations("common");
  const news = await getNews(locale);
  const [featured, ...rest] = news;

  return (
    <div className="space-y-6">
      <FallbackNote locale={locale} />
      <PageHero
        image={sectionCovers.news}
        kicker={tSec("news")}
        title={t("title")}
        subtitle={t("subtitle")}
        badge={
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[11px] text-cyan-100">
            {news.length}
          </span>
        }
      />

      {featured ? (
        <MediaCard
          href={`/news/${featured.id}`}
          image={newsThumb(featured.id)}
          eyebrow={
            <span className="rounded-md border border-cyan-300/30 bg-black/50 px-2 py-1 font-mono text-[10px] text-cyan-100 backdrop-blur">
              {featured.date} · FEATURED
            </span>
          }
          title={featured.title}
          description={featured.summary}
          footer={
            <span className="text-xs text-cyan-300/90">{tCommon("readMore")} →</span>
          }
        />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((n) => (
          <MediaCard
            key={n.id}
            href={`/news/${n.id}`}
            image={newsThumb(n.id)}
            eyebrow={
              <span className="rounded-md border border-white/15 bg-black/45 px-2 py-1 font-mono text-[10px] text-white/90 backdrop-blur">
                {n.date}
              </span>
            }
            title={n.title}
            description={n.summary}
            footer={
              <span className="text-xs text-cyan-300/90">{tCommon("readMore")} →</span>
            }
          />
        ))}
      </div>
    </div>
  );
}
