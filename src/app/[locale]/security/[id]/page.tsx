import { ArticleBody } from "@/components/ArticleBody";
import { FallbackNote } from "@/components/FallbackNote";
import { GlassPanel } from "@/components/GlassPanel";
import { Link } from "@/i18n/navigation";
import { getSecurityArticle } from "@/lib/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function SecurityArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const article = await getSecurityArticle(locale, id);
  if (!article) notFound();
  const t = await getTranslations("securityPage");
  const tCommon = await getTranslations("common");
  const tArticle = await getTranslations("article");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FallbackNote locale={locale} />
      <Link href="/security" className="text-sm text-cyan-300 hover:text-cyan-200">
        ← {t("title")}
      </Link>
      <GlassPanel marks className="p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <span className="rounded border border-indigo-400/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-indigo-200">
            {article.tag}
          </span>
          <span className="text-[11px] text-[var(--muted)]">
            {tCommon("minRead", { m: article.minutes })}
          </span>
        </div>
        <h1 className="font-display mt-3 text-3xl text-white">{article.title}</h1>
        {article.summary ? (
          <p className="mt-3 text-cyan-100/85">{article.summary}</p>
        ) : null}

        {article.sections?.length ? (
          <div className="mt-8">
            <ArticleBody
              sections={article.sections}
              checklist={article.checklist}
              labels={{
                keyPoints: tArticle("keyPoints"),
                tips: tArticle("tips"),
                checklist: tArticle("checklist"),
              }}
            />
          </div>
        ) : (
          <p className="mt-6 text-base leading-relaxed text-[var(--muted)]">
            {article.body}
          </p>
        )}
      </GlassPanel>
    </div>
  );
}
