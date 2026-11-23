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
console.log("locales", d.locales.length, d.locales.join(","));
console.log("contentLocales", Object.keys(d.content).length);
console.log("imgs", Object.keys(d.images).length);
console.log("MY→", d.countryMap?.MY, "CN→", d.countryMap?.CN);
console.log("ms news", d.content.ms?.news?.length, "zh quiz", d.content.zh?.quiz?.length);
console.log("has resolveIp", h.includes("resolveIpLocale"));
console.log("ok", file);
