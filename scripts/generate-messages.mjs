import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "messages");

const en = {
  brand: {
    name: "Web3Atlas",
    tagline: "Web3 Knowledge Infrastructure",
    badge: "Security First",
  },
  nav: {
    explore: "Explore",
    ecosystem: "Ecosystem",
    news: "News",
    chronicle: "Chronicle",
    security: "Security",
    glossary: "Glossary",
  },
  hero: {
    kicker: "8 ECOSYSTEM LAYERS · TAP TO LEARN",
    titleLine1: "The Internet Is Changing.",
    titleLine2: "Map What Comes Next.",
    subtitle:
      "Discover networks, protocols and ideas shaping Web3 — built for clarity, not hype.",
    ctaPrimary: "Explore the Ecosystem",
    ctaSecondary: "Open Security Center",
    pause: "Pause animation",
    play: "Play animation",
  },
  sections: {
    ecosystem: "01 · ECOSYSTEM",
    ecosystemTitle: "Explore by category",
    ecosystemDesc: "Eight layers of Web3. Open one to see concepts and real-world patterns.",
    openExplorer: "Open explorer",
    news: "02 · SIGNAL",
    newsTitle: "What's moving",
    newsDesc: "Curated headlines that help you follow infrastructure, markets and regulation.",
    allHeadlines: "All headlines",
    glossary: "03 · LEXICON",
    glossaryTitle: "Speak the language",
    glossaryDesc: "Fast definitions for terms you will see every day on-chain.",
    openGlossary: "Open glossary",
    security: "04 · DEFENSE",
    securityTitle: "Stay hard to hack",
    securityDesc: "Short briefings on phishing, approvals, seed phrases and fake apps.",
    securityCenter: "Security center",
    chronicle: "05 · TIMELINE",
    chronicleTitle: "How we got here",
    chronicleDesc: "A concise chronicle from whitepaper to ETFs and beyond.",
    fullChronicle: "Full chronicle",
    quiz: "06 · CHALLENGE",
    quizTitle: "Stress-test what you know",
    quizDesc: "Ten quick questions. No account. Just sharper instincts.",
    startQuiz: "Start the challenge",
    shuffle: "Shuffle",
  },
  common: {
    readMore: "Read more",
    back: "Back",
    search: "Search",
    items: "items",
    minRead: "{m} min read",
    language: "Language",
    followIp: "Language follows your region (IP). You can override anytime.",
    fallbackNote: "Full article language unavailable — showing English.",
    noResults: "No matches.",
    useful: "Useful",
  },
  ecosystemPage: {
    title: "Ecosystem Explorer",
    subtitle: "Browse eight layers — from base chains to DAOs.",
  },
  newsPage: {
    title: "Signal Desk",
    subtitle: "Curated Web3 headlines for builders and curious readers.",
  },
  chroniclePage: {
    title: "Chronicle",
    subtitle: "A timeline of moments that reshaped digital money and networks.",
  },
  securityPage: {
    title: "Security Center",
    subtitle: "Practical defenses for wallets, approvals and social engineering.",
  },
  glossaryPage: {
    title: "Glossary",
    subtitle: "Plain-language definitions for on-chain vocabulary.",
    placeholder: "Filter terms…",
  },
  quiz: {
    correct: "Correct",
    wrong: "Not quite",
    next: "Next",
    restart: "Restart",
    score: "Score: {score}/{total}",
    done: "Challenge complete",
  },
};

