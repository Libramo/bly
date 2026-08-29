import type { Metadata } from "next";
import type { Lang } from "./i18n";

// Canonical origin — must match the domain Vercel actually serves
// (blyanalytics.com 308s to www, so www is the real canonical host).
export const SITE_URL = "https://www.blyanalytics.com";

const SITE_COPY: Record<
  Lang,
  {
    title: string;
    description: string;
    ogDescription: string;
    keywords: string[];
    ogLocale: string;
  }
> = {
  en: {
    title: "Bly Analytics — Digital Consultancy",
    description:
      "Bly Analytics is a Djibouti-based digital consultancy building web platforms, analytics dashboards, and government digitisation systems for East Africa.",
    ogDescription:
      "Djibouti-based digital consultancy building web platforms, dashboards, and gov digitisation for East Africa.",
    keywords: [
      "Bly Analytics",
      "digital consultancy Djibouti",
      "web platforms East Africa",
      "government digitisation Djibouti",
      "analytics dashboard East Africa",
    ],
    ogLocale: "en_US",
  },
  fr: {
    title: "Bly Analytics — Conseil Digital & Analyse de Données",
    description:
      "Bly Analytics est une agence de conseil digital basée à Djibouti, spécialisée dans l'analyse de données, les plateformes web et la digitalisation gouvernementale pour l'Afrique de l'Est.",
    ogDescription:
      "Agence de conseil digital basée à Djibouti — analyse de données, plateformes web et digitalisation gouvernementale pour l'Afrique de l'Est.",
    keywords: [
      "Bly Analytics",
      "conseil digital Djibouti",
      "agence de conseil numérique Djibouti",
      "analyse de données Djibouti",
      "plateformes web Afrique de l'Est",
      "digitalisation gouvernementale Djibouti",
      "tableau de bord analytique Afrique de l'Est",
    ],
    ogLocale: "fr_FR",
  },
};

function localeUrl(locale: Lang) {
  return locale === "en" ? `${SITE_URL}/en` : SITE_URL;
}

export function getSiteMetadata(locale: Lang): Metadata {
  const c = SITE_COPY[locale];
  const other = locale === "en" ? "fr" : "en";
  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: c.title,
      description: c.ogDescription,
      url: localeUrl(locale),
      siteName: "Bly Analytics",
      locale: c.ogLocale,
      alternateLocale: SITE_COPY[other].ogLocale,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.ogDescription,
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: localeUrl(locale),
      languages: {
        fr: SITE_URL,
        en: `${SITE_URL}/en`,
        "x-default": SITE_URL,
      },
    },
  };
}

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
      inLanguage: ["fr", "en"],
    },
  ],
};
