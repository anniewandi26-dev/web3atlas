import { defaultLocale, type Locale, locales } from "./locales";

/** ISO 3166-1 alpha-2 country → site locale (strict IP mapping) */
const countryMap: Record<string, Locale> = {
  CN: "zh",
  TW: "zh",
  HK: "zh",
  MO: "zh",
  SG: "zh",
  US: "en",
  GB: "en",
  AU: "en",
  NZ: "en",
  IE: "en",
  CA: "en",
  PH: "en",
  IN: "hi",
  PK: "ur",
  BD: "bn",
  NP: "hi",
  LK: "ta",
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  BO: "es",
  DO: "es",
  HN: "es",
  PY: "es",
  SV: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  UY: "es",
  BR: "pt",
  PT: "pt",
  AO: "pt",
  MZ: "pt",
  SA: "ar",
  AE: "ar",
  EG: "ar",
  IQ: "ar",
  MA: "ar",
  DZ: "ar",
  TN: "ar",
  JO: "ar",
  KW: "ar",
  QA: "ar",
  BH: "ar",
  OM: "ar",
  LY: "ar",
  SY: "ar",
  LB: "ar",
  YE: "ar",
  SD: "ar",
  RU: "ru",
  BY: "ru",
  KZ: "ru",
  JP: "ja",
  KR: "ko",
  KP: "ko",
  DE: "de",
  AT: "de",
  CH: "de",
  LI: "de",
  FR: "fr",
  BE: "fr",
  LU: "fr",
  MC: "fr",
  SN: "fr",
  CI: "fr",
  IT: "it",
  SM: "it",
  VA: "it",
  NL: "nl",
  SR: "nl",
  PL: "pl",
  UA: "uk",
  TR: "tr",
  CY: "tr",
  TH: "th",
  VN: "vi",
  ID: "id",
  MY: "ms",
  BN: "ms",
  IR: "fa",
  AF: "fa",
  RO: "ro",
  MD: "ro",
  MM: "my",
  TZ: "sw",
  KE: "sw",
  UG: "sw",
  RW: "sw",
  NG: "ha",
  NE: "ha",
  GH: "en",
  ZA: "en",
  SE: "en",
  NO: "en",
  FI: "en",
  DK: "en",
  CZ: "en",
  HU: "en",
  GR: "en",
  IL: "en",
};

export function localeFromCountry(country: string | null | undefined): Locale | null {
  if (!country || country === "XX" || country === "T1") return null;
  const code = country.toUpperCase().trim();
  const mapped = countryMap[code];
  if (mapped && (locales as readonly string[]).includes(mapped)) {
    return mapped;
  }
  return null;
}

export function localeFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const parts = header.split(",").map((p) => p.trim().split(";")[0]?.toLowerCase());
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("zh")) return "zh";
    const primary = part.split("-")[0] as Locale;
    if ((locales as readonly string[]).includes(primary)) return primary;
  }
  return null;
}

function edgeCountry(headers: Headers): string | null {
  const raw =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code") ||
    headers.get("cloudfront-viewer-country") ||
    headers.get("x-mock-country");
  return raw ? raw.toUpperCase().trim() : null;
}

export function clientIp(headers: Headers): string | null {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || null;
  return headers.get("x-real-ip") || headers.get("x-client-ip");
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) ||
    ip === "localhost"
  );
}

async function fetchJson(url: string, ms = 2800): Promise<unknown | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Resolve country from public IP. Prefer HTTPS providers (Edge-safe). */
export async function fetchCountryCode(ip: string | null): Promise<string | null> {
  const publicIp = ip && !isPrivateIp(ip) ? ip : null;

  // 1) ipwho.is (HTTPS)
  {
    const url = publicIp ? `https://ipwho.is/${publicIp}` : "https://ipwho.is/";
    const data = (await fetchJson(url)) as {
      success?: boolean;
      country_code?: string;
    } | null;
    if (data && data.success !== false && data.country_code) {
      return data.country_code.toUpperCase();
    }
  }

  // 2) ip-api.com (HTTP — works in Node route handlers)
  {
    const url = publicIp
      ? `http://ip-api.com/json/${publicIp}?fields=status,countryCode`
      : "http://ip-api.com/json/?fields=status,countryCode";
    try {
      const data = (await fetchJson(url)) as {
        status?: string;
        countryCode?: string;
      } | null;
      if (data?.status === "success" && data.countryCode) {
        return data.countryCode.toUpperCase();
      }
    } catch {
      // Edge may block plain HTTP — ignore
    }
  }

  // 3) geojs.io (HTTPS)
  {
    const url = publicIp
      ? `https://get.geojs.io/v1/ip/country/${publicIp}.json`
      : "https://get.geojs.io/v1/ip/country.json";
    const data = (await fetchJson(url)) as { country?: string } | null;
    if (data?.country && /^[A-Z]{2}$/i.test(data.country)) {
      return data.country.toUpperCase();
    }
  }

  return null;
}

/** Sync resolve from edge / mock headers only (no network). */
export function resolveGeoLocaleSync(headers: Headers): Locale | null {
  return localeFromCountry(edgeCountry(headers));
}

/**
 * Strict IP → locale:
 * 1) CDN / mock country headers
 * 2) Public IP geo lookup
 * 3) Accept-Language only if geo unavailable
 * 4) Site default
 */
export async function resolveGeoLocale(headers: Headers): Promise<Locale> {
  const fromEdge = resolveGeoLocaleSync(headers);
  if (fromEdge) return fromEdge;

  try {
    const country = await fetchCountryCode(clientIp(headers));
    const mapped = localeFromCountry(country);
    if (mapped) return mapped;
  } catch {
    // ignore
  }

  return localeFromAcceptLanguage(headers.get("accept-language")) || defaultLocale;
}