const zh = {
  brand: {
    name: "Web3Atlas",
    tagline: "Web3 知识基础设施",
    badge: "安全优先",
  },
  nav: {
    explore: "探索",
    ecosystem: "生态",
    news: "资讯",
    chronicle: "编年",
    security: "安全",
    glossary: "词库",
  },
  hero: {
    kicker: "八大生态层 · 点选即学",
    titleLine1: "互联网正在改写。",
    titleLine2: "绘制下一版图。",
    subtitle: "用清晰结构读懂网络、协议与 Web3 想法——去炒作，重认知。",
    ctaPrimary: "进入生态图谱",
    ctaSecondary: "打开安全中心",
    pause: "暂停动画",
    play: "播放动画",
  },
  sections: {
    ecosystem: "01 · 生态",
    ecosystemTitle: "按类别探索",
    ecosystemDesc: "Web3 的八个层次。点开即可看到概念与真实模式。",
    openExplorer: "打开图谱",
    news: "02 · 信号",
    newsTitle: "正在发生什么",
    newsDesc: "精选头条，帮你跟上基础设施、市场与监管。",
    allHeadlines: "全部头条",
    glossary: "03 · 词库",
    glossaryTitle: "说同一种语言",
    glossaryDesc: "链上日常术语的快速释义。",
    openGlossary: "打开词库",
    security: "04 · 防御",
    securityTitle: "让自己更难被骗",
    securityDesc: "钓鱼、授权、助记词与假 App 的短训。",
    securityCenter: "安全中心",
    chronicle: "05 · 时间线",
    chronicleTitle: "我们如何走到今天",
    chronicleDesc: "从白皮书到 ETF 的简明编年。",
    fullChronicle: "完整编年",
    quiz: "06 · 挑战",
    quizTitle: "测测你的直觉",
    quizDesc: "十道快问。无需账号，只为更锋利的判断。",
    startQuiz: "开始挑战",
    shuffle: "打乱",
  },
  common: {
    readMore: "阅读更多",
    back: "返回",
    search: "搜索",
    items: "项",
    minRead: "约 {m} 分钟",
    language: "语言",
    followIp: "语言默认跟随访问地区（IP），可随时手动切换。",
    fallbackNote: "暂无该语言全文，已显示英文。",
    noResults: "没有匹配结果。",
    useful: "有用",
  },
  ecosystemPage: {
    title: "生态图谱",
    subtitle: "浏览八层结构——从底层链到 DAO。",
  },
  newsPage: {
    title: "信号台",
    subtitle: "给建设者与好奇读者的精选 Web3 头条。",
  },
  chroniclePage: {
    title: "编年史",
    subtitle: "改写数字货币与网络的关键节点。",
  },
  securityPage: {
    title: "安全中心",
    subtitle: "钱包、授权与社会工程的实用防线。",
  },
  glossaryPage: {
    title: "词库",
    subtitle: "用白话解释链上词汇。",
    placeholder: "筛选术语…",
  },
  quiz: {
    correct: "正确",
    wrong: "再想想",
    next: "下一题",
    restart: "再来一次",
    score: "得分：{score}/{total}",
    done: "挑战完成",
  },
};

