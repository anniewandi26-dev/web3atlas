import { ArticleBody } from "@/components/ArticleBody";
import { FallbackNote } from "@/components/FallbackNote";
import { GlassPanel } from "@/components/GlassPanel";
import { Link } from "@/i18n/navigation";
import { getCategoryItem } from "@/lib/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; item: string }>;
}) {
  const { locale, category, item: itemId } = await params;
  setRequestLocale(locale);
  const data = await getCategoryItem(locale, category, itemId);
  if (!data) notFound();
  const { category: cat, item } = data;
  const tCommon = await getTranslations("common");
  const tArticle = await getTranslations("article");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FallbackNote locale={locale} />
      <Link
        href={`/ecosystem/${cat.id}`}
        className="text-sm text-cyan-300 hover:text-cyan-200"
      >
        ← {cat.name}
      </Link>
      <GlassPanel marks className="p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
          {cat.name}
        </p>
        <h1 className="font-display mt-2 text-3xl text-white sm:text-4xl">
          {item.title}
        </h1>
        <p className="mt-3 text-cyan-100/80">{item.summary}</p>

        {item.sections?.length ? (
          <div className="mt-8">
            <ArticleBody
              intro={item.intro}
              sections={item.sections}
              keyPoints={item.keyPoints}
              tips={item.tips}
              labels={{
                keyPoints: tArticle("keyPoints"),
                tips: tArticle("tips"),
                checklist: tArticle("checklist"),
              }}
            />
          </div>
        ) : (
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted)]">
            {(item.body || item.intro || "")
              .split("\n")
              .filter(Boolean)
              .map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
          </div>
        )}

        <p className="mt-8 text-xs text-[var(--muted)]">{tCommon("useful")}</p>
      </GlassPanel>
    </div>
  );
}
