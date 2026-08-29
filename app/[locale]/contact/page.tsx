import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { ContactPage } from "@/components/contact-page";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Contact — Bly Analytics",
    description:
      "Get in touch with Bly Analytics, a Djibouti-based digital consultancy building web platforms, dashboards, and digitisation systems for East Africa.",
  },
  fr: {
    title: "Contact — Bly Analytics",
    description:
      "Contactez Bly Analytics, une agence de conseil numérique basée à Djibouti, spécialisée dans les plateformes web, tableaux de bord et systèmes de digitalisation pour l'Afrique de l'Est.",
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
    locale === "en" ? `${SITE_URL}/en/contact` : `${SITE_URL}/contact`;
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/contact`,
        en: `${SITE_URL}/en/contact`,
        "x-default": `${SITE_URL}/contact`,
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
  return <ContactPage lang={locale} />;
}
