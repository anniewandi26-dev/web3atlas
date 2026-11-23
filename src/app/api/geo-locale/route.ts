import { clientIp, fetchCountryCode, localeFromCountry } from "@/i18n/geoLocale";
import { defaultLocale } from "@/i18n/locales";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const ip = clientIp(request.headers);
  const country = await fetchCountryCode(ip);
  const locale = localeFromCountry(country) || defaultLocale;

  return NextResponse.json(
    {
      ip: ip || null,
      country: country || null,
      locale,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
