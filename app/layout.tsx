import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Bly Analytics — Digital Consultancy",
  description:
    "Bly Analytics is a Djibouti-based digital consultancy building web platforms, analytics dashboards, and government digitisation systems for East Africa.",
  keywords: [
    "Bly Analytics",
    "digital consultancy Djibouti",
    "web platforms East Africa",
    "government digitisation Djibouti",
    "analytics dashboard East Africa",
  ],
  metadataBase: new URL("https://blyanalytics.com"),
  openGraph: {
    title: "Bly Analytics — Digital Consultancy",
    description:
      "Djibouti-based digital consultancy building web platforms, dashboards, and gov digitisation for East Africa.",
    url: "https://blyanalytics.com",
    siteName: "Bly Analytics",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bly Analytics — Digital Consultancy",
    description:
      "Djibouti-based digital consultancy building web platforms, dashboards, and gov digitisation for East Africa.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://blyanalytics.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* No-flash theme script — runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('bly-theme');
                  var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${dmSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
