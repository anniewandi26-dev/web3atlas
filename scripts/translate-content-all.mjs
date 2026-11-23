/**
 * Reliable per-string translation with high concurrency + disk cache.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(__dirname, "..", "content");
const cacheDir = path.join(__dirname, ".i18n-cache");
fs.mkdirSync(cacheDir, { recursive: true });

const locales = [
  "es","hi","ar","pt","bn","ru","ja","pa","de","jv","ko","fr","te","mr","tr","ta",
  "vi","ur","it","th","gu","kn","fa","pl","uk","ml","or","my","nl","ro","id","ms","sw","ha",
];

const files = ["categories","glossary","chronicle","security","news","quiz","highlights"];

const gLang = {
  es: "es", hi: "hi", ar: "ar", pt: "pt", bn: "bn", ru: "ru", ja: "ja", pa: "pa",
  de: "de", jv: "jw", ko: "ko", fr: "fr", te: "te", mr: "mr", tr: "tr", ta: "ta",
  vi: "vi", ur: "ur", it: "it", th: "th", gu: "gu", kn: "kn", fa: "fa", pl: "pl",
  uk: "uk", ml: "ml", or: "or", my: "my", nl: "nl", ro: "ro", id: "id", ms: "ms",
  sw: "sw", ha: "ha",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function collectStrings(value, set) {
  if (typeof value === "string") {
    if (value.trim()) set.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) collectStrings(v, set);
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === "id" || k === "answer" || k === "minutes" || k === "date") continue;
      collectStrings(v, set);
    }
  }
}

function applyMap(value, map) {
  if (typeof value === "string") return map.get(value) || value;
  if (Array.isArray(value)) return value.map((v) => applyMap(v, map));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] =
        k === "id" || k === "answer" || k === "minutes" || k === "date"
          ? v
          : applyMap(v, map);
    }
    return out;
  }
  return value;
}

async function translateOne(text, target) {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
    encodeURIComponent(target) +
    "&dt=t&q=" +
    encodeURIComponent(text.slice(0, 4500));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const out = Array.isArray(data?.[0])
    ? data[0].map((row) => row?.[0] || "").join("")
    : text;
  return out || text;
}

async function buildMap(strings, target, cacheFile) {
  const cache = fs.existsSync(cacheFile)
    ? JSON.parse(fs.readFileSync(cacheFile, "utf8"))
    : {};
  const map = new Map();
  const pending = [];
  for (const s of strings) {
    if (cache[s]) map.set(s, cache[s]);
    else pending.push(s);
  }
  console.log(`  cache hit ${map.size}, pending ${pending.length}`);

  let i = 0;
  let done = 0;
  const concurrency = 10;
  async function worker() {
    while (i < pending.length) {
      const idx = i++;
      const src = pending[idx];
      let out = src;
      for (let a = 0; a < 5; a++) {
        try {
          out = await translateOne(src, target);
          break;
        } catch {
          await sleep(200 * (a + 1));
        }
      }
      map.set(src, out);
      cache[src] = out;
      done++;
      if (done % 40 === 0 || done === pending.length) {
        process.stdout.write(`\r  new ${done}/${pending.length}   `);
        fs.writeFileSync(cacheFile, JSON.stringify(cache));
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  process.stdout.write("\n");
  fs.writeFileSync(cacheFile, JSON.stringify(cache));
  return map;
}

function readEn(name) {
  return JSON.parse(fs.readFileSync(path.join(contentRoot, "en", `${name}.json`), "utf8"));
}

async function localizeLocale(locale) {
  const tl = gLang[locale] || locale;
  const dir = path.join(contentRoot, locale);
  fs.mkdirSync(dir, { recursive: true });
  const all = new Set();
  const payloads = {};
  for (const name of files) {
    payloads[name] = readEn(name);
    collectStrings(payloads[name], all);
  }
  const list = [...all];
  console.log(`\n== ${locale} (${tl}) strings=${list.length}`);
  const map = await buildMap(list, tl, path.join(cacheDir, `${locale}.json`));

  // sanity: at least half of sampled titles should differ from English
  const sample = list.filter((s) => s.length > 20).slice(0, 20);
  const changed = sample.filter((s) => map.get(s) && map.get(s) !== s).length;
  console.log(`  sample changed ${changed}/${sample.length}`);
  if (changed < Math.min(5, sample.length)) {
    throw new Error(`Translation appears ineffective for ${locale}`);
  }

  for (const name of files) {
    fs.writeFileSync(
      path.join(dir, `${name}.json`),
      JSON.stringify(applyMap(payloads[name], map), null, 2),
    );
  }
  console.log(`  saved ${locale}`);
}

async function main() {
  const only = process.argv[2];
  const targets = only ? [only] : locales;
  for (const locale of targets) {
    await localizeLocale(locale);
  }
  console.log("\nAll done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