/** Partial UI translations for high-traffic locales; others fall back to English. */
const overlays = {
  es: {
    nav: {
      explore: "Explorar",
      ecosystem: "Ecosistema",
      news: "Noticias",
      chronicle: "Crónica",
      security: "Seguridad",
      glossary: "Glosario",
    },
    hero: {
      titleLine1: "Internet está cambiando.",
      titleLine2: "Mapea lo que viene.",
      ctaPrimary: "Explorar el ecosistema",
      ctaSecondary: "Centro de seguridad",
    },
  },
  ja: {
    nav: {
      explore: "探索",
      ecosystem: "エコシステム",
      news: "ニュース",
      chronicle: "年表",
      security: "セキュリティ",
      glossary: "用語集",
    },
    hero: {
      titleLine1: "インターネットは変わりつつある。",
      titleLine2: "次の地図を描く。",
      ctaPrimary: "エコシステムを見る",
      ctaSecondary: "セキュリティセンター",
    },
  },
  ko: {
    nav: {
      explore: "탐색",
      ecosystem: "생태계",
      news: "뉴스",
      chronicle: "연대기",
      security: "보안",
      glossary: "용어집",
    },
    hero: {
      titleLine1: "인터넷이 바뀌고 있습니다.",
      titleLine2: "다음을 지도로.",
      ctaPrimary: "생태계 살펴보기",
      ctaSecondary: "보안 센터",
    },
  },
  fr: {
    nav: {
      explore: "Explorer",
      ecosystem: "Écosystème",
      news: "Actus",
      chronicle: "Chronique",
      security: "Sécurité",
      glossary: "Glossaire",
    },
    hero: {
      titleLine1: "Internet change.",
      titleLine2: "Cartographiez la suite.",
      ctaPrimary: "Explorer l'écosystème",
      ctaSecondary: "Centre sécurité",
    },
  },
  de: {
    nav: {
      explore: "Entdecken",
      ecosystem: "Ökosystem",
      news: "News",
      chronicle: "Chronik",
      security: "Sicherheit",
      glossary: "Glossar",
    },
    hero: {
      titleLine1: "Das Internet verändert sich.",
      titleLine2: "Kartiere was kommt.",
      ctaPrimary: "Ökosystem erkunden",
      ctaSecondary: "Sicherheitszentrum",
    },
  },
  pt: {
    nav: {
      explore: "Explorar",
      ecosystem: "Ecossistema",
      news: "Notícias",
      chronicle: "Crônica",
      security: "Segurança",
      glossary: "Glossário",
    },
  },
  ru: {
    nav: {
      explore: "Обзор",
      ecosystem: "Экосистема",
      news: "Новости",
      chronicle: "Хроника",
      security: "Безопасность",
      glossary: "Глоссарий",
    },
  },
  ar: {
    nav: {
      explore: "استكشف",
      ecosystem: "النظام",
      news: "أخبار",
      chronicle: "سجل",
      security: "الأمان",
      glossary: "قاموس",
    },
  },
  hi: {
    nav: {
      explore: "खोजें",
      ecosystem: "इकोसिस्टम",
      news: "समाचार",
      chronicle: "इतिहास",
      security: "सुरक्षा",
      glossary: "शब्दावली",
    },
  },
  vi: {
    nav: {
      explore: "Khám phá",
      ecosystem: "Hệ sinh thái",
      news: "Tin tức",
      chronicle: "Niên biểu",
      security: "Bảo mật",
      glossary: "Thuật ngữ",
    },
  },
  id: {
    nav: {
      explore: "Jelajah",
      ecosystem: "Ekosistem",
      news: "Berita",
      chronicle: "Kronik",
      security: "Keamanan",
      glossary: "Glosarium",
    },
  },
  th: {
    nav: {
      explore: "สำรวจ",
      ecosystem: "ระบบนิเวศ",
      news: "ข่าว",
      chronicle: "ไทม์ไลน์",
      security: "ความปลอดภัย",
      glossary: "คำศัพท์",
    },
  },
  tr: {
    nav: {
      explore: "Keşfet",
      ecosystem: "Ekosistem",
      news: "Haberler",
      chronicle: "Kronik",
      security: "Güvenlik",
      glossary: "Sözlük",
    },
  },
  it: {
    nav: {
      explore: "Esplora",
      ecosystem: "Ecosistema",
      news: "Notizie",
      chronicle: "Cronaca",
      security: "Sicurezza",
      glossary: "Glossario",
    },
  },
  nl: {
    nav: {
      explore: "Verkennen",
      ecosystem: "Ecosysteem",
      news: "Nieuws",
      chronicle: "Kroniek",
      security: "Beveiliging",
      glossary: "Woordenlijst",
    },
  },
  pl: {
    nav: {
      explore: "Odkrywaj",
      ecosystem: "Ekosystem",
      news: "Aktualności",
      chronicle: "Kronika",
      security: "Bezpieczeństwo",
      glossary: "Słownik",
    },
  },
  uk: {
    nav: {
      explore: "Огляд",
      ecosystem: "Екосистема",
      news: "Новини",
      chronicle: "Хроніка",
      security: "Безпека",
      glossary: "Глосарій",
    },
  },
  ms: {
    nav: {
      explore: "Jelajah",
      ecosystem: "Ekosistem",
      news: "Berita",
      chronicle: "Kronikel",
      security: "Keselamatan",
      glossary: "Glosari",
    },
  },
  ro: {
    nav: {
      explore: "Explorează",
      ecosystem: "Ecosistem",
      news: "Știri",
      chronicle: "Cronică",
      security: "Securitate",
      glossary: "Glosar",
    },
  },
};

function deepMerge(base, overlay) {
  if (!overlay) return structuredClone(base);
  const out = structuredClone(base);
  for (const [k, v] of Object.entries(overlay)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = deepMerge(out[k] || {}, v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

const locales = [
  "zh", "en", "es", "hi", "ar", "pt", "bn", "ru", "ja", "pa", "de", "jv", "ko", "fr",
  "te", "mr", "tr", "ta", "vi", "ur", "it", "th", "gu", "kn", "fa", "pl", "uk", "ml",
  "or", "my", "nl", "ro", "id", "ms", "sw", "ha",
];

fs.mkdirSync(outDir, { recursive: true });

for (const locale of locales) {
  let data;
  if (locale === "en") data = en;
  else if (locale === "zh") data = zh;
  else data = deepMerge(en, overlays[locale]);
  fs.writeFileSync(path.join(outDir, `${locale}.json`), JSON.stringify(data, null, 2));
}

console.log(`Wrote ${locales.length} message files to messages/`);
