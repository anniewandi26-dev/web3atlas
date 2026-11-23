import { FallbackNote } from "@/components/FallbackNote";
import { GlassPanel } from "@/components/GlassPanel";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
import { getChronicle } from "@/lib/content";
import { chronicleThumb, sectionCovers } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

export default async function ChroniclePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("chroniclePage");
  const tSec = await getTranslations("sections");
  const tCommon = await getTranslations("common");
  const events = await getChronicle(locale);

  return (
    <div className="space-y-6">
      <FallbackNote locale={locale} />
      <PageHero
        image={sectionCovers.chronicle}
        kicker={tSec("chronicle")}
        title={t("title")}
        subtitle={t("subtitle")}
        badge={
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[11px] text-cyan-100">
            {events.length}
          </span>
        }
      />

      <div className="relative space-y-4 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-cyan-400/25 sm:before:left-[15px]">
        {events.map((e, idx) => (
          <div key={e.id} className="relative pl-10 sm:pl-12">
            <span className="absolute left-1.5 top-8 h-3 w-3 rounded-full border border-cyan-300 bg-[#030712] shadow-[0_0_10px_#22d3ee] sm:left-2.5" />
            <Link href={`/chronicle/${e.id}`} className="group block">
              <GlassPanel className="overflow-hidden transition group-hover:border-cyan-400/45">
                <div className="grid sm:grid-cols-[140px_1fr]">
                  <div className="relative min-h-[110px] sm:min-h-full">
                    <Image
                      src={chronicleThumb(idx)}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="140px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#061018]/80" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="font-mono text-xs text-cyan-300">{e.date}</p>
                    <h2 className="mt-2 text-lg text-white">{e.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
                      {e.body}
                    </p>
                    <p className="mt-3 text-xs text-cyan-300/90">
                      {tCommon("readMore")} →
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
