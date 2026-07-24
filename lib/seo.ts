import type { Metadata } from "next";

// Canonical origin — must match the domain Vercel actually serves
// (blyanalytics.com 308s to www, so www is the real canonical host).
export const SITE_URL = "https://www.blyanalytics.com";

export const siteMetadata: Metadata = {
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
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Bly Analytics — Digital Consultancy",
    description:
      "Djibouti-based digital consultancy building web platforms, dashboards, and gov digitisation for East Africa.",
    url: SITE_URL,
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
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Bly Analytics",
      alternateName: ["Bly", "BlyAnalytics"],
      url: SITE_URL,
      logo: `${SITE_URL}/bly-logo-black.svg`,
      description:
        "Bly Analytics is a Djibouti-based digital consultancy building web platforms, analytics dashboards, and government digitisation systems for East Africa.",
      email: "contact@blyanalytics.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "DJ",
      },
      sameAs: ["https://www.linkedin.com/company/bly-analytics/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Bly Analytics",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en", "fr"],
    },
  ],
};
