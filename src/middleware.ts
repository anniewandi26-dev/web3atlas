import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { resolveGeoLocale } from "./i18n/geoLocale";
import { locales, type Locale } from "./i18n/locales";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const LOCALE_COOKIE = "NEXT_LOCALE";
const MANUAL_COOKIE = "CA_LOCALE_MANUAL";

function hasLocalePrefix(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function pathLocale(pathname: string): Locale | null {
  const seg = pathname.split("/")[1];
  if (seg && (locales as readonly string[]).includes(seg)) return seg as Locale;
  return null;
}

function stripLocale(pathname: string): string {
  if (!hasLocalePrefix(pathname)) return pathname || "/";
  return pathname.replace(/^\/[^/]+/, "") || "/";
}

function applyIpCookies(res: NextResponse, locale: Locale) {
  res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  res.cookies.set(MANUAL_COOKIE, "0", { path: "/", maxAge: 60 * 60 * 24 * 365 });
  res.headers.set("x-geo-locale", locale);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const manual = request.cookies.get(MANUAL_COOKIE)?.value === "1";
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value as Locale | undefined;
  const forced = request.nextUrl.searchParams.get("locale") as Locale | null;
  const followIp = request.nextUrl.searchParams.get("followIp");

  // Manual pick via ?locale=xx
  if (forced && (locales as readonly string[]).includes(forced)) {
    const rest = stripLocale(pathname);
    const url = request.nextUrl.clone();
    url.pathname = `/${forced}${rest === "/" ? "" : rest}`;
    url.searchParams.delete("locale");
    const res = NextResponse.redirect(url);
    res.cookies.set(LOCALE_COOKIE, forced, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    res.cookies.set(MANUAL_COOKIE, "1", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // Reset / force IP mode
  if (followIp === "1") {
    const ipLocale = await resolveGeoLocale(request.headers);
    const rest = stripLocale(pathname);
    const url = request.nextUrl.clone();
    url.pathname = `/${ipLocale}${rest === "/" ? "" : rest}`;
    url.searchParams.delete("followIp");
    const res = NextResponse.redirect(url);
    applyIpCookies(res, ipLocale);
    return res;
  }

  const ipLocale = await resolveGeoLocale(request.headers);

  // Bare path → IP language (manual cookie only if explicitly set)
  if (!hasLocalePrefix(pathname)) {
    const locale =
      manual && cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : ipLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    const res = NextResponse.redirect(url);
    if (manual && cookieLocale) {
      res.headers.set("x-geo-locale", ipLocale);
    } else {
      applyIpCookies(res, ipLocale);
    }
    return res;
  }

  const current = pathLocale(pathname);

  // No manual override → always coerce URL + cookies to IP language
  if (!manual && current && current !== ipLocale) {
    const rest = stripLocale(pathname);
    const url = request.nextUrl.clone();
    url.pathname = `/${ipLocale}${rest === "/" ? "" : rest}`;
    const res = NextResponse.redirect(url);
    applyIpCookies(res, ipLocale);
    return res;
  }

  // Keep cookies in sync while browsing under IP mode
  const res = intlMiddleware(request);
  if (!manual) {
    applyIpCookies(res, ipLocale);
  } else {
    res.headers.set("x-geo-locale", ipLocale);
  }
  return res;
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
