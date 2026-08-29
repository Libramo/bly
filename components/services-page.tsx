"use client";

import Link from "next/link";
import { motion } from "motion/react";
import FooterSection from "./footer-section";
import { Navbar } from "./navbar";
import { localizedHref, type Lang } from "@/lib/i18n";

const C = {
  en: {
    eyebrow: "What we build",
    title: "Services",
    intro:
      "Bly Analytics takes full ownership of a project — from architecture to deployment — for governments, clinics, and businesses across East Africa. Six areas, one team, no handoffs.",
    cta: "Have a project in mind? Get in touch →",
    items: [
      {
        title: "Web platforms",
        body: "Full-stack apps built with Next.js, Drizzle, and Postgres. Multi-role auth, dashboards, booking systems, and internal tools — shipped as production software, not prototypes.",
      },
      {
        title: "Analytics dashboards",
        body: "Interactive KPI dashboards backed by real data pipelines, built with Python/Dash or Next.js and Recharts. Designed for teams that need to see what's actually happening, not a static report.",
      },
      {
        title: "Government digitisation",
        body: "Licensing, registry, and permit systems built for Djiboutian ministries and institutions — replacing paper-based processes with auditable, searchable digital ones.",
      },
      {
        title: "Healthcare tech",
        body: "Appointment flows, doctor onboarding, and patient portals for clinics and hospitals across East Africa — proven patterns already running in production.",
      },
      {
        title: "Data pipelines",
        body: "Scraping, ETL, deduplication, and enrichment for large or messy datasets, with checkpoint/resume built in so long-running jobs survive interruptions.",
      },
      {
        title: "Document automation",
        body: "DOCX, PDF, and PPTX generation from structured data — reports, forms, and contracts generated at scale instead of assembled by hand.",
      },
    ],
  },
  fr: {
    eyebrow: "Ce qu'on construit",
    title: "Services",
    intro:
      "Bly Analytics est votre partenaire de conseil digital à Djibouti : nous prenons en charge un projet dans son intégralité — de l'analyse de données à l'architecture, jusqu'au déploiement — pour des gouvernements, cliniques et entreprises à travers l'Afrique de l'Est. Six domaines, une seule équipe, aucun transfert.",
    cta: "Un projet en tête ? Contactez-nous →",
    items: [
      {
        title: "Plateformes web",
        body: "Applications full-stack construites avec Next.js, Drizzle et Postgres. Auth multi-rôles, dashboards, systèmes de réservation et outils internes — livrés comme des logiciels de production, pas des prototypes.",
      },
      {
        title: "Analyse de données & tableaux de bord",
        body: "Analyse de données et dashboards KPI interactifs adossés à de vrais pipelines de données, construits avec Python/Dash ou Next.js et Recharts. Pensés pour les équipes qui veulent voir ce qui se passe réellement, pas un rapport statique.",
      },
      {
        title: "Digitalisation gouvernementale",
        body: "Systèmes de licences, registres et permis conçus pour les ministères et institutions djiboutiennes — remplaçant les processus papier par des processus numériques auditables et consultables.",
      },
      {
        title: "Tech santé",
        body: "Flux de rendez-vous, onboarding médecins et portails patients pour les cliniques et hôpitaux d'Afrique de l'Est — des patterns déjà éprouvés en production.",
      },
      {
        title: "Pipelines de données",
        body: "Scraping, ETL, déduplication et enrichissement pour des jeux de données volumineux ou complexes, avec reprise sur incident intégrée pour les traitements longs.",
      },
      {
        title: "Automatisation documentaire",
        body: "Génération DOCX, PDF et PPTX depuis des données structurées — rapports, formulaires et contrats générés à l'échelle plutôt qu'assemblés à la main.",
      },
    ],
  },
};

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ServicesPage({ lang }: { lang: Lang }) {
  const t = C[lang];

  return (
    <div className="bg-(--bg) text-(--fg) font-sans min-h-screen">
      <Navbar lang={lang} />

      <article className="max-w-180 mx-auto px-8 pt-20 pb-16">
        <FadeUp delay={0.05}>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-(--accent) mb-[0.6rem]">
            {t.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-[-0.03em] text-(--fg) leading-[1.05] mb-5">
            {t.title}
          </h1>
          <p className="text-[16px] text-(--muted) leading-[1.85] max-w-140 mb-16">
            {t.intro}
          </p>
        </FadeUp>

        <div className="flex flex-col gap-10">
          {t.items.map((item, i) => (
            <FadeUp key={item.title} delay={0.08 + i * 0.04}>
              <h2 className="text-[16px] font-semibold text-(--fg) mb-2">
                {item.title}
              </h2>
              <p className="text-[14px] text-(--muted) leading-[1.8] max-w-140">
                {item.body}
              </p>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <Link
            href={localizedHref(lang, "/contact")}
            className="inline-block mt-16 text-[14px] font-semibold text-(--accent) no-underline border-b border-(--accent-subtle) pb-0.5"
          >
            {t.cta}
          </Link>
        </FadeUp>
      </article>

      <FooterSection lang={lang} />
    </div>
  );
}
