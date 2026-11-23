import { FallbackNote } from "@/components/FallbackNote";
import { MediaCard } from "@/components/MediaCard";
import { PageHero } from "@/components/PageHero";
import { getSecurity } from "@/lib/content";
import { sectionCovers, securityThumb } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("securityPage");
  const tSec = await getTranslations("sections");
  const tCommon = await getTranslations("common");
  const articles = await getSecurity(locale);

  return (
    <div className="space-y-6">
      <FallbackNote locale={locale} />
      <PageHero
        image={sectionCovers.security}
        kicker={tSec("security")}
        title={t("title")}
        subtitle={t("subtitle")}
        badge={
          <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-100">
            Defense pack
          </span>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((a) => (
          <MediaCard
            key={a.id}
            href={`/security/${a.id}`}
            image={securityThumb(a.id)}
            eyebrow={
              <div className="flex gap-2">
                <span className="rounded-md border border-indigo-300/30 bg-black/50 px-2 py-1 text-[10px] uppercase tracking-wider text-indigo-100 backdrop-blur">
                  {a.tag}
                </span>
                <span className="rounded-md border border-white/15 bg-black/45 px-2 py-1 text-[10px] text-white/90 backdrop-blur">
                  {tCommon("minRead", { m: a.minutes })}
                </span>
              </div>
            }
            title={a.title}
            description={a.summary || a.body || ""}
            footer={
              a.checklist?.length ? (
                <span className="font-mono text-[11px] text-emerald-300/90">
                  checklist · {a.checklist.length}
                </span>
              ) : null
            }
          />
        ))}
      </div>
    </div>
  );
}
