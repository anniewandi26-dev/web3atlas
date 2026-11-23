import { FallbackNote } from "@/components/FallbackNote";
import { GlassPanel } from "@/components/GlassPanel";
import { Link } from "@/i18n/navigation";
import { getNewsItem } from "@/lib/content";
import { newsThumb } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

function paragraphs(text: string) {
  return text
    .split(/\n\n+|(?<=[.!?。！？])\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const item = await getNewsItem(locale, id);
  if (!item) notFound();

  const tSec = await getTranslations("sections");
  const tCommon = await getTranslations("common");
  const image = newsThumb(item.id);
  const paras = paragraphs(item.body || item.summary);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FallbackNote locale={locale} />
      <Link href="/news" className="text-sm text-cyan-300 hover:text-cyan-200">
        ← {tSec("news")}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <p className="font-mono text-[11px] text-cyan-200/90">{item.date}</p>
          <h1 className="font-display mt-2 text-2xl text-white sm:text-4xl">{item.title}</h1>
        </div>
      </div>

      <GlassPanel className="space-y-5 p-5 sm:p-7">
        {item.body ? (
          <p className="text-base leading-relaxed text-cyan-50/90">{item.summary}</p>
        ) : null}
        {paras.map((p) => (
          <p key={p.slice(0, 48)} className="text-base leading-relaxed text-[var(--muted)]">
            {p}
          </p>
        ))}
        <p className="pt-2 text-xs text-[var(--muted)]">{tCommon("useful")}</p>
      </GlassPanel>
    </div>
  );
}
