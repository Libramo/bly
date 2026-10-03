import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { WorkPage } from "@/components/work-page";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Work — Bly Analytics",
    description:
      "Platforms we've designed and put into production in Djibouti: the official websites of the Fédération Djiboutienne de Handisport and the Réseau National des Personnes Handicapées, LexDj, and more.",
  },
  fr: {
    title: "Réalisations — Bly Analytics",
    description:
      "Nos réalisations à Djibouti : sites officiels de la Fédération Djiboutienne de Handisport et du Réseau National des Personnes Handicapées, LexDj, plateforme de rendez-vous médicaux — conçus et mis en production par Bly Analytics.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Lang };
  const c = COPY[locale];
  const url = locale === "en" ? `${SITE_URL}/en/work` : `${SITE_URL}/work`;
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/work`,
        en: `${SITE_URL}/en/work`,
        "x-default": `${SITE_URL}/work`,
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
  return <WorkPage lang={locale} />;
}
