import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteMetadata, organizationJsonLd } from "@/lib/seo";
import { LOCALES, type Lang } from "@/lib/i18n";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Lang };
  return getSiteMetadata(locale);
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Lang };

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Organization + WebSite structured data — helps Google recognize
            the brand entity for branded search results (sitelinks, knowledge
            panel). next/script (default "afterInteractive" strategy, not a
            raw <script> tag, not "beforeInteractive") so it survives
            client-side locale-toggle navigations without React's "script tag
            while rendering" warning — [locale] layouts re-render on the
            client when the locale segment changes, and only
            "beforeInteractive" scripts break in that scenario. */}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${dmSerif.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
