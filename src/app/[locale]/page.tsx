import { FallbackNote } from "@/components/FallbackNote";
import { HeroOrbit } from "@/components/HeroOrbit";
import { HomeIntro } from "@/components/HomeIntro";
import { MediaCard } from "@/components/MediaCard";
import { QuizChallenge } from "@/components/QuizChallenge";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionPortal } from "@/components/SectionPortal";
import { TechButton } from "@/components/TechButton";
import { Link } from "@/i18n/navigation";
import {
  getCategories,
  getChronicle,
  getHighlights,
  getNews,
  getQuiz,
  getSecurity,
} from "@/lib/content";
import { categoryThumbs, newsThumb, sectionCovers, securityThumb } from "@/lib/media";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("hero");
  const tSec = await getTranslations("sections");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  const [categories, news, security, chronicle, quiz, highlights] =
    await Promise.all([
      getCategories(locale),
      getNews(locale),
      getSecurity(locale),
      getChronicle(locale),
      getQuiz(locale),
      getHighlights(locale),
    ]);

  return (
    <div className="space-y-14">
      <HomeIntro />
      <FallbackNote locale={locale} />

      <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20">
        <div className="absolute inset-0">
          <Image
            src={sectionCovers.explore}
            alt=""
            fill
            priority
            className="object-cover opacity-45"
            sizes="1152px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/85 to-[#030712]/35" />
        </div>
        <div className="relative grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rise-in space-y-6">
            <p className="text-xs tracking-[0.22em] text-cyan-300/80">
              {tHero("kicker")}
            </p>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
              {tHero("titleLine1")}
              <span className="gradient-text mt-2 block">{tHero("titleLine2")}</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/75">
              {tHero("subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <TechButton href="/ecosystem">{tHero("ctaPrimary")} →</TechButton>
              <TechButton href="/security" variant="ghost">
                {tHero("ctaSecondary")}
              </TechButton>
            </div>
          </div>
          <HeroOrbit />
        </div>
      </section>

      <section>
        <SectionHeader
          kicker="00 · PORTALS"
          title={tNav("explore")}
          desc={tSec("ecosystemDesc")}
        />
        <SectionPortal
          openLabel={tCommon("readMore")}
          labels={{
            explore: tNav("explore"),
            ecosystem: tNav("ecosystem"),
            news: tNav("news"),
            chronicle: tNav("chronicle"),
            security: tNav("security"),
            glossary: tNav("glossary"),
          }}
        />
      </section>

      <section>
        <SectionHeader
          kicker={tSec("ecosystem")}
          title={tSec("ecosystemTitle")}
          desc={tSec("ecosystemDesc")}
          actionHref="/ecosystem"
          actionLabel={tSec("openExplorer")}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <MediaCard
              key={cat.id}
              href={`/ecosystem/${cat.id}`}
              image={categoryThumbs[cat.id] || sectionCovers.ecosystem}
              eyebrow={
                <span className="rounded-md border border-cyan-300/30 bg-black/50 px-2 py-1 font-mono text-[10px] text-cyan-100 backdrop-blur">
                  {cat.items.length}
                </span>
              }
              title={cat.name}
              description={cat.summary}
              footer={
                <span className="text-xs text-cyan-300/90">{tCommon("readMore")} →</span>
              }
            />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeader
            kicker={tSec("news")}
            title={tSec("newsTitle")}
            desc={tSec("newsDesc")}
            actionHref="/news"
            actionLabel={tSec("allHeadlines")}
          />
          <div className="space-y-4">
            {news.slice(0, 3).map((n) => (
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
        <div className="space-y-8">
          <div>
            <SectionHeader
              kicker={tSec("glossary")}
              title={tSec("glossaryTitle")}
              desc={tSec("glossaryDesc")}
              actionHref="/glossary"
              actionLabel={tSec("openGlossary")}
            />
            <div className="flex flex-wrap gap-2">
              {highlights.map((h) => {
                const termId =
                  h.id === "gas-fees"
                    ? "gas"
                    : h.id === "seed-phrase"
                      ? "seed-phrase"
                      : h.id === "layer2"
                        ? "layer2"
                        : h.id === "approve"
                          ? "approve"
                          : h.id;
                return (
                  <Link
                    key={h.id}
                    href={`/glossary/${termId}`}
                    className="rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3 py-1.5 text-sm text-cyan-100 transition hover:border-cyan-300/50"
                  >
                    {h.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <SectionHeader
              kicker={tSec("security")}
              title={tSec("securityTitle")}
              desc={tSec("securityDesc")}
              actionHref="/security"
              actionLabel={tSec("securityCenter")}
            />
            <div className="space-y-4">
              {security.slice(0, 2).map((s) => (
                <MediaCard
                  key={s.id}
                  href={`/security/${s.id}`}
                  image={securityThumb(s.id)}
                  eyebrow={
                    <span className="rounded-md border border-indigo-300/30 bg-black/50 px-2 py-1 text-[10px] uppercase tracking-wider text-indigo-100 backdrop-blur">
                      {s.tag} · {tCommon("minRead", { m: s.minutes })}
                    </span>
                  }
                  title={s.title}
                  description={s.summary || s.body || ""}
                  footer={
                    <span className="text-xs text-cyan-300/90">{tCommon("readMore")} →</span>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          kicker={tSec("chronicle")}
          title={tSec("chronicleTitle")}
          desc={tSec("chronicleDesc")}
          actionHref="/chronicle"
          actionLabel={tSec("fullChronicle")}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {chronicle.slice(0, 3).map((c, idx) => (
            <MediaCard
              key={c.id}
              href={`/chronicle/${c.id}`}
              image={newsThumb(`c${idx}`)}
              eyebrow={
                <span className="rounded-md border border-cyan-300/30 bg-black/50 px-2 py-1 font-mono text-[10px] text-cyan-100 backdrop-blur">
                  {c.date}
                </span>
              }
              title={c.title}
              description={c.body}
              footer={
                <span className="text-xs text-cyan-300/90">{tCommon("readMore")} →</span>
              }
            />
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 text-sm text-[var(--muted)]">{tSec("quizDesc")}</p>
        <QuizChallenge questions={quiz} />
      </section>
    </div>
  );
}
