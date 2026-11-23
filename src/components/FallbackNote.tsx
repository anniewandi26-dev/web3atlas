import { isContentFallback } from "@/lib/content";
import { getTranslations } from "next-intl/server";

export async function FallbackNote({ locale }: { locale: string }) {
  if (!isContentFallback(locale) && (locale === "zh" || locale === "en")) {
    return null;
  }
  if (locale === "zh" || locale === "en") return null;
  const t = await getTranslations("common");
  return (
    <p className="mb-4 rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs text-amber-100/90">
      {t("fallbackNote")}
    </p>
  );
}
