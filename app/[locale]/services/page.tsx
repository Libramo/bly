import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { ServicesPage } from "@/components/services-page";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Services — Bly Analytics",
    description:
      "Web platforms, analytics dashboards, government digitisation, healthcare tech, data pipelines, and document automation — built for East African businesses and institutions.",
  },
  fr: {
    title: "Services — Bly Analytics",
    description:
      "Analyse de données, plateformes web, digitalisation gouvernementale, tech santé et automatisation documentaire — conseil digital conçu pour les entreprises et institutions d'Afrique de l'Est.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Lang };
  const c = COPY[locale];
  const url =
    locale === "en" ? `${SITE_URL}/en/services` : `${SITE_URL}/services`;
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/services`,
        en: `${SITE_URL}/en/services`,
        "x-default": `${SITE_URL}/services`,
      },
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url,
      siteName: "Bly Analytics",
      type: "website",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Lang };
  return <ServicesPage lang={locale} />;
}
