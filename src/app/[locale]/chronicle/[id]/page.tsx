import { FallbackNote } from "@/components/FallbackNote";
import { GlassPanel } from "@/components/GlassPanel";
import { Link } from "@/i18n/navigation";
import { getChronicle, getChronicleEvent } from "@/lib/content";
import { chronicleThumb } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

function paragraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function ChronicleEventPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const event = await getChronicleEvent(locale, id);
  if (!event) notFound();

  const all = await getChronicle(locale);
  const idx = Math.max(0, all.findIndex((e) => e.id === id));
  const tSec = await getTranslations("sections");
  const tCommon = await getTranslations("common");
  const image = chronicleThumb(idx);
  const paras = paragraphs(event.body);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FallbackNote locale={locale} />
      <Link href="/chronicle" className="text-sm text-cyan-300 hover:text-cyan-200">
        ← {tSec("chronicle")}
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
          <p className="font-mono text-[11px] text-cyan-200/90">{event.date}</p>
          <h1 className="font-display mt-2 text-2xl text-white sm:text-4xl">{event.title}</h1>
        </div>
      </div>

      <GlassPanel className="space-y-5 p-5 sm:p-7">
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
