import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const file = path.join(os.homedir(), "Desktop", "Web3Atlas.html");
const h = fs.readFileSync(file, "utf8");
console.log("bytes", h.length);
const m = h.match(/id="DATA">([\s\S]*?)<\/script>/);
if (!m) {
  console.error("NO DATA block");
  process.exit(1);
}
const d = JSON.parse(m[1]);
console.log("locales", d.locales.join(","));
console.log("imgs", Object.keys(d.images).length);
console.log(
  "en news",
  d.content.en.news.length,
  "zh cats",
  d.content.zh.categories.length,
  "ms quiz",
  d.content.ms.quiz.length,
);
console.log("has render", h.includes("function render("));
console.log("has film", h.includes("paintFilmCanvases"));
console.log("ok", file);
