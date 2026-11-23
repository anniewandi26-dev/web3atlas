import { readFileSync } from "node:fs";
import { join } from "node:path";
import { locales, type Locale } from "@/i18n/locales";

export type ArticleSection = {
  heading: string;
  body: string;
};

export type CategoryItem = {
  id: string;
  title: string;
  summary: string;
  body?: string;
  intro?: string;
  sections?: ArticleSection[];
  keyPoints?: string[];
  tips?: string[];
};

export type Category = {
  id: string;
  name: string;
  summary: string;
  blurb: string;
  items: CategoryItem[];
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  explain?: string;
};

export type ChronicleEvent = {
  id: string;
  date: string;
  title: string;
  body: string;
};

export type SecurityArticle = {
  id: string;
  tag: string;
  title: string;
  minutes: number;
  body?: string;
  summary?: string;
  sections?: ArticleSection[];
  checklist?: string[];
};

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  summary: string;
  body?: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  choices: string[];
  answer: number;
};

export type Highlight = {
  id: string;
  label: string;
};

const CONTENT_ROOT = join(process.cwd(), "content");

function normalizeLocale(locale: string): Locale {
  if ((locales as readonly string[]).includes(locale)) return locale as Locale;
  return "en";
}

function loadJson<T>(locale: string, name: string): T {
  const loc = normalizeLocale(locale);
  try {
    const raw = readFileSync(join(CONTENT_ROOT, loc, `${name}.json`), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    if (loc !== "en") {
      return loadJson<T>("en", name);
    }
    throw new Error(`Missing content ${name} for ${loc}`);
  }
}

export async function getCategories(locale: string): Promise<Category[]> {
  return loadJson(locale, "categories");
}

export async function getCategory(locale: string, id: string) {
  const cats = await getCategories(locale);
  return cats.find((c) => c.id === id) ?? null;
}

export async function getCategoryItem(locale: string, catId: string, itemId: string) {
  const cat = await getCategory(locale, catId);
  if (!cat) return null;
  const item = cat.items.find((i) => i.id === itemId);
  if (!item) return null;
  return { category: cat, item };
}

export async function getGlossary(locale: string): Promise<GlossaryTerm[]> {
  return loadJson(locale, "glossary");
}

export async function getGlossaryTerm(locale: string, id: string) {
  const list = await getGlossary(locale);
  return list.find((t) => t.id === id) ?? null;
}

export async function getChronicle(locale: string): Promise<ChronicleEvent[]> {
  return loadJson(locale, "chronicle");
}

export async function getSecurity(locale: string): Promise<SecurityArticle[]> {
  return loadJson(locale, "security");
}

export async function getSecurityArticle(locale: string, id: string) {
  const list = await getSecurity(locale);
  return list.find((a) => a.id === id) ?? null;
}

export async function getNews(locale: string): Promise<NewsItem[]> {
  return loadJson(locale, "news");
}

export async function getNewsItem(locale: string, id: string) {
  const list = await getNews(locale);
  return list.find((n) => n.id === id) ?? null;
}

export async function getChronicleEvent(locale: string, id: string) {
  const list = await getChronicle(locale);
  return list.find((e) => e.id === id) ?? null;
}

export async function getQuiz(locale: string): Promise<QuizQuestion[]> {
  return loadJson(locale, "quiz");
}

export async function getHighlights(locale: string): Promise<Highlight[]> {
  return loadJson(locale, "highlights");
}

/** True only while a locale pack is still missing (should be rare after full generate). */
export function isContentFallback(locale: string): boolean {
  return false;
}

export function contentFallbackLocale(locale: Locale | string): string {
  return normalizeLocale(String(locale));
}
