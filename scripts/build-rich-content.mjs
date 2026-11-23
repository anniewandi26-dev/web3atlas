import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { articlesZh } from "./data/articles-zh.mjs";
import { articlesZh2 } from "./data/articles-zh-2.mjs";
import { articlesZh3 } from "./data/articles-zh-3.mjs";
import { articlesEn } from "./data/articles-en.mjs";
import {
  metaZh,
  metaEn,
  glossaryZh,
  glossaryEn,
  securityZh,
  securityEn,
  chronicleZh,
  chronicleEn,
  newsZh,
  newsEn,
} from "./data/extra-content.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "content");

const zhArticles = { ...articlesZh, ...articlesZh2, ...articlesZh3 };

const categoryOrder = [
  "blockchain",
  "defi",
  "nfts",
  "layer2",
  "infra",
  "wallets",
  "gaming",
  "daos",
];

const itemOrder = {
  blockchain: ["bitcoin", "ethereum", "consensus", "accounts", "gas", "bridges"],
  defi: ["amm", "lending", "stablecoins", "staking", "perps", "rwa"],
  nfts: ["erc721", "markets", "pfp", "gaming-assets", "tickets", "dynamic"],
  layer2: ["optimistic", "zk", "data", "bridges-l2", "accounts-aa", "multi-chain", "costs"],
  infra: ["oracles", "rpc", "indexers", "storage", "mev", "sdks", "identity", "aa-infra"],
  wallets: ["hot", "hardware", "seed", "multisig", "smart-accounts", "custody"],
  gaming: ["play", "economies", "worlds", "infra-game", "modding", "risks"],
  daos: ["governance", "treasury", "proposals", "legal", "ops", "attacks"],
};

function buildCategories(articles, meta) {
  return categoryOrder.map((id) => {
    const m = meta[id];
    const items = itemOrder[id].map((itemId) => {
      const a = articles[itemId];
      if (!a) throw new Error(`Missing article: ${itemId}`);
      return {
        id: itemId,
        title: a.title,
        summary: a.summary,
        intro: a.intro,
        sections: a.sections,
        keyPoints: a.keyPoints,
        tips: a.tips,
        body: a.intro,
      };
    });
    return { id, name: m.name, summary: m.summary, blurb: m.blurb, items };
  });
}

function write(locale, name, data) {
  const dir = path.join(root, locale);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2));
}

const missingZh = Object.values(itemOrder).flat().filter((id) => !zhArticles[id]);
const missingEn = Object.values(itemOrder).flat().filter((id) => !articlesEn[id]);
if (missingZh.length) throw new Error(`ZH missing: ${missingZh.join(",")}`);
if (missingEn.length) throw new Error(`EN missing: ${missingEn.join(",")}`);

write("zh", "categories", buildCategories(zhArticles, metaZh));
write("en", "categories", buildCategories(articlesEn, metaEn));
write("zh", "glossary", glossaryZh);
write("en", "glossary", glossaryEn);
write("zh", "security", securityZh);
write("en", "security", securityEn);
write("zh", "chronicle", chronicleZh);
write("en", "chronicle", chronicleEn);
write("zh", "news", newsZh);
write("en", "news", newsEn);

console.log("Rich content published.");
console.log(
  "ZH items",
  Object.keys(zhArticles).length,
  "EN items",
  Object.keys(articlesEn).length,
  "glossary",
  glossaryZh.length,
);
