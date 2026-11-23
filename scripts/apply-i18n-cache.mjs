/**
 * Rebuild content/{locale}/*.json from scripts/.i18n-cache/{locale}.json
 * Use this after English seed scripts wipe translations.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(__dirname, "..", "content");
const cacheDir = path.join(__dirname, ".i18n-cache");
const files = ["categories", "glossary", "chronicle", "security", "news", "quiz", "highlights"];

function apply(value, map) {
  if (typeof value === "string") return map.get(value) || value;
  if (Array.isArray(value)) return value.map((v) => apply(v, map));
  if (value && typeof value === "object") {
    const o = {};
    for (const [k, v] of Object.entries(value)) {
      o[k] = ["id", "answer", "minutes", "date"].includes(k) ? v : apply(v, map);
    }
    return o;
  }
  return value;
}

const locales = fs
  .readdirSync(cacheDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""));

const enTitle = JSON.parse(fs.readFileSync(path.join(contentRoot, "en", "news.json"), "utf8"))[0]
  .title;

let ok = 0;
for (const locale of locales) {
  const cache = JSON.parse(fs.readFileSync(path.join(cacheDir, `${locale}.json`), "utf8"));
  const map = new Map(Object.entries(cache));
  const dir = path.join(contentRoot, locale);
  fs.mkdirSync(dir, { recursive: true });
  for (const name of files) {
    const payload = JSON.parse(
      fs.readFileSync(path.join(contentRoot, "en", `${name}.json`), "utf8"),
    );
    fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(apply(payload, map), null, 2));
  }
  const title = JSON.parse(fs.readFileSync(path.join(dir, "news.json"), "utf8"))[0].title;
  if (title === enTitle) {
    console.error(`FAIL ${locale} still English`);
  } else {
    ok++;
    console.log(`OK ${locale}: ${title}`);
  }
}
console.log(`\n${ok}/${locales.length} locales applied`);
if (ok < locales.length) process.exit(1);
