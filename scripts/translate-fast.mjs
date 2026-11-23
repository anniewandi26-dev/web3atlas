import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import translate from "google-translate-api-x";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(__dirname, "..", "content");
const cacheDir = path.join(__dirname, ".i18n-cache");
fs.mkdirSync(cacheDir, { recursive: true });

const files = ["categories","glossary","chronicle","security","news","quiz","highlights"];
const gLang = {
  es:"es",hi:"hi",ar:"ar",pt:"pt",bn:"bn",ru:"ru",ja:"ja",pa:"pa",de:"de",jv:"jw",ko:"ko",fr:"fr",
  te:"te",mr:"mr",tr:"tr",ta:"ta",vi:"vi",ur:"ur",it:"it",th:"th",gu:"gu",kn:"kn",fa:"fa",pl:"pl",
  uk:"uk",ml:"ml",or:"or",my:"my",nl:"nl",ro:"ro",id:"id",ms:"ms",sw:"sw",ha:"ha",
};

function collect(value, set) {
  if (typeof value === "string") { if (value.trim()) set.add(value); return; }
  if (Array.isArray(value)) { for (const v of value) collect(v, set); return; }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === "id" || k === "answer" || k === "minutes" || k === "date") continue;
      collect(v, set);
    }
  }
}

function apply(value, map) {
  if (typeof value === "string") return map.get(value) || value;
  if (Array.isArray(value)) return value.map((v) => apply(v, map));
  if (value && typeof value === "object") {
    const o = {};
    for (const [k, v] of Object.entries(value)) {
      o[k] = ["id","answer","minutes","date"].includes(k) ? v : apply(v, map);
    }
    return o;
  }
  return value;
}

async function translateMany(texts, to) {
  const res = await translate(texts, { from: "en", to, forceBatch: true });
  if (Array.isArray(res)) return res.map((r) => r.text);
  return [res.text];
}

async function translateOne(text, to) {
  const res = await translate(text, { from: "en", to });
  return res.text;
}

async function buildMap(strings, to, cacheFile) {
  const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, "utf8")) : {};
  const map = new Map();
  const pending = [];
  for (const s of strings) {
    const hit = cache[s];
    // reject identity cache (failed prior runs)
    if (hit && hit !== s) map.set(s, hit);
    else pending.push(s);
  }
  console.log(`  hit=${map.size} pending=${pending.length}`);

  const BATCH = 20;
  for (let i = 0; i < pending.length; i += BATCH) {
    const slice = pending.slice(i, i + BATCH);
    let ok = false;
    for (let a = 0; a < 5 && !ok; a++) {
      try {
        let out;
        try {
          out = await translateMany(slice, to);
        } catch {
          out = [];
          for (const src of slice) {
            out.push(await translateOne(src, to));
            await new Promise((r) => setTimeout(r, 40));
          }
        }
        slice.forEach((src, idx) => {
          const t = (out[idx] || "").trim() || src;
          map.set(src, t);
          if (t !== src) cache[src] = t;
          else delete cache[src];
        });
        ok = true;
      } catch (e) {
        await new Promise((r) => setTimeout(r, 500 * (a + 1)));
        if (a === 4) {
          console.error(`\n  fail batch @${i}: ${e.message || e}`);
          slice.forEach((src) => map.set(src, src));
        }
      }
    }
    process.stdout.write(`\r  ${Math.min(i + BATCH, pending.length)}/${pending.length}   `);
    if (i % 80 === 0) fs.writeFileSync(cacheFile, JSON.stringify(cache));
    await new Promise((r) => setTimeout(r, 80));
  }
  process.stdout.write("\n");
  fs.writeFileSync(cacheFile, JSON.stringify(cache));
  return map;
}

async function runLocale(locale) {
  const to = gLang[locale] || locale;
  const dir = path.join(contentRoot, locale);
  fs.mkdirSync(dir, { recursive: true });
  const set = new Set();
  const payloads = {};
  for (const name of files) {
    payloads[name] = JSON.parse(fs.readFileSync(path.join(contentRoot, "en", `${name}.json`), "utf8"));
    collect(payloads[name], set);
  }
  const list = [...set];
  console.log(`\n== ${locale} -> ${to} (${list.length})`);
  const map = await buildMap(list, to, path.join(cacheDir, `${locale}.json`));
  const sample = list.filter((s) => s.length > 24).slice(0, 15);
  const changed = sample.filter((s) => map.get(s) && map.get(s) !== s).length;
  console.log(`  quality ${changed}/${sample.length}`);
  if (changed < 3) throw new Error(`bad translation ${locale}`);
  for (const name of files) {
    fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(apply(payloads[name], map), null, 2));
  }
  console.log(`  OK ${locale}`);
}

const arg = process.argv[2];
const all = Object.keys(gLang);
const targets = arg
  ? arg.split(",").map((s) => s.trim()).filter(Boolean)
  : all;

for (const loc of targets) {
  await runLocale(loc);
}
console.log("\nDONE");
