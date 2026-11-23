import { BottomNav } from "@/components/BottomNav";
import { IpLocaleSync } from "@/components/IpLocaleSync";
import { SafariGate } from "@/components/SafariGate";
import { SiteHeader } from "@/components/SiteHeader";
import { rtlLocales, type Locale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { type ReactNode } from "react";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Orbitron:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="tech-bg min-h-full antialiased">
        <NextIntlClientProvider messages={messages}>
          <IpLocaleSync />
          <SafariGate />
          <div className="flex min-h-screen flex-col pb-24">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">
              {children}
            </main>
            <BottomNav />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
