/**
 * Build a single self-contained Web3Atlas HTML (embedded images + content).
 * Output: Desktop/Web3Atlas.html
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const locales = [
  "zh", "en", "es", "hi", "ar", "pt", "bn", "ru", "ja", "pa",
  "de", "jv", "ko", "fr", "te", "mr", "tr", "ta", "vi", "ur",
  "it", "th", "gu", "kn", "fa", "pl", "uk", "ml", "or", "my",
  "nl", "ro", "id", "ms", "sw", "ha",
];
const localeNames = {
  zh: "中文", en: "English", es: "Español", hi: "हिन्दी", ar: "العربية",
  pt: "Português", bn: "বাংলা", ru: "Русский", ja: "日本語", pa: "ਪੰਜਾਬੀ",
  de: "Deutsch", jv: "Basa Jawa", ko: "한국어", fr: "Français", te: "తెలుగు",
  mr: "मराठी", tr: "Türkçe", ta: "தமிழ்", vi: "Tiếng Việt", ur: "اردو",
  it: "Italiano", th: "ไทย", gu: "ગુજરાતી", kn: "ಕನ್ನಡ", fa: "فارسی",
  pl: "Polski", uk: "Українська", ml: "മലയാളം", or: "ଓଡ଼ିଆ", my: "မြန်မာ",
  nl: "Nederlands", ro: "Română", id: "Bahasa Indonesia", ms: "Bahasa Melayu",
  sw: "Kiswahili", ha: "Hausa",
};
const rtlLocales = ["ar", "ur", "fa"];
/** Same country → locale map as src/i18n/geoLocale.ts */
const countryMap = {
  CN: "zh", TW: "zh", HK: "zh", MO: "zh", SG: "zh",
  US: "en", GB: "en", AU: "en", NZ: "en", IE: "en", CA: "en", PH: "en",
  IN: "hi", PK: "ur", BD: "bn", NP: "hi", LK: "ta",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es",
  SV: "es", NI: "es", CR: "es", PA: "es", UY: "es",
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  SA: "ar", AE: "ar", EG: "ar", IQ: "ar", MA: "ar", DZ: "ar", TN: "ar",
  JO: "ar", KW: "ar", QA: "ar", BH: "ar", OM: "ar", LY: "ar", SY: "ar",
  LB: "ar", YE: "ar", SD: "ar",
  RU: "ru", BY: "ru", KZ: "ru", JP: "ja", KR: "ko", KP: "ko",
  DE: "de", AT: "de", CH: "de", LI: "de",
  FR: "fr", BE: "fr", LU: "fr", MC: "fr", SN: "fr", CI: "fr",
  IT: "it", SM: "it", VA: "it", NL: "nl", SR: "nl", PL: "pl", UA: "uk",
  TR: "tr", CY: "tr", TH: "th", VN: "vi", ID: "id", MY: "ms", BN: "ms",
  IR: "fa", AF: "fa", RO: "ro", MD: "ro", MM: "my",
  TZ: "sw", KE: "sw", UG: "sw", RW: "sw", NG: "ha", NE: "ha",
  GH: "en", ZA: "en", SE: "en", NO: "en", FI: "en", DK: "en",
  CZ: "en", HU: "en", GR: "en", IL: "en",
};
const contentKeys = [
  "categories",
  "news",
  "chronicle",
  "security",
  "glossary",
  "quiz",
  "highlights",
];

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function toDataUri(filePath) {
  const buf = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : ext === ".gif"
          ? "image/gif"
          : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

const coversDir = path.join(root, "public", "covers");
const images = {};
for (const name of fs.readdirSync(coversDir)) {
  if (!/\.(jpe?g|png|webp|gif)$/i.test(name)) continue;
  images[`/covers/${name}`] = toDataUri(path.join(coversDir, name));
}

const content = {};
const messages = {};
for (const loc of locales) {
  content[loc] = {};
  for (const key of contentKeys) {
    content[loc][key] = readJson(
      path.join(root, "content", loc, `${key}.json`),
    );
  }
  messages[loc] = readJson(path.join(root, "messages", `${loc}.json`));
}

const payload = {
  locales,
  localeNames,
  rtlLocales,
  countryMap,
  defaultLocale: "en",
  images,
  content,
  messages,
  media: {
    sectionCovers: {
      explore: "/covers/cover-explore.jpg",
      ecosystem: "/covers/cover-ecosystem.jpg",
      news: "/covers/cover-news.jpg",
      chronicle: "/covers/cover-chronicle.jpg",
      security: "/covers/cover-security.jpg",
      glossary: "/covers/cover-glossary.jpg",
    },
    categoryThumbs: {
      blockchain: "/covers/thumb-chain.jpg",
      defi: "/covers/thumb-defi.jpg",
      nfts: "/covers/thumb-nft.jpg",
      layer2: "/covers/thumb-l2.jpg",
      infra: "/covers/thumb-wallet.jpg",
      wallets: "/covers/thumb-wallet.jpg",
      gaming: "/covers/thumb-game.jpg",
      daos: "/covers/thumb-dao.jpg",
    },
    newsThumbs: [
      "/covers/thumb-l2.jpg",
      "/covers/thumb-wallet.jpg",
      "/covers/thumb-defi.jpg",
      "/covers/thumb-secure.jpg",
      "/covers/thumb-chain.jpg",
      "/covers/thumb-dao.jpg",
      "/covers/thumb-nft.jpg",
      "/covers/thumb-game.jpg",
    ],
    glossaryGroups: [
      {
        id: "base",
        titleKey: { en: "Base & Accounts", zh: "底层与账户", ms: "Asas & Akaun" },
        image: "/covers/thumb-chain.jpg",
        ids: [
          "blockchain",
          "block",
          "hash",
          "layer1",
          "layer2",
          "eoa",
          "address",
          "private-key",
          "public-key",
          "wallet",
          "seed-phrase",
          "nonce",
          "confirmation",
        ],
      },
      {
        id: "defi",
        titleKey: { en: "DeFi & Markets", zh: "DeFi 与市场", ms: "DeFi & Pasaran" },
        image: "/covers/thumb-defi.jpg",
        ids: [
          "amm",
          "dex",
          "cex",
          "tvl",
          "apy",
          "apr",
          "slippage",
          "liquidity",
          "impermanent-loss",
          "liquidation",
          "lending",
          "stablecoin",
          "yield-farming",
          "mev",
        ],
      },
      {
        id: "scale",
        titleKey: {
          en: "Scaling & Data",
          zh: "扩容与数据",
          ms: "Penskalaan & Data",
        },
        image: "/covers/thumb-l2.jpg",
        ids: [
          "rollup",
          "sequencer",
          "blob",
          "zk-proof",
          "fraud-proof",
          "oracle",
          "bridge",
          "finality",
          "gas",
          "gwei",
          "evm",
        ],
      },
      {
        id: "secure",
        titleKey: {
          en: "Security & Governance",
          zh: "安全与治理",
          ms: "Keselamatan & Tadbir Urus",
        },
        image: "/covers/thumb-secure.jpg",
        ids: [
          "phishing",
          "approve",
          "allowance",
          "rug",
          "cold-storage",
          "multisig",
          "custody",
          "kyc",
          "dao",
          "airdrop",
        ],
      },
    ],
  },
};

const dataJson = JSON.stringify(payload).replace(/</g, "\\u003c");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="color-scheme" content="dark" />
<title>Web3Atlas — Offline</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Orbitron:wght@500;600;700&display=swap" rel="stylesheet" />
<style>
:root{
  --bg:#030712; --panel:rgba(10,22,40,.78); --cyan:#22d3ee; --indigo:#6366f1;
  --text:#e8eef7; --muted:#8b9bb4; --line:rgba(34,211,238,.22);
  --font-display:"Orbitron","Segoe UI",sans-serif;
  --font-body:"DM Sans","Segoe UI",sans-serif;
}
*{box-sizing:border-box}
html,body{margin:0;min-height:100%;background:var(--bg);color:var(--text);font-family:var(--font-body)}
button,input{font:inherit}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
.gradient-text{
  background:linear-gradient(120deg,#67e8f9,#a5b4fc,#22d3ee);
  -webkit-background-clip:text;background-clip:text;color:transparent;
}
.app{
  min-height:100vh;
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,.28), transparent 55%),
    radial-gradient(ellipse 60% 40% at 80% 20%, rgba(34,211,238,.12), transparent 50%),
    var(--bg);
}
.shell{max-width:1120px;margin:0 auto;padding:0 16px 96px}
.topbar{
  position:sticky;top:0;z-index:40;
  display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:12px 0;backdrop-filter:blur(14px);
  background:rgba(3,7,18,.72);border-bottom:1px solid var(--line);
}
.brand{font-family:var(--font-display);font-size:1.1rem}
.lang{display:flex;gap:6px;flex-wrap:wrap}
.lang button,.navbtn,.tech-btn,.chip{
  border:1px solid var(--line);background:rgba(34,211,238,.08);color:var(--text);
  border-radius:999px;padding:8px 12px;cursor:pointer;
}
.lang button.active,.navbtn.active{border-color:rgba(34,211,238,.55);background:rgba(34,211,238,.18)}
.nav{
  display:flex;gap:8px;overflow:auto;padding:12px 0 4px;scrollbar-width:none;
}
.nav::-webkit-scrollbar{display:none}
.tech-btn{
  border-radius:12px;padding:12px 18px;font-weight:600;
  background:linear-gradient(120deg,rgba(34,211,238,.95),rgba(99,102,241,.95));
  color:#031018;border:none;
}
.tech-btn.ghost{
  background:rgba(255,255,255,.04);color:var(--text);border:1px solid var(--line);
}
.hero{
  position:relative;overflow:hidden;border-radius:20px;border:1px solid var(--line);
  min-height:280px;margin:16px 0 28px;
}
.hero-film{position:absolute;inset:0}
.hero-film .slide{
  position:absolute;inset:0;opacity:0;transition:opacity 1.1s ease;
  background-size:cover;background-position:center;
  animation:ken 14s ease-in-out infinite alternate;
}
.hero-film .slide.on{opacity:1}
@keyframes ken{from{transform:scale(1)}to{transform:scale(1.12)}}
.hero-mask{
  position:absolute;inset:0;
  background:linear-gradient(90deg,#030712 8%,rgba(3,7,18,.78) 48%,rgba(3,7,18,.25));
}
.hero-copy{position:relative;padding:28px 22px;max-width:560px}
.hero-copy h1{font-family:var(--font-display);font-size:clamp(1.7rem,5vw,2.6rem);line-height:1.15;margin:8px 0}
.muted{color:var(--muted)}
.kicker{letter-spacing:.22em;text-transform:uppercase;font-size:11px;color:rgba(103,232,249,.9)}
.section{margin:36px 0}
.section h2{font-family:var(--font-display);margin:6px 0 8px;font-size:1.35rem}
.grid{display:grid;gap:14px}
.grid-2{grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}
.grid-3{grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}
.grid-4{grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}
.card{
  border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--panel);
  cursor:pointer;transition:transform .2s ease,border-color .2s ease;
}
.card:hover{transform:translateY(-2px);border-color:rgba(34,211,238,.45)}
.card .thumb{height:128px;background-size:cover;background-position:center;position:relative}
.card .thumb::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to top,rgba(3,7,18,.92),transparent 55%);
}
.card .body{padding:12px 14px 16px}
.card h3{margin:0 0 6px;font-size:1rem}
.card p{margin:0;font-size:.88rem;color:rgba(232,238,247,.78);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{border-radius:999px}
.search{
  width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--line);
  background:rgba(0,0,0,.35);color:var(--text);margin:8px 0 16px;
}
.glass{border:1px solid var(--line);border-radius:16px;background:var(--panel);padding:16px}
.choice{
  display:block;width:100%;text-align:left;margin:0 0 8px;padding:12px 14px;
  border-radius:12px;border:1px solid var(--line);background:rgba(0,0,0,.28);color:var(--text);cursor:pointer;
}
.choice.ok{border-color:#34d399;background:rgba(52,211,153,.12)}
.choice.bad{border-color:#f87171;background:rgba(248,113,113,.12)}
.overlay{
  position:fixed;inset:0;z-index:100;overflow:auto;-webkit-overflow-scrolling:touch;
  background:rgba(3,7,18,.92);
}
.overlay-inner{min-height:100%;display:flex;flex-direction:column;padding:28px 18px 40px;max-width:720px;margin:0 auto}
.overlay .center{flex:1;display:flex;align-items:center;justify-content:center;padding:28px 0}
.float{animation:float 3.2s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.modal{
  position:fixed;inset:0;z-index:90;display:flex;align-items:flex-end;justify-content:center;
  background:rgba(0,0,0,.62);padding:12px;overflow:auto;
}
.modal-card{
  width:min(720px,100%);max-height:min(92vh,900px);overflow:auto;
  border-radius:18px;border:1px solid var(--line);background:#07111f;
}
.modal-hero{height:160px;background-size:cover;background-position:center;position:relative}
.modal-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,#07111f,transparent 50%)}
.modal-body{padding:18px}
.modal-body h2{font-family:var(--font-display);margin:0 0 10px}
.article p{white-space:pre-wrap;line-height:1.65;color:rgba(232,238,247,.88)}
.article h4{margin:18px 0 8px;color:#67e8f9}
.list{margin:0;padding-left:18px;color:rgba(232,238,247,.88)}
.list li{margin:6px 0}
.close-x{
  position:sticky;top:8px;float:right;margin:8px;z-index:2;
  border:1px solid var(--line);background:rgba(0,0,0,.55);color:#fff;
  border-radius:999px;padding:8px 12px;cursor:pointer;
}
.bottom{
  position:fixed;left:0;right:0;bottom:0;z-index:30;
  display:grid;grid-template-columns:repeat(6,1fr);gap:2px;
  padding:8px 6px calc(8px + env(safe-area-inset-bottom));
  background:rgba(3,7,18,.9);border-top:1px solid var(--line);backdrop-filter:blur(12px);
}
.bottom button{
  border:0;background:transparent;color:var(--muted);font-size:10px;padding:6px 2px;cursor:pointer;
}
.bottom button.active{color:#67e8f9}
.hidden{display:none !important}
.filmbar{
  display:flex;gap:10px;overflow:auto;padding:8px 0 4px;scroll-snap-type:x mandatory;
}
.filmbar .frame{
  flex:0 0 72%;scroll-snap-align:center;height:180px;border-radius:14px;border:1px solid var(--line);
  background-size:cover;background-position:center;position:relative;overflow:hidden;
}
.filmbar .frame video,.filmbar .frame .play-layer{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
}
.filmbar .frame .cap{
  position:absolute;left:0;right:0;bottom:0;padding:10px 12px;
  background:linear-gradient(to top,rgba(0,0,0,.75),transparent);font-size:.85rem;
}
@media (min-width:720px){
  .filmbar .frame{flex-basis:42%}
  .modal{align-items:center}
}
</style>
</head>
<body>
<div id="app" class="app"></div>
<script type="application/json" id="DATA">${dataJson}</script>
<script>
(() => {
  const DATA = JSON.parse(document.getElementById("DATA").textContent);
  const IMG = DATA.images;
  const MEDIA = DATA.media;
  const LS_INTRO = "wa-offline-intro-v1";
  const LS_LANG = "wa-offline-lang-v1";
  const LS_MANUAL = "wa-offline-lang-manual-v1";

  function isAppleSafari(ua){
    ua = ua || navigator.userAgent || "";
    if (!ua) return false;
    if (/CriOS|FxiOS|EdgiOS|OPiOS|Chrome\\/|Chromium|Edg\\/|OPR\\/|Firefox\\/|Android|MicroMessenger|WeChat|FBAN|FBAV|Line\\/|Instagram|Twitter|TikTok|QQ\\//i.test(ua)) return false;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    if (isIOS) return /Safari/i.test(ua);
    return /Safari/i.test(ua) && /Version\\//i.test(ua);
  }
  function buildSafariOpenUrl(href){
    try {
      const u = new URL(href);
      if (u.protocol === "file:") return href;
      const scheme = u.protocol === "http:" ? "x-safari-http" : "x-safari-https";
      return scheme + "://" + u.host + u.pathname + u.search + u.hash;
    } catch { return href; }
  }

  function localeFromCountry(code){
    if (!code) return null;
    const mapped = DATA.countryMap[(code + "").toUpperCase()];
    if (mapped && DATA.locales.includes(mapped)) return mapped;
    return null;
  }
  function localeFromNavigator(){
    const langs = navigator.languages || [navigator.language || "en"];
    for (const raw of langs) {
      const part = (raw || "").toLowerCase();
      if (part.startsWith("zh")) return "zh";
      const primary = part.split("-")[0];
      if (DATA.locales.includes(primary)) return primary;
    }
    return null;
  }
  async function fetchCountryCode(){
    try {
      const r = await fetch("https://ipwho.is/", { cache: "no-store" });
      if (r.ok) {
        const d = await r.json();
        if (d && d.success !== false && d.country_code) return String(d.country_code).toUpperCase();
      }
    } catch {}
    try {
      const r = await fetch("https://get.geojs.io/v1/ip/country.json", { cache: "no-store" });
      if (r.ok) {
        const d = await r.json();
        if (d && d.country) return String(d.country).toUpperCase();
      }
    } catch {}
    return null;
  }
  async function resolveIpLocale(){
    const country = await fetchCountryCode();
    return localeFromCountry(country) || localeFromNavigator() || DATA.defaultLocale;
  }

  const state = {
    locale: DATA.defaultLocale,
    ipLocale: null,
    followIp: localStorage.getItem(LS_MANUAL) !== "1",
    ready: false,
    view: "explore",
    safariGate: !isAppleSafari(),
    safariCopied: false,
    intro: sessionStorage.getItem(LS_INTRO) !== "1",
    loading: false,
    progress: 0,
    modal: null,
    glossaryQ: "",
    quiz: { order: [], index: 0, picked: null, score: 0, done: false },
    filmIndex: 0,
  };

  const root = document.getElementById("app");

  function img(src){ return IMG[src] || src; }
  function t(ns, key){
    const bag = DATA.messages[state.locale] || DATA.messages.en;
    const part = bag[ns] || {};
    return part[key] ?? (DATA.messages.en[ns]||{})[key] ?? key;
  }
  function C(){ return DATA.content[state.locale] || DATA.content.en; }
  function applyDir(){
    const rtl = (DATA.rtlLocales || []).includes(state.locale);
    document.documentElement.lang = state.locale;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }
  function setLocale(next, manual){
    if (!DATA.locales.includes(next)) return;
    state.locale = next;
    if (manual) {
      state.followIp = false;
      localStorage.setItem(LS_MANUAL, "1");
      localStorage.setItem(LS_LANG, next);
    } else {
      state.followIp = true;
      localStorage.setItem(LS_MANUAL, "0");
      localStorage.removeItem(LS_LANG);
    }
    resetQuiz();
    applyDir();
    render();
  }
  function newsThumb(id){
    let hash = 0;
    for (let i=0;i<id.length;i++) hash = (hash + id.charCodeAt(i)*(i+1)) % MEDIA.newsThumbs.length;
    return MEDIA.newsThumbs[hash];
  }
  function securityThumb(id){
    if (id.includes("seed") || id.includes("device")) return "/covers/thumb-wallet.jpg";
    if (id.includes("bridge")) return "/covers/thumb-l2.jpg";
    return "/covers/thumb-secure.jpg";
  }
  function esc(s){
    return String(s??"").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function clampText(s, n=140){
    const x = String(s||"").replace(/\\s+/g," ").trim();
    return x.length > n ? x.slice(0,n-1)+"…" : x;
  }

  function openModal(kind, id, extra){
    state.modal = { kind, id, extra: extra||{} };
    render();
  }
  function closeModal(){ state.modal = null; render(); }

  function setView(v){
    state.view = v;
    state.modal = null;
    if (v === "quiz" && !state.quiz.order.length) resetQuiz();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetQuiz(){
    const q = C().quiz;
    state.quiz = {
      order: q.map((_,i)=>i).sort(()=>Math.random()-0.5),
      index: 0, picked: null, score: 0, done: false
    };
  }

  function startIntroEnter(){
    if (state.loading) return;
    state.loading = true;
    state.progress = 0;
    render();
    const start = performance.now();
    const tick = (now) => {
      state.progress = Math.min(1, (now-start)/7000);
      if (state.progress < 1) {
        const bar = document.getElementById("intro-bar");
        if (bar) bar.style.width = (state.progress*100)+"%";
        requestAnimationFrame(tick);
        return;
      }
      sessionStorage.setItem(LS_INTRO, "1");
      state.intro = false;
      state.loading = false;
      render();
    };
    requestAnimationFrame(tick);
  }

  function filmSlides(){
    return [
      MEDIA.sectionCovers.explore,
      MEDIA.sectionCovers.ecosystem,
      MEDIA.sectionCovers.news,
      MEDIA.sectionCovers.chronicle,
      MEDIA.sectionCovers.security,
      MEDIA.sectionCovers.glossary,
    ];
  }

  function openSafari(){
    const href = window.location.href;
    const safariUrl = buildSafariOpenUrl(href);
    try { window.location.href = safariUrl; } catch {}
    window.setTimeout(async () => {
      try {
        await navigator.clipboard.writeText(href);
        state.safariCopied = true;
        render();
      } catch {}
      const a = document.createElement("a");
      a.href = safariUrl;
      a.rel = "noopener";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, 400);
  }

  function renderSafariGate(){
    const cover = img(MEDIA.sectionCovers.explore);
    return \`
    <div class="overlay" role="alertdialog" aria-modal="true">
      <div class="hero-film" style="position:fixed;inset:0;z-index:0">
        <div class="slide on" style="background-image:url('\${cover}')"></div>
        <div class="hero-mask"></div>
      </div>
      <div class="overlay-inner" style="position:relative;z-index:1;overflow:auto;-webkit-overflow-scrolling:touch;max-height:100vh">
        <div style="text-align:center">
          <p class="kicker">\${esc(t("brand","tagline"))}</p>
          <h1 class="gradient-text" style="font-family:var(--font-display);font-size:clamp(2rem,8vw,3.2rem);margin:8px 0">\${esc(t("brand","name"))}</h1>
          <p id="safari-gate-title">\${esc(t("intro","headline"))}</p>
        </div>
        <div class="center">
          <div style="text-align:center">
            <button class="tech-btn float" data-act="open-safari">\${esc(t("safariGate","openSafari"))} →</button>
            \${state.safariCopied ? \`<p style="margin-top:12px;color:#a5f3fc;font-size:.85rem">\${esc(t("safariGate","copied"))}</p>\` : ""}
          </div>
        </div>
        <div style="text-align:center;padding-bottom:24px">
          <p class="muted" id="safari-gate-desc" style="font-size:.9rem;line-height:1.55">\${esc(t("safariGate","note"))}</p>
          <p class="muted" style="font-size:.9rem;line-height:1.55;margin-top:10px">\${esc(t("intro","body"))}</p>
          <div class="grid grid-2" style="margin-top:14px;text-align:left">
            \${[1,2,3,4].map(n=>\`<div class="glass" style="padding:10px 12px;font-size:.85rem">\${esc(t("intro","point"+n))}</div>\`).join("")}
          </div>
        </div>
      </div>
    </div>\`;
  }

  function renderIntro(){
    const slides = filmSlides();
    return \`
    <div class="overlay" role="dialog" aria-modal="true">
      <div class="hero-film" style="position:fixed;inset:0;z-index:0">
        \${slides.map((s,i)=>\`<div class="slide \${i===state.filmIndex?"on":""}" style="background-image:url('\${img(s)}')"></div>\`).join("")}
        <div class="hero-mask"></div>
      </div>
      <div class="overlay-inner" style="position:relative;z-index:1">
        <div style="text-align:center">
          <p class="kicker">\${esc(t("brand","tagline"))}</p>
          <h1 class="gradient-text" style="font-family:var(--font-display);font-size:clamp(2rem,8vw,3.2rem);margin:8px 0">\${esc(t("brand","name"))}</h1>
          <p>\${esc(t("intro","headline"))}</p>
        </div>
        <div class="center">
          \${state.loading ? \`
            <div style="width:min(280px,90%);text-align:center">
              <div style="width:40px;height:40px;margin:0 auto 12px;border-radius:50%;border:2px solid rgba(34,211,238,.25);border-top-color:#67e8f9;animation:spin 1s linear infinite"></div>
              <p class="kicker">\${esc(t("intro","loading"))}</p>
              <div style="height:4px;border-radius:999px;background:rgba(255,255,255,.1);overflow:hidden;margin-top:12px">
                <div id="intro-bar" style="height:100%;width:\${state.progress*100}%;background:linear-gradient(90deg,#22d3ee,#6366f1)"></div>
              </div>
            </div>
          \` : \`
            <div style="text-align:center">
              <p class="kicker" style="margin-bottom:10px">\${esc(t("intro","hint"))}</p>
              <button class="tech-btn float" data-act="intro-enter">\${esc(t("intro","enter"))} →</button>
            </div>
          \`}
        </div>
        <div style="text-align:center">
          <p class="muted" style="font-size:.9rem;line-height:1.55">\${esc(t("intro","body"))}</p>
          <div class="grid grid-2" style="margin-top:14px;text-align:left">
            \${[1,2,3,4].map(n=>\`<div class="glass" style="padding:10px 12px;font-size:.85rem">\${esc(t("intro","point"+n))}</div>\`).join("")}
          </div>
        </div>
      </div>
    </div>
    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    \`;
  }

  function card(opts){
    return \`
    <article class="card" data-open='\${esc(JSON.stringify(opts.open))}'>
      <div class="thumb" style="background-image:url('\${img(opts.image)}')"></div>
      <div class="body">
        \${opts.eyebrow ? \`<div style="margin-bottom:6px">\${opts.eyebrow}</div>\` : ""}
        <h3>\${esc(opts.title)}</h3>
        <p>\${esc(clampText(opts.desc, 150))}</p>
        <div style="margin-top:10px;color:#67e8f9;font-size:.8rem">\${esc(t("common","readMore"))} →</div>
      </div>
    </article>\`;
  }

  function renderExplore(){
    const c = C();
    const slides = filmSlides();
    return \`
    <section class="hero">
      <div class="hero-film">
        \${slides.map((s,i)=>\`<div class="slide \${i===state.filmIndex?"on":""}" style="background-image:url('\${img(s)}')"></div>\`).join("")}
      </div>
      <div class="hero-mask"></div>
      <div class="hero-copy">
        <p class="kicker">\${esc(t("hero","kicker"))}</p>
        <h1>\${esc(t("hero","titleLine1"))}<span class="gradient-text" style="display:block;margin-top:6px">\${esc(t("hero","titleLine2"))}</span></h1>
        <p class="muted">\${esc(t("hero","subtitle"))}</p>
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:16px">
          <button class="tech-btn" data-view="ecosystem">\${esc(t("hero","ctaPrimary"))} →</button>
          <button class="tech-btn ghost" data-view="security">\${esc(t("hero","ctaSecondary"))}</button>
        </div>
      </div>
    </section>

    <section class="section">
      <p class="kicker">FILM · COVERS</p>
      <h2>Photo & film reel</h2>
      <p class="muted" style="margin-bottom:10px">Swipe the reel — each frame is a live cover from Web3Atlas.</p>
      <div class="filmbar" id="filmbar">
        \${slides.map((s,i)=>\`
          <div class="frame" style="background-image:url('\${img(s)}')">
            <canvas class="play-layer" data-film="\${i}" width="640" height="360"></canvas>
            <div class="cap">Scene \${i+1}</div>
          </div>\`).join("")}
      </div>
    </section>

    <section class="section">
      <p class="kicker">\${esc(t("sections","ecosystem"))}</p>
      <h2>\${esc(t("sections","ecosystemTitle"))}</h2>
      <p class="muted">\${esc(t("sections","ecosystemDesc"))}</p>
      <div class="grid grid-4" style="margin-top:14px">
        \${c.categories.map(cat => card({
          image: MEDIA.categoryThumbs[cat.id] || MEDIA.sectionCovers.ecosystem,
          title: cat.name,
          desc: cat.summary,
          eyebrow: \`<span class="chip" style="font-size:10px">\${cat.items.length}</span>\`,
          open: { kind:"category", id: cat.id }
        })).join("")}
      </div>
    </section>

    <section class="section">
      <p class="kicker">\${esc(t("sections","news"))}</p>
      <h2>\${esc(t("sections","newsTitle"))}</h2>
      <div class="grid grid-2" style="margin-top:14px">
        \${c.news.slice(0,4).map(n => card({
          image: newsThumb(n.id),
          title: n.title,
          desc: n.summary,
          eyebrow: \`<span class="chip" style="font-size:10px">\${esc(n.date)}</span>\`,
          open: { kind:"news", id: n.id }
        })).join("")}
      </div>
      <button class="tech-btn ghost" style="margin-top:12px" data-view="news">\${esc(t("sections","allHeadlines"))}</button>
    </section>

    <section class="section">
      <p class="kicker">\${esc(t("sections","chronicle"))}</p>
      <h2>\${esc(t("sections","chronicleTitle"))}</h2>
      <div class="grid grid-3" style="margin-top:14px">
        \${c.chronicle.slice(0,3).map((item,idx) => card({
          image: newsThumb("c"+idx),
          title: item.title,
          desc: item.body,
          eyebrow: \`<span class="chip" style="font-size:10px">\${esc(item.date)}</span>\`,
          open: { kind:"chronicle", id: item.id }
        })).join("")}
      </div>
    </section>

    <section class="section">
      <p class="kicker">\${esc(t("sections","quiz"))}</p>
      <h2>\${esc(t("sections","quizTitle"))}</h2>
      <p class="muted">\${esc(t("sections","quizDesc"))}</p>
      <button class="tech-btn" style="margin-top:12px" data-view="quiz">\${esc(t("sections","startQuiz"))} →</button>
    </section>
    \`;
  }

  function renderEcosystem(){
    const c = C();
    return \`
    <section class="section">
      <p class="kicker">01 · ECOSYSTEM</p>
      <h2>\${esc(t("ecosystemPage","title"))}</h2>
      <p class="muted">\${esc(t("ecosystemPage","subtitle"))}</p>
      <div class="grid grid-2" style="margin-top:16px">
        \${c.categories.map(cat => card({
          image: MEDIA.categoryThumbs[cat.id] || MEDIA.sectionCovers.ecosystem,
          title: cat.name,
          desc: cat.blurb || cat.summary,
          eyebrow: \`<span class="chip" style="font-size:10px">\${cat.items.length} \${esc(t("common","items"))}</span>\`,
          open: { kind:"category", id: cat.id }
        })).join("")}
      </div>
    </section>\`;
  }

  function renderNews(){
    const c = C();
    return \`
    <section class="section">
      <div class="hero" style="min-height:180px;margin-bottom:18px">
        <div class="hero-film"><div class="slide on" style="background-image:url('\${img(MEDIA.sectionCovers.news)}')"></div></div>
        <div class="hero-mask"></div>
        <div class="hero-copy"><p class="kicker">02 · SIGNAL</p><h1 style="font-size:1.8rem">\${esc(t("newsPage","title"))}</h1><p class="muted">\${esc(t("newsPage","subtitle"))}</p></div>
      </div>
      <div class="grid grid-2">
        \${c.news.map(n => card({
          image: newsThumb(n.id), title: n.title, desc: n.summary,
          eyebrow: \`<span class="chip" style="font-size:10px">\${esc(n.date)}</span>\`,
          open: { kind:"news", id: n.id }
        })).join("")}
      </div>
    </section>\`;
  }

  function renderChronicle(){
    const c = C();
    return \`
    <section class="section">
      <div class="hero" style="min-height:180px;margin-bottom:18px">
        <div class="hero-film"><div class="slide on" style="background-image:url('\${img(MEDIA.sectionCovers.chronicle)}')"></div></div>
        <div class="hero-mask"></div>
        <div class="hero-copy"><p class="kicker">05 · TIMELINE</p><h1 style="font-size:1.8rem">\${esc(t("chroniclePage","title"))}</h1><p class="muted">\${esc(t("chroniclePage","subtitle"))}</p></div>
      </div>
      <div class="grid grid-2">
        \${c.chronicle.map((item,idx) => card({
          image: newsThumb("c"+idx), title: item.title, desc: item.body,
          eyebrow: \`<span class="chip" style="font-size:10px">\${esc(item.date)}</span>\`,
          open: { kind:"chronicle", id: item.id }
        })).join("")}
      </div>
    </section>\`;
  }

  function renderSecurity(){
    const c = C();
    return \`
    <section class="section">
      <div class="hero" style="min-height:180px;margin-bottom:18px">
        <div class="hero-film"><div class="slide on" style="background-image:url('\${img(MEDIA.sectionCovers.security)}')"></div></div>
        <div class="hero-mask"></div>
        <div class="hero-copy"><p class="kicker">04 · DEFENSE</p><h1 style="font-size:1.8rem">\${esc(t("securityPage","title"))}</h1><p class="muted">\${esc(t("securityPage","subtitle"))}</p></div>
      </div>
      <div class="grid grid-2">
        \${c.security.map(s => card({
          image: securityThumb(s.id), title: s.title, desc: s.summary || s.body,
          eyebrow: \`<span class="chip" style="font-size:10px">\${esc(s.tag)} · \${esc(String(t("common","minRead")).replace("{m}", s.minutes))}</span>\`,
          open: { kind:"security", id: s.id }
        })).join("")}
      </div>
    </section>\`;
  }

  function renderGlossary(){
    const c = C();
    const q = state.glossaryQ.trim().toLowerCase();
    const terms = c.glossary.filter(g => !q || g.term.toLowerCase().includes(q) || (g.definition||"").toLowerCase().includes(q) || g.id.includes(q));
    return \`
    <section class="section">
      <div class="hero" style="min-height:160px;margin-bottom:18px">
        <div class="hero-film"><div class="slide on" style="background-image:url('\${img(MEDIA.sectionCovers.glossary)}')"></div></div>
        <div class="hero-mask"></div>
        <div class="hero-copy"><p class="kicker">03 · LEXICON</p><h1 style="font-size:1.8rem">\${esc(t("glossaryPage","title"))}</h1><p class="muted">\${esc(t("glossaryPage","subtitle"))}</p></div>
      </div>
      <input class="search" id="glossary-search" placeholder="\${esc(t("glossaryPage","placeholder"))}" value="\${esc(state.glossaryQ)}" />
      \${MEDIA.glossaryGroups.map(group => {
        const items = terms.filter(g => group.ids.includes(g.id));
        if (!items.length) return "";
        const title = group.titleKey[state.locale] || group.titleKey.en;
        return \`
          <div style="margin:18px 0">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <div style="width:42px;height:42px;border-radius:10px;background-size:cover;background-image:url('\${img(group.image)}')"></div>
              <h3 style="margin:0">\${esc(title)}</h3>
            </div>
            <div class="grid grid-2">
              \${items.map(g => card({
                image: newsThumb(g.id), title: g.term, desc: g.definition,
                open: { kind:"glossary", id: g.id }
              })).join("")}
            </div>
          </div>\`;
      }).join("")}
      \${!terms.length ? \`<p class="muted">\${esc(t("common","noResults"))}</p>\` : ""}
    </section>\`;
  }

  function renderQuiz(){
    const qs = C().quiz;
    const qz = state.quiz;
    if (!qz.order.length) resetQuiz();
    const q = qs[qz.order[qz.index]];
    if (qz.done) {
      return \`
      <section class="section"><div class="glass" style="text-align:center;padding:28px">
        <p class="kicker">\${esc(t("sections","quiz"))}</p>
        <h2 class="gradient-text">\${esc(t("quiz","done"))}</h2>
        <p class="muted">\${esc(String(t("quiz","score")).replace("{score}", qz.score).replace("{total}", qs.length))}</p>
        <button class="tech-btn" data-act="quiz-restart" style="margin-top:12px">\${esc(t("quiz","restart"))}</button>
      </div></section>\`;
    }
    return \`
    <section class="section"><div class="glass">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:12px">
        <div><p class="kicker">\${esc(t("sections","quiz"))}</p><h2 style="margin:4px 0">\${esc(t("sections","quizTitle"))}</h2></div>
        <button class="tech-btn ghost" data-act="quiz-shuffle">\${esc(t("sections","shuffle"))}</button>
      </div>
      <p class="muted">\${qz.index+1} / \${qs.length}</p>
      <p style="font-size:1.15rem;margin:12px 0 16px">\${esc(q.question)}</p>
      \${q.choices.map((choice,i) => {
        let cls = "choice";
        if (qz.picked !== null) {
          if (i === q.answer) cls += " ok";
          else if (i === qz.picked) cls += " bad";
        }
        return \`<button class="\${cls}" data-act="quiz-pick" data-i="\${i}">\${esc(choice)}</button>\`;
      }).join("")}
      \${qz.picked !== null ? \`<button class="tech-btn" style="margin-top:10px" data-act="quiz-next">\${esc(t("quiz","next"))}</button>\` : ""}
    </div></section>\`;
  }

  function renderModal(){
    if (!state.modal) return "";
    const { kind, id } = state.modal;
    const c = C();
    let html = "";
    let cover = MEDIA.sectionCovers.explore;
    let title = "";
    let body = "";

    if (kind === "news") {
      const n = c.news.find(x => x.id === id);
      if (!n) return "";
      cover = newsThumb(n.id); title = n.title;
      body = \`<p class="muted">\${esc(n.date)}</p><div class="article"><p>\${esc(n.body)}</p></div>\`;
    } else if (kind === "chronicle") {
      const n = c.chronicle.find(x => x.id === id);
      if (!n) return "";
      cover = newsThumb(n.id); title = n.title;
      body = \`<p class="muted">\${esc(n.date)}</p><div class="article"><p>\${esc(n.body)}</p></div>\`;
    } else if (kind === "security") {
      const n = c.security.find(x => x.id === id);
      if (!n) return "";
      cover = securityThumb(n.id); title = n.title;
      body = \`
        <p class="muted">\${esc(n.tag)} · \${esc(String(t("common","minRead")).replace("{m}", n.minutes))}</p>
        <div class="article"><p>\${esc(n.summary || n.body || "")}</p>
        \${(n.sections||[]).map(s => \`<h4>\${esc(s.heading)}</h4><p>\${esc(s.body)}</p>\`).join("")}
        </div>
        \${n.checklist?.length ? \`<h4>\${esc(t("article","checklist"))}</h4><ul class="list">\${n.checklist.map(x=>\`<li>\${esc(x)}</li>\`).join("")}</ul>\` : ""}
      \`;
    } else if (kind === "glossary") {
      const n = c.glossary.find(x => x.id === id);
      if (!n) return "";
      cover = newsThumb(n.id); title = n.term;
      body = \`<div class="article"><p>\${esc(n.definition)}</p>\${n.explain ? \`<p>\${esc(n.explain)}</p>\` : ""}</div>\`;
    } else if (kind === "category") {
      const cat = c.categories.find(x => x.id === id);
      if (!cat) return "";
      cover = MEDIA.categoryThumbs[cat.id] || MEDIA.sectionCovers.ecosystem;
      title = cat.name;
      body = \`
        <p class="muted">\${esc(cat.blurb || cat.summary)}</p>
        <div class="grid" style="margin-top:14px">
          \${cat.items.map(item => \`
            <button class="glass" style="text-align:left;cursor:pointer;width:100%" data-open='\${esc(JSON.stringify({kind:"item", id:item.id, category:cat.id}))}'>
              <strong>\${esc(item.title)}</strong>
              <div class="muted" style="font-size:.85rem;margin-top:4px">\${esc(clampText(item.summary,120))}</div>
            </button>\`).join("")}
        </div>\`;
    } else if (kind === "item") {
      const cat = c.categories.find(x => x.id === (state.modal.extra && state.modal.extra.category))
        || c.categories.find(x => x.items.some(i => i.id === id));
      const item = cat?.items.find(x => x.id === id);
      if (!item || !cat) return "";
      cover = MEDIA.categoryThumbs[cat.id] || MEDIA.sectionCovers.ecosystem;
      title = item.title;
      body = \`
        <button class="tech-btn ghost" style="margin-bottom:12px" data-open='\${esc(JSON.stringify({kind:"category", id: cat.id}))}'>← \${esc(cat.name)}</button>
        <p class="muted">\${esc(item.summary)}</p>
        <div class="article"><p>\${esc(item.intro || item.body || "")}</p>
        \${(item.sections||[]).map(s => \`<h4>\${esc(s.heading)}</h4><p>\${esc(s.body)}</p>\`).join("")}
        </div>
        \${item.keyPoints?.length ? \`<h4>\${esc(t("article","keyPoints"))}</h4><ul class="list">\${item.keyPoints.map(x=>\`<li>\${esc(x)}</li>\`).join("")}</ul>\` : ""}
        \${item.tips?.length ? \`<h4>\${esc(t("article","tips"))}</h4><ul class="list">\${item.tips.map(x=>\`<li>\${esc(x)}</li>\`).join("")}</ul>\` : ""}
      \`;
    }

    return \`
    <div class="modal" data-act="modal-backdrop">
      <div class="modal-card" onclick="event.stopPropagation()">
        <button class="close-x" data-act="modal-close">✕</button>
        <div class="modal-hero" style="background-image:url('\${img(cover)}')"></div>
        <div class="modal-body">
          <h2>\${esc(title)}</h2>
          \${body}
        </div>
      </div>
    </div>\`;
  }

  function viewBody(){
    switch(state.view){
      case "ecosystem": return renderEcosystem();
      case "news": return renderNews();
      case "chronicle": return renderChronicle();
      case "security": return renderSecurity();
      case "glossary": return renderGlossary();
      case "quiz": return renderQuiz();
      default: return renderExplore();
    }
  }

  function render(){
    if (!state.ready) {
      root.innerHTML = \`<div class="overlay"><div class="overlay-inner" style="justify-content:center;align-items:center;text-align:center"><p class="kicker">Web3Atlas</p><p class="muted">Detecting language from IP…</p></div></div>\`;
      return;
    }
    if (state.safariGate) {
      root.innerHTML = renderSafariGate();
      bind();
      return;
    }
    if (state.intro) {
      root.innerHTML = renderIntro();
      bind();
      return;
    }
    const nav = [
      ["explore", t("nav","explore")],
      ["ecosystem", t("nav","ecosystem")],
      ["news", t("nav","news")],
      ["chronicle", t("nav","chronicle")],
      ["security", t("nav","security")],
      ["glossary", t("nav","glossary")],
    ];
    const ipLabel = state.ipLocale
      ? ((DATA.localeNames && DATA.localeNames[state.ipLocale]) || state.ipLocale)
      : "—";
    root.innerHTML = \`
      <div class="shell">
        <div class="topbar">
          <div class="brand gradient-text">\${esc(t("brand","name"))}</div>
          <div class="lang" style="align-items:center">
            <select id="lang-select" style="max-width:160px;padding:8px 10px;border-radius:999px;border:1px solid var(--line);background:rgba(0,0,0,.45);color:var(--text)">
              \${DATA.locales.map(l => \`<option value="\${l}" \${state.locale===l?"selected":""}>\${esc((DATA.localeNames&&DATA.localeNames[l])||l)}</option>\`).join("")}
            </select>
            <button type="button" data-act="follow-ip" class="\${state.followIp?"active":""}" title="\${esc(t("common","followIp"))}">IP: \${esc(ipLabel)}</button>
          </div>
        </div>
        <nav class="nav">
          \${nav.map(([id,label]) => \`<button class="navbtn \${state.view===id?"active":""}" data-view="\${id}">\${esc(label)}</button>\`).join("")}
          <button class="navbtn \${state.view==="quiz"?"active":""}" data-view="quiz">Quiz</button>
        </nav>
        \${viewBody()}
      </div>
      <div class="bottom">
        \${nav.map(([id,label]) => \`<button data-view="\${id}" class="\${state.view===id?"active":""}">\${esc(label)}</button>\`).join("")}
      </div>
      \${renderModal()}
    \`;
    bind();
    paintFilmCanvases();
  }

  function paintFilmCanvases(){
    document.querySelectorAll("canvas[data-film]").forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const slides = filmSlides();
      const src = img(slides[Number(canvas.dataset.film)] || slides[0]);
      const image = new Image();
      image.onload = () => {
        const w = canvas.width, h = canvas.height;
        let t0 = performance.now();
        const draw = (now) => {
          if (!canvas.isConnected) return;
          const t = ((now - t0) / 8000) % 1;
          const scale = 1 + t * 0.12;
          const dw = w * scale, dh = h * scale;
          ctx.clearRect(0,0,w,h);
          ctx.drawImage(image, (w-dw)/2, (h-dh)/2, dw, dh);
          // film grain / scan
          ctx.fillStyle = "rgba(34,211,238," + (0.04 + 0.03*Math.sin(now/400)) + ")";
          ctx.fillRect(0, (now/18)%h, w, 2);
          requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
      };
      image.src = src;
    });
  }

  function bind(){
    const sel = document.getElementById("lang-select");
    if (sel) sel.addEventListener("change", () => setLocale(sel.value, true));
    root.querySelectorAll("[data-act='follow-ip']").forEach(el => el.addEventListener("click", async () => {
      el.disabled = true;
      const next = state.ipLocale || await resolveIpLocale();
      state.ipLocale = next;
      setLocale(next, false);
    }));
    root.querySelectorAll("[data-view]").forEach(el => el.addEventListener("click", () => setView(el.getAttribute("data-view"))));
    root.querySelectorAll("[data-act='intro-enter']").forEach(el => el.addEventListener("click", startIntroEnter));
    root.querySelectorAll("[data-act='open-safari']").forEach(el => el.addEventListener("click", openSafari));
    root.querySelectorAll("[data-act='modal-close']").forEach(el => el.addEventListener("click", closeModal));
    root.querySelectorAll("[data-act='modal-backdrop']").forEach(el => el.addEventListener("click", (e) => {
      if (e.target === el) closeModal();
    }));
    root.querySelectorAll("[data-open]").forEach(el => el.addEventListener("click", () => {
      try {
        const payload = JSON.parse(el.getAttribute("data-open"));
        if (payload.kind === "item") openModal("item", payload.id, { category: payload.category });
        else openModal(payload.kind, payload.id);
      } catch {}
    }));
    const search = document.getElementById("glossary-search");
    if (search) search.addEventListener("input", (e) => {
      state.glossaryQ = e.target.value;
      const active = document.activeElement === search;
      render();
      const again = document.getElementById("glossary-search");
      if (again && active) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); }
    });
    root.querySelectorAll("[data-act='quiz-pick']").forEach(el => el.addEventListener("click", () => {
      if (state.quiz.picked !== null) return;
      const i = Number(el.getAttribute("data-i"));
      const q = C().quiz[state.quiz.order[state.quiz.index]];
      state.quiz.picked = i;
      if (i === q.answer) state.quiz.score += 1;
      render();
    }));
    root.querySelectorAll("[data-act='quiz-next']").forEach(el => el.addEventListener("click", () => {
      if (state.quiz.index >= C().quiz.length - 1) state.quiz.done = true;
      else { state.quiz.index += 1; state.quiz.picked = null; }
      render();
    }));
    root.querySelectorAll("[data-act='quiz-restart']").forEach(el => el.addEventListener("click", () => { resetQuiz(); render(); }));
    root.querySelectorAll("[data-act='quiz-shuffle']").forEach(el => el.addEventListener("click", () => { resetQuiz(); render(); }));
  }

  // hero film slideshow
  setInterval(() => {
    state.filmIndex = (state.filmIndex + 1) % filmSlides().length;
    document.querySelectorAll(".hero-film .slide").forEach((el, i) => {
      el.classList.toggle("on", i === state.filmIndex);
    });
  }, 4500);

  (async function boot(){
    render();
    try {
      const ipLoc = await resolveIpLocale();
      state.ipLocale = ipLoc;
      if (state.followIp) state.locale = ipLoc;
      else state.locale = localStorage.getItem(LS_LANG) || ipLoc;
    } catch {
      state.locale = localStorage.getItem(LS_LANG) || DATA.defaultLocale;
      state.ipLocale = state.locale;
    }
    state.ready = true;
    applyDir();
    render();
  })();
})();
</script>
</body>
</html>
`;

const desktop = path.join(os.homedir(), "Desktop");
const outPath = path.join(desktop, "Web3Atlas.html");
const publicPath = path.join(root, "public", "Web3Atlas.html");
const docsPath = path.join(root, "docs", "index.html");
fs.mkdirSync(path.dirname(docsPath), { recursive: true });
fs.writeFileSync(outPath, html, "utf8");
fs.writeFileSync(publicPath, html, "utf8");
fs.writeFileSync(docsPath, html, "utf8");
const mb = (Buffer.byteLength(html) / (1024 * 1024)).toFixed(2);
console.log(`Wrote ${outPath} (${mb} MB)`);
console.log(`Wrote ${publicPath}`);
console.log(`Wrote ${docsPath}`);
